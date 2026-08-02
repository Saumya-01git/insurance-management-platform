import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocuments } from "../../hooks/useDocuments";
import DocumentTable from "../../components/documents/DocumentTable";
import DocumentCard from "../../components/documents/DocumentCard";
import DocumentFilters from "../../components/documents/DocumentFilters";
import DocumentPreview from "../../components/documents/DocumentPreview";
import RecentUploads from "../../components/documents/RecentUploads";
import DeleteDocumentModal from "../../components/documents/DeleteDocumentModal";
import UploadDocumentPage from "./UploadDocumentPage";
import DocumentDetailsPage from "./DocumentDetailsPage";
import SearchBar from "../../components/ui/SearchBar";

import { UploadCloud, Download, LayoutGrid, List, ChevronLeft, ChevronRight, FileCheck, Lock, ShieldCheck } from "lucide-react";
import { downloadDocumentsCSV } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const DocumentsPage = () => {
  const docHook = useDocuments();
  const [currentView, setCurrentView] = useState("list"); // "list", "upload", "details"
  const [viewMode, setViewMode] = useState("table");

  const handleNavigateAdd = () => setCurrentView("upload");
  const handleBackToList = () => setCurrentView("list");

  const handleUploadSubmit = async (formData) => {
    await docHook.handleUploadDocument(formData);
    handleBackToList();
  };

  const handleExportData = () => {
    downloadDocumentsCSV(docHook.rawDocuments);
    toast.success("Carrier document vault registry exported (CSV)!", { icon: "📊" });
  };

  return (
    <>
      {currentView === "upload" && (
        <UploadDocumentPage
          onCancel={handleBackToList}
          onSubmitSuccess={handleUploadSubmit}
        />
      )}

      {currentView === "details" && (
        <DocumentDetailsPage
          documentData={docHook.selectedDocument}
          onBack={handleBackToList}
        />
      )}

      {currentView === "list" && (
        <div className="animate-in fade-in duration-300 pb-10">
          {/* Top Header */}
          <div style={{ marginBottom: "28px" }} className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-3">
              <Link to="/dashboard" className="hover:text-[#2563EB] cursor-pointer transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="font-bold text-slate-900 dark:text-white">Documents</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Encrypted Documents Vault
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mt-1">
                  AES-256 bit secure repository for policy certificates, KYC passports, and claim loss proof files
                </p>
              </div>

              <div className="flex items-center gap-3.5 self-start sm:self-auto pr-1 sm:pr-2">
                <button
                  onClick={handleExportData}
                  className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export Registry</span>
                </button>

                <button
                  onClick={handleNavigateAdd}
                  className="px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <UploadCloud className="w-4.5 h-4.5" />
                  <span>Upload Document</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar - Guaranteed 28px Bottom Margin */}
          <div style={{ marginBottom: "28px" }} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Total Vault Files</span>
                <FileCheck className="w-5 h-5 text-[#2563EB]" />
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{docHook.stats.totalDocuments}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Verified Files</span>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{docHook.stats.verifiedDocuments}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Encryption Standard</span>
                <Lock className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-base font-black text-[#2563EB] dark:text-cyan-400">AES-256 Bit GCM</p>
            </div>
          </div>

          {/* Recent Uploads - Guaranteed 28px Bottom Margin */}
          <div style={{ marginBottom: "28px" }}>
            <RecentUploads documents={docHook.rawDocuments} />
          </div>

          {/* Toolbar - Guaranteed 28px Bottom Margin */}
          <div
            style={{ marginBottom: "28px" }}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <SearchBar
              searchQuery={docHook.searchQuery}
              setSearchQuery={docHook.setSearchQuery}
              placeholder="Search document title, customer, category..."
            />

            <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 w-full md:w-auto">
              <DocumentFilters
                categoryFilter={docHook.categoryFilter}
                setCategoryFilter={docHook.setCategoryFilter}
                statusFilter={docHook.statusFilter}
                setStatusFilter={docHook.setStatusFilter}
              />

              <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shrink-0 ml-2">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "table"
                      ? "bg-white dark:bg-slate-700 text-[#2563EB] dark:text-cyan-400 shadow-sm"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                  title="Table View"
                >
                  <List className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "card"
                      ? "bg-white dark:bg-slate-700 text-[#2563EB] dark:text-cyan-400 shadow-sm"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                  title="Grid Card View"
                >
                  <LayoutGrid className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main View - Guaranteed 28px Bottom Margin */}
          <div style={{ marginBottom: "28px" }}>
            {docHook.loading ? (
              <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
              </div>
            ) : viewMode === "table" ? (
              <DocumentTable
                documents={docHook.documents}
                onPreview={docHook.handlePreviewPrompt}
                onDelete={docHook.handleDeletePrompt}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {docHook.documents.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onPreview={docHook.handlePreviewPrompt}
                    onDelete={docHook.handleDeletePrompt}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {docHook.totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Showing Page <span className="font-bold text-slate-900 dark:text-white">{docHook.currentPage}</span> of{" "}
                <span className="font-bold text-slate-900 dark:text-white">{docHook.totalPages}</span> ({docHook.totalCount} total files)
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => docHook.setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={docHook.currentPage === 1}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#2563EB] dark:text-cyan-400">
                  {docHook.currentPage}
                </span>
                <button
                  onClick={() => docHook.setCurrentPage((prev) => Math.min(prev + 1, docHook.totalPages))}
                  disabled={docHook.currentPage === docHook.totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Modals */}
          <DocumentPreview
            isOpen={docHook.isPreviewOpen}
            onClose={() => docHook.setIsPreviewOpen(false)}
            document={docHook.previewDocument}
          />

          <DeleteDocumentModal
            isOpen={docHook.isDeleteModalOpen}
            onClose={() => docHook.setIsDeleteModalOpen(false)}
            onConfirm={docHook.confirmDeleteDocument}
            document={docHook.documentToDelete}
          />
        </div>
      )}
    </>
  );
};

export default DocumentsPage;
