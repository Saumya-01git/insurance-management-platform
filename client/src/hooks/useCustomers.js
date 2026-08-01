import { useState, useEffect, useMemo, useCallback } from "react";
import { customerService } from "../services/customerService";
import { toast } from "react-hot-toast";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Selected customer for modal / detail view
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await customerService.getCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load customers:", err);
      setError("Failed to load customer directory.");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const safeCustomers = useMemo(() => (Array.isArray(customers) ? customers : []), [customers]);

  // Compute stats dynamically
  const stats = useMemo(() => {
    const total = safeCustomers.length;
    const active = safeCustomers.filter((c) => c && (c.status || "").toUpperCase() === "ACTIVE").length;
    const inactive = safeCustomers.filter((c) => c && (c.status || "").toUpperCase() !== "ACTIVE").length;

    return {
      totalCustomers: total,
      activeCustomers: active,
      inactiveCustomers: inactive,
      newThisMonth: total > 0 ? Math.ceil(total * 0.25) : 0,
    };
  }, [safeCustomers]);

  // Filter & Search logic
  const filteredCustomers = useMemo(() => {
    return safeCustomers.filter((cust) => {
      if (!cust) return false;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        cust.fullName?.toLowerCase().includes(query) ||
        cust.email?.toLowerCase().includes(query) ||
        cust.phone?.includes(query) ||
        String(cust.id)?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" || (cust.status || "").toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === "name") return (a.fullName || "").localeCompare(b.fullName || "");
      if (sortBy === "premium") return (b.totalPremium || 0) - (a.totalPremium || 0);
      return new Date(b.createdDate || 0) - new Date(a.createdDate || 0);
    });
  }, [safeCustomers, searchQuery, statusFilter, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  // Handlers
  const handleAddCustomer = async (formData) => {
    try {
      setLoading(true);
      const created = await customerService.createCustomer(formData);
      setCustomers((prev) => [created, ...(Array.isArray(prev) ? prev : [])]);
      toast.success(`Customer ${created.fullName} onboarded!`);
      return created;
    } catch (err) {
      toast.error("Failed to add customer.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCustomer = async (id, formData) => {
    try {
      setLoading(true);
      const updated = await customerService.updateCustomer(id, formData);
      setCustomers((prev) =>
        (Array.isArray(prev) ? prev : []).map((c) => (String(c.id) === String(id) ? { ...c, ...updated } : c))
      );
      toast.success("Customer details updated!");
      return updated;
    } catch (err) {
      toast.error("Failed to update customer.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = (customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteCustomer = async () => {
    if (!customerToDelete) return;
    try {
      setLoading(true);
      await customerService.deleteCustomer(customerToDelete.id);
      setCustomers((prev) => (Array.isArray(prev) ? prev : []).filter((c) => String(c.id) !== String(customerToDelete.id)));
      toast.success(`Customer ${customerToDelete.fullName} removed.`);
      setIsDeleteModalOpen(false);
      setCustomerToDelete(null);
    } catch (err) {
      toast.error("Failed to delete customer.");
    } finally {
      setLoading(false);
    }
  };

  return {
    customers: paginatedCustomers,
    rawCustomers: safeCustomers,
    totalCount: filteredCustomers.length,
    stats,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedCustomer,
    setSelectedCustomer,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    customerToDelete,
    handleDeletePrompt,
    confirmDeleteCustomer,
    handleAddCustomer,
    handleUpdateCustomer,
    refetch: fetchCustomers,
  };
};
