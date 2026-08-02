import { useState, useEffect } from "react";
import { ArrowLeft, Download, ShieldCheck, FileText, Calendar, Lock, User, Shield } from "lucide-react";
import { documentService } from "../../services/documentService";
import { formatFileSize, getDocumentStatusBadge } from "../../utils/documentHelpers";
import { downloadDocumentFile } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const DocumentDetailsPage = ({ documentId, documentData, onBack }) => {
  const [doc, setDoc] = useState(documentData || null);
  const [loading, setLoading] = useState(!documentData);

  useEffect(() => {
    if (!documentData && documentId) {
      const load = async () => {
        setLoading(true);
        const data = await documentService.getDocumentById(documentId);
        setDoc(data);
        setLoading(false);
      };
      load();
    }
  }, [documentId, documentData]);

  if (loading) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Document Record Not Found</h4>
        <button onClick={onBack} className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold">
          Return to Documents Vault
        </button>
      </div>
    );
  }

  const badge = getDocumentStatusBadge(doc.status);
  const customerName = typeof doc.customer === "object" ? (doc.customer?.fullName || "Carrier Customer") : (doc.customer || "Carrier Customer");

  const handleDownload = () => {
    downloadDocumentFile(doc);
    toast.success(`Vault document ${doc.title} downloaded!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="hover:text-[#2563EB] cursor-pointer" onClick={onBack}>
                Documents
              </span>
              <span>/</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {doc.documentId || doc.id}
              </span>
            </nav>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
              Encrypted Vault Document Details
            </h1>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Vault Copy</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/30 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {doc.title}
                  </h2>
                  <p className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                    {doc.documentId || doc.id} • {doc.category}
                  </p>
                </div>
              </div>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                {badge.label}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">File Size</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{formatFileSize(doc.fileSize)}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Upload Date</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {doc.uploadDate}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Uploaded By</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">{doc.uploadedBy || "Agent Saumya"}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-500" /> Security & Compliance Notes
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {doc.notes || "Encrypted storage under Carrier Suite Vault Policy."}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#2563EB]" /> Associated Customer
            </h4>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">{customerName}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-500" /> Associated Policy #
            </h4>
            <p className="text-sm font-mono font-extrabold text-slate-900 dark:text-white">{doc.policyNumber || "POL-9012"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailsPage;
