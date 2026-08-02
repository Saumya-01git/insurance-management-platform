import { FileCheck, ShieldCheck } from "lucide-react";
import { formatFileSize } from "../../utils/documentHelpers";

const RecentUploads = ({ documents = [] }) => {
  const recentDocs = documents.slice(0, 4);

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-purple-500" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recent Vault Uploads
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">Encrypted</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {recentDocs.map((doc) => (
          <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate max-w-[180px]">{doc.title}</span>
              <span className="text-[10px] font-mono text-slate-400">{formatFileSize(doc.fileSize)}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <span>{doc.category}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUploads;
