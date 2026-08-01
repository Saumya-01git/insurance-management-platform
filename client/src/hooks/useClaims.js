import { useState, useEffect, useMemo, useCallback } from "react";
import { claimService } from "../services/claimService";
import { toast } from "react-hot-toast";

export const useClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Selected claim & Modals state
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [claimToDelete, setClaimToDelete] = useState(null);

  const fetchClaims = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await claimService.getClaims();
      setClaims(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load claims:", err);
      setError("Failed to load claim records.");
      setClaims([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  const safeClaims = useMemo(() => (Array.isArray(claims) ? claims : []), [claims]);

  // Compute stats dynamically
  const stats = useMemo(() => {
    const total = safeClaims.length;
    const pending = safeClaims.filter((c) => c && ["PENDING", "UNDER_REVIEW", "SUBMITTED"].includes((c.status || "").toUpperCase())).length;
    const approved = safeClaims.filter((c) => c && (c.status || "").toUpperCase() === "APPROVED").length;
    const rejected = safeClaims.filter((c) => c && ["REJECTED", "DENIED"].includes((c.status || "").toUpperCase())).length;

    return {
      totalClaims: total,
      pendingClaims: pending,
      approvedClaims: approved,
      rejectedClaims: rejected,
    };
  }, [safeClaims]);

  // Filter & Search logic
  const filteredClaims = useMemo(() => {
    return safeClaims.filter((clm) => {
      if (!clm) return false;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        clm.claimId?.toLowerCase().includes(query) ||
        clm.customer?.toLowerCase().includes(query) ||
        clm.policyNumber?.toLowerCase().includes(query) ||
        clm.claimType?.toLowerCase().includes(query);

      const normalizedStatus = (clm.status || "").toUpperCase();
      const matchesStatus =
        statusFilter === "ALL" ||
        normalizedStatus === statusFilter ||
        (statusFilter === "PENDING" && ["PENDING", "UNDER_REVIEW"].includes(normalizedStatus));

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === "amount") return (b.claimAmount || 0) - (a.claimAmount || 0);
      return new Date(b.date || 0) - new Date(a.date || 0);
    });
  }, [safeClaims, searchQuery, statusFilter, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage) || 1;
  const paginatedClaims = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredClaims.slice(start, start + itemsPerPage);
  }, [filteredClaims, currentPage, itemsPerPage]);

  // Handlers
  const handleAddClaim = async (formData) => {
    try {
      setLoading(true);
      const created = await claimService.createClaim(formData);
      setClaims((prev) => [created, ...(Array.isArray(prev) ? prev : [])]);
      toast.success(`Claim ${created.claimId} registered successfully!`);
      return created;
    } catch (err) {
      toast.error("Failed to register claim.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClaim = async (id, formData) => {
    try {
      setLoading(true);
      const updated = await claimService.updateClaim(id, formData);
      setClaims((prev) =>
        (Array.isArray(prev) ? prev : []).map((c) => (String(c.id) === String(id) ? { ...c, ...updated } : c))
      );
      toast.success("Claim record updated!");
      return updated;
    } catch (err) {
      toast.error("Failed to update claim.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClaim = async (id) => {
    try {
      setLoading(true);
      const approved = await claimService.approveClaim(id);
      setClaims((prev) =>
        (Array.isArray(prev) ? prev : []).map((c) => (String(c.id) === String(id) ? { ...c, ...approved } : c))
      );
      toast.success("Claim approved for payout!");
    } catch (err) {
      toast.error("Failed to approve claim.");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectClaim = async (id) => {
    try {
      setLoading(true);
      const rejected = await claimService.rejectClaim(id);
      setClaims((prev) =>
        (Array.isArray(prev) ? prev : []).map((c) => (String(c.id) === String(id) ? { ...c, ...rejected } : c))
      );
      toast.error("Claim filing rejected.");
    } catch (err) {
      toast.error("Failed to reject claim.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = (claim) => {
    setClaimToDelete(claim);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteClaim = async () => {
    if (!claimToDelete) return;
    try {
      setLoading(true);
      await claimService.deleteClaim(claimToDelete.id);
      setClaims((prev) => (Array.isArray(prev) ? prev : []).filter((c) => String(c.id) !== String(claimToDelete.id)));
      toast.success(`Claim ${claimToDelete.claimId} removed.`);
      setIsDeleteModalOpen(false);
      setClaimToDelete(null);
    } catch (err) {
      toast.error("Failed to delete claim.");
    } finally {
      setLoading(false);
    }
  };

  return {
    claims: paginatedClaims,
    rawClaims: safeClaims,
    totalCount: filteredClaims.length,
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
    selectedClaim,
    setSelectedClaim,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    claimToDelete,
    handleDeletePrompt,
    confirmDeleteClaim,
    handleAddClaim,
    handleUpdateClaim,
    handleApproveClaim,
    handleRejectClaim,
    refetch: fetchClaims,
  };
};
