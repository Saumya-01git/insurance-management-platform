import { FolderOpen, FileCheck, Download, UploadCloud } from "lucide-react";
import { formatDate } from "../../utils/customerHelpers";
import { toast } from "react-hot-toast";

const CustomerDocuments = ({ documents = [] }) => {
  const handleUploadClick = () => {
    toast.success("Document Upload Vault active. Select KYC/Policy PDF file.", { icon: "📄" });
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-purple-500" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Encrypted Documents Vault ({documents.length})
          </h3>
        </div>
        <button
          onClick={handleUploadClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/30 text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload Document</span>
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 space-y-2">
          <FolderOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">No Documents Uploaded</h5>
          <p className="text-[11px] text-slate-400">Upload identity proof or contract documents for KYC verification.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-900/30">
                  <FileCheck className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {doc.name}
                  </h5>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {doc.type} • {doc.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-700/40">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ {doc.status || "VERIFIED"}
                </span>
                <button
                  onClick={() => toast.success(`Downloading ${doc.name}...`)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#2563EB] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDocuments;
