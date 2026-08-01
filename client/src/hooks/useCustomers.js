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
  const [sortBy, setSortBy] = useState("newest"); // "newest", "name", "premium"
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Modal / Selected Customer state
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  // Fetch customers list
  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await customerService.getCustomers();
      setCustomers(data || []);
    } catch (err) {
      console.error("Failed to load customers:", err);
      setError("Failed to load customer list.");
      toast.error("Could not fetch customer records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Compute stats dynamically
  const stats = useMemo(() => {
    const total = customers.length;
    const active = customers.filter((c) => (c.status || "").toUpperCase() === "ACTIVE").length;
    const inactive = customers.filter((c) => ["INACTIVE", "SUSPENDED"].includes((c.status || "").toUpperCase())).length;
    const pendingKyc = customers.filter((c) => ["PENDING_KYC", "PENDING"].includes((c.status || "").toUpperCase())).length;
    
    // New customers this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newThisMonth = customers.filter((c) => {
      if (!c.createdDate) return false;
      const d = new Date(c.createdDate);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    return {
      totalCustomers: total,
      activeCustomers: active,
      inactiveCustomers: inactive + pendingKyc,
      newCustomersThisMonth: newThisMonth || total,
    };
  }, [customers]);

  // Filter & Search logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        customer.fullName?.toLowerCase().includes(query) ||
        customer.email?.toLowerCase().includes(query) ||
        customer.phone?.toLowerCase().includes(query) ||
        customer.id?.toLowerCase().includes(query) ||
        customer.city?.toLowerCase().includes(query);

      const normalizedStatus = (customer.status || "").toUpperCase();
      const matchesStatus =
        statusFilter === "ALL" ||
        normalizedStatus === statusFilter ||
        (statusFilter === "INACTIVE" && ["INACTIVE", "SUSPENDED", "PENDING_KYC"].includes(normalizedStatus));

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === "name") return (a.fullName || "").localeCompare(b.fullName || "");
      if (sortBy === "premium") return (b.totalPremium || 0) - (a.totalPremium || 0);
      // default: newest
      return new Date(b.createdDate || 0) - new Date(a.createdDate || 0);
    });
  }, [customers, searchQuery, statusFilter, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  // Action handlers
  const handleAddCustomer = async (formData) => {
    try {
      setLoading(true);
      const created = await customerService.createCustomer(formData);
      setCustomers((prev) => [created, ...prev]);
      toast.success(`Customer ${created.fullName} created successfully!`);
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
        prev.map((c) => (String(c.id) === String(id) ? { ...c, ...updated } : c))
      );
      toast.success("Customer profile updated successfully!");
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
      setCustomers((prev) => prev.filter((c) => String(c.id) !== String(customerToDelete.id)));
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
    rawCustomers: customers,
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
