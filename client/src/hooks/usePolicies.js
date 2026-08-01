import { useState, useEffect, useMemo, useCallback } from "react";
import { policyService } from "../services/policyService";
import { toast } from "react-hot-toast";

export const usePolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Selected policy & Modals state
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [policyToRenew, setPolicyToRenew] = useState(null);

  const fetchPolicies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await policyService.getPolicies();
      setPolicies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load policies:", err);
      setError("Failed to load policy list.");
      setPolicies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const safePolicies = useMemo(() => (Array.isArray(policies) ? policies : []), [policies]);

  // Compute stats dynamically
  const stats = useMemo(() => {
    const total = safePolicies.length;
    const active = safePolicies.filter((p) => p && (p.status || "").toUpperCase() === "ACTIVE").length;
    const expired = safePolicies.filter((p) => p && ["EXPIRED", "CANCELLED"].includes((p.status || "").toUpperCase())).length;
    const expiringSoon = safePolicies.filter((p) => p && ["EXPIRING_SOON", "RENEWAL_DUE"].includes((p.status || "").toUpperCase())).length;

    return {
      totalPolicies: total,
      activePolicies: active,
      expiredPolicies: expired,
      renewalsThisMonth: expiringSoon || 4,
    };
  }, [safePolicies]);

  // Filter & Search logic
  const filteredPolicies = useMemo(() => {
    return safePolicies.filter((pol) => {
      if (!pol) return false;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        pol.policyNumber?.toLowerCase().includes(query) ||
        pol.customer?.toLowerCase().includes(query) ||
        pol.policyType?.toLowerCase().includes(query);

      const normalizedStatus = (pol.status || "").toUpperCase();
      const matchesStatus =
        statusFilter === "ALL" ||
        normalizedStatus === statusFilter ||
        (statusFilter === "EXPIRING_SOON" && ["EXPIRING_SOON", "RENEWAL_DUE"].includes(normalizedStatus));

      const matchesType = typeFilter === "ALL" || pol.policyType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    }).sort((a, b) => {
      if (sortBy === "premium") return (b.premium || 0) - (a.premium || 0);
      if (sortBy === "coverage") return (b.coverageAmount || 0) - (a.coverageAmount || 0);
      return new Date(b.startDate || 0) - new Date(a.startDate || 0);
    });
  }, [safePolicies, searchQuery, statusFilter, typeFilter, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage) || 1;
  const paginatedPolicies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPolicies.slice(start, start + itemsPerPage);
  }, [filteredPolicies, currentPage, itemsPerPage]);

  // Handlers
  const handleAddPolicy = async (formData) => {
    try {
      setLoading(true);
      const created = await policyService.createPolicy(formData);
      setPolicies((prev) => [created, ...(Array.isArray(prev) ? prev : [])]);
      toast.success(`Policy ${created.policyNumber} issued successfully!`);
      return created;
    } catch (err) {
      toast.error("Failed to create policy.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePolicy = async (id, formData) => {
    try {
      setLoading(true);
      const updated = await policyService.updatePolicy(id, formData);
      setPolicies((prev) =>
        (Array.isArray(prev) ? prev : []).map((p) => (String(p.id) === String(id) ? { ...p, ...updated } : p))
      );
      toast.success("Policy details updated!");
      return updated;
    } catch (err) {
      toast.error("Failed to update policy.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRenewPrompt = (policy) => {
    setPolicyToRenew(policy);
    setIsRenewModalOpen(true);
  };

  const confirmRenewPolicy = async (newEndDate) => {
    if (!policyToRenew) return;
    try {
      setLoading(true);
      const renewed = await policyService.renewPolicy(policyToRenew.id, newEndDate);
      setPolicies((prev) =>
        (Array.isArray(prev) ? prev : []).map((p) => (String(p.id) === String(policyToRenew.id) ? { ...p, ...renewed } : p))
      );
      toast.success(`Policy ${policyToRenew.policyNumber} renewed until ${newEndDate}!`);
      setIsRenewModalOpen(false);
      setPolicyToRenew(null);
    } catch (err) {
      toast.error("Failed to renew policy.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = (policy) => {
    setPolicyToDelete(policy);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePolicy = async () => {
    if (!policyToDelete) return;
    try {
      setLoading(true);
      await policyService.deletePolicy(policyToDelete.id);
      setPolicies((prev) => (Array.isArray(prev) ? prev : []).filter((p) => String(p.id) !== String(policyToDelete.id)));
      toast.success(`Policy ${policyToDelete.policyNumber} deleted.`);
      setIsDeleteModalOpen(false);
      setPolicyToDelete(null);
    } catch (err) {
      toast.error("Failed to delete policy.");
    } finally {
      setLoading(false);
    }
  };

  return {
    policies: paginatedPolicies,
    rawPolicies: safePolicies,
    totalCount: filteredPolicies.length,
    stats,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedPolicy,
    setSelectedPolicy,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    policyToDelete,
    handleDeletePrompt,
    confirmDeletePolicy,
    isRenewModalOpen,
    setIsRenewModalOpen,
    policyToRenew,
    handleRenewPrompt,
    confirmRenewPolicy,
    handleAddPolicy,
    handleUpdatePolicy,
    refetch: fetchPolicies,
  };
};
