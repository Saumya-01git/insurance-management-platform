import { Eye, Download, Trash2 } from "lucide-react";
import { getFileIcon, getDocumentStatusBadge, formatFileSize } from "../../utils/documentHelpers";
import { downloadDocumentFile } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const DocumentCard = ({ document, onPreview, onDelete }) => {
  const Icon = getFileIcon(document.fileType || document.title);
  const badge = getDocumentStatusBadge(document.status);
  const customerName = typeof document.customer === "object" ? (document.customer?.fullName || "Carrier Customer") : (document.customer || "Carrier Customer");

  const handleDownload = () => {
    downloadDocumentFile(document);
    toast.success(`Vault document ${document.title} downloaded!`);
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                {document.documentId || document.id}
              </p>
              <h4
                onClick={() => onPreview(document)}
                className="text-sm font-extrabold text-slate-900 dark:text-white hover:text-[#2563EB] cursor-pointer tracking-tight truncate"
              >
                {document.title}
              </h4>
            </div>
          </div>

          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${badge.bg} ${badge.text} ${badge.border} shrink-0`}>
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
            {badge.label}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Category</span>
            <span className="font-bold text-slate-900 dark:text-white">{document.category}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Insured Customer</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{customerName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Size</span>
            <span className="font-medium text-slate-500">{formatFileSize(document.fileSize)}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-1.5">
        <button
          onClick={() => onPreview(document)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
          title="Preview File"
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={handleDownload}
          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
          title="Download File"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete(document)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
          title="Delete File"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
