import { X, Download, ShieldCheck, FileText } from "lucide-react";
import { getFileIcon, formatFileSize } from "../../utils/documentHelpers";
import { downloadDocumentFile } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const DocumentPreview = ({ isOpen, onClose, document }) => {
  if (!isOpen || !document) return null;

  const Icon = getFileIcon(document.fileType || document.title);
  const customerName = typeof document.customer === "object" ? (document.customer?.fullName || "Carrier Customer") : (document.customer || "Carrier Customer");

  const handleDownload = () => {
    downloadDocumentFile(document);
    toast.success(`Vault document ${document.title} downloaded!`, { icon: "📥" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-900/30">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                {document.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {document.documentId || document.id} • {document.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Viewer Simulation */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto shadow-sm">
              <FileText className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                Encrypted Document Preview
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Verified high-assurance carrier document vault copy ({formatFileSize(document.fileSize)}).
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-200 dark:border-emerald-900/30">
              <ShieldCheck className="w-4 h-4" /> Identity Verified & Encrypted
            </div>
          </div>

          {/* Details Table */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Insured Policyholder</span>
              <span className="font-extrabold text-slate-900 dark:text-white">{customerName}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Associated Policy Number</span>
              <span className="font-mono font-bold text-[#2563EB] dark:text-cyan-400">{document.policyNumber || "POL-9012"}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Upload Date</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{document.uploadDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Vault Notes</span>
              <span className="font-medium text-slate-600 dark:text-slate-300">{document.notes || "Stored under carrier encryption key."}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
