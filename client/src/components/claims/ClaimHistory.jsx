import { MessageSquare } from "lucide-react";

const ClaimHistory = ({ comments = [] }) => {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-cyan-500" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
          Adjuster Comments & Review Notes ({comments.length})
        </h3>
      </div>

      {comments.length === 0 ? (
        <p className="text-xs text-slate-400">No adjuster review notes recorded.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900 dark:text-white">{c.author}</span>
                <span className="text-[10px] text-slate-400">{c.date}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimHistory;
