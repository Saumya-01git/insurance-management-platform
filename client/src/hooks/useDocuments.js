import { useState, useEffect, useMemo, useCallback } from "react";
import { documentService } from "../services/documentService";
import { toast } from "react-hot-toast";

export const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Selected & Modals
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await documentService.getDocuments();
      setDocuments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load documents:", err);
      setError("Failed to load document vault.");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const safeDocuments = useMemo(() => (Array.isArray(documents) ? documents : []), [documents]);

  // Compute stats
  const stats = useMemo(() => {
    const total = safeDocuments.length;
    const verified = safeDocuments.filter((d) => d && (d.status || "").toUpperCase() === "VERIFIED").length;
    const pending = safeDocuments.filter((d) => d && (d.status || "").toUpperCase().includes("PENDING")).length;

    return {
      totalDocuments: total,
      verifiedDocuments: verified,
      pendingDocuments: pending,
    };
  }, [safeDocuments]);

  // Filter & Search logic
  const filteredDocuments = useMemo(() => {
    return safeDocuments.filter((doc) => {
      if (!doc) return false;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        doc.title?.toLowerCase().includes(query) ||
        doc.customer?.toLowerCase().includes(query) ||
        doc.category?.toLowerCase().includes(query) ||
        doc.documentId?.toLowerCase().includes(query);

      const matchesCategory = categoryFilter === "ALL" || doc.category === categoryFilter;
      const matchesStatus = statusFilter === "ALL" || (doc.status || "").toUpperCase() === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      return new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0);
    });
  }, [safeDocuments, searchQuery, categoryFilter, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage) || 1;
  const paginatedDocuments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDocuments.slice(start, start + itemsPerPage);
  }, [filteredDocuments, currentPage, itemsPerPage]);

  const handleUploadDocument = async (formData) => {
    try {
      setLoading(true);
      const created = await documentService.uploadDocument(formData);
      setDocuments((prev) => [created, ...(Array.isArray(prev) ? prev : [])]);
      toast.success(`Document ${created.title} uploaded & encrypted!`);
      return created;
    } catch (err) {
      toast.error("Failed to upload document.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = (doc) => {
    setDocumentToDelete(doc);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteDocument = async () => {
    if (!documentToDelete) return;
    try {
      setLoading(true);
      await documentService.deleteDocument(documentToDelete.id);
      setDocuments((prev) => (Array.isArray(prev) ? prev : []).filter((d) => String(d.id) !== String(documentToDelete.id)));
      toast.success(`Document ${documentToDelete.title} deleted.`);
      setIsDeleteModalOpen(false);
      setDocumentToDelete(null);
    } catch (err) {
      toast.error("Failed to delete document.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewPrompt = (doc) => {
    setPreviewDocument(doc);
    setIsPreviewOpen(true);
  };

  return {
    documents: paginatedDocuments,
    rawDocuments: safeDocuments,
    totalCount: filteredDocuments.length,
    stats,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedDocument,
    setSelectedDocument,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    documentToDelete,
    handleDeletePrompt,
    confirmDeleteDocument,
    isPreviewOpen,
    setIsPreviewOpen,
    previewDocument,
    handlePreviewPrompt,
    handleUploadDocument,
    refetch: fetchDocuments,
  };
};
