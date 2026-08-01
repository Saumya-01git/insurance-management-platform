import { FolderOpen, FileCheck, Download } from "lucide-react";
import { toast } from "react-hot-toast";

const ClaimDocuments = ({ documents = [] }) => {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <FolderOpen className="w-4 h-4 text-purple-500" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
          Uploaded Loss Documents ({documents.length})
        </h3>
      </div>

      {documents.length === 0 ? (
        <p className="text-xs text-slate-400">No loss proof documents uploaded for this claim.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {documents.map((doc) => (
            <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileCheck className="w-4 h-4 text-purple-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.name}</p>
                  <p className="text-[10px] text-slate-400">{doc.size}</p>
                </div>
              </div>
              <button
                onClick={() => toast.success(`Downloading ${doc.name}...`)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#2563EB] hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimDocuments;
