import { useEffect, useState, useCallback } from "react";
import { documentApi } from "../../api/documentApi";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import DocumentUploadModal from "./DocumentUploadModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { toast } from "react-hot-toast";
import { FolderOpen, UploadCloud, Download, Trash2, FileText, Image as ImageIcon } from "lucide-react";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deletingDoc, setDeletingDoc] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchDocuments = useCallback(() => {
    documentApi
      .getAll()
      .then((data) => setDocuments(Array.isArray(data) ? data : data.data || []))
      .catch((err) => toast.error(err.response?.data?.message || "Failed to load document vault"));
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleUploadSubmit = async (formData) => {
    try {
      await documentApi.upload(formData);
      toast.success("Document uploaded to vault successfully");
      setIsUploadOpen(false);
      fetchDocuments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload document");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingDoc) return;
    try {
      await documentApi.delete(deletingDoc.id);
      toast.success("Document deleted from vault");
      setIsDeleteOpen(false);
      setDeletingDoc(null);
      fetchDocuments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete document");
    }
  };

  const getFileUrl = (filePath) => {
    if (!filePath) return "#";
    if (filePath.startsWith("http")) return filePath;
    const cleaned = filePath.replace(/\\/g, "/");
    return `http://localhost:5000/${cleaned.startsWith("/") ? cleaned.substring(1) : cleaned}`;
  };

  const columns = [
    {
      header: "Document File Name",
      accessorKey: "file_name",
      cell: (row) => {
        const isPdf = row.file_name?.toLowerCase().endsWith(".pdf");
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 border border-cyan-200/50 dark:border-cyan-800/40">
              {isPdf ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-bold text-[#0f172a] dark:text-white truncate max-w-xs">{row.file_name}</p>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5 uppercase">
                {row.document_type || "ATTACHMENT"}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Customer Owner",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-200">
            {row.customer?.name || `Customer #${row.customer_id}`}
          </p>
          <p className="text-xs text-slate-400">{row.customer?.email || ""}</p>
        </div>
      ),
    },
    {
      header: "Uploaded At",
      accessorKey: "uploaded_at",
      cell: (row) => (
        <span className="text-slate-600 dark:text-slate-400 font-medium">
          {row.uploaded_at ? new Date(row.uploaded_at).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (row) => {
        const url = getFileUrl(row.file_path);
        return (
          <div className="flex items-center justify-end gap-1.5">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer"
              title="Open File Preview / Download"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                setDeletingDoc(row);
                setIsDeleteOpen(true);
              }}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              title="Delete Document"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <FolderOpen className="w-7 h-7 text-[#2563EB]" /> Documents Vault
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Store, inspect, and manage customer identity proofs and policy agreements.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={UploadCloud}
          onClick={() => setIsUploadOpen(true)}
        >
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Vault Files</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{documents.length}</p>
          <p className="text-xs text-slate-500 font-semibold">Uploaded attachments</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">KYC Verification Files</span>
          <p className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">
            {documents.filter((d) => d.document_type === "ID_PROOF" || d.document_type === "ADDRESS_PROOF").length}
          </p>
          <p className="text-xs text-cyan-500 font-semibold">Identity proofs stored</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vault Status</span>
          <div className="pt-1">
            <Badge status="ACTIVE">Encrypted Uploads</Badge>
          </div>
          <p className="text-xs text-slate-500 font-semibold pt-1">Multer storage operational</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={documents}
        searchPlaceholder="Search document name, customer, file type..."
        emptyTitle="No documents in vault"
        emptySubtitle="Upload customer KYC or policy documents to populate your vault."
      />

      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUploadSubmit}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Document"
        message={`Are you sure you want to delete file "${deletingDoc?.file_name}"?`}
      />
    </div>
  );
};

export default DocumentsPage;
