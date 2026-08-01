import { Clock, CheckCircle2, User, FileText, AlertCircle } from "lucide-react";

const CustomerTimeline = ({ timeline = [] }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 space-y-2">
        <Clock className="w-8 h-8 text-slate-400 mx-auto" />
        <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">No Activity Logs</h5>
        <p className="text-[11px] text-slate-400">Activity history will populate as policy events occur.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-500" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Customer Activity Log & Audit Trail
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">Real-time Events</span>
      </div>

      <div className="space-y-4 relative pl-2">
        {timeline.map((item, idx) => (
          <div key={item.id || idx} className="flex items-start gap-4 relative group">
            {/* Timeline Vertical Line */}
            {idx !== timeline.length - 1 && (
              <div className="absolute left-[15px] top-7 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
            )}

            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-cyan-400 flex items-center justify-center shrink-0 z-10 border border-blue-200 dark:border-blue-900/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>

            <div className="space-y-1 flex-1 pb-2">
              <div className="flex items-center justify-between text-xs">
                <h5 className="font-extrabold text-slate-900 dark:text-white">
                  {item.title}
                </h5>
                <span className="text-[10px] font-semibold text-slate-400">
                  {item.date}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {item.description}
              </p>
              {item.user && (
                <p className="text-[10px] text-slate-400 font-semibold">
                  Executed by: <span className="text-slate-600 dark:text-slate-300">{item.user}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTimeline;
