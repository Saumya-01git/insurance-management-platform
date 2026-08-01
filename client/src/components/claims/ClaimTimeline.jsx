import { Clock, CheckCircle2 } from "lucide-react";

const ClaimTimeline = ({ timeline = [] }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm text-center text-xs text-slate-400">
        No approval timeline events logged yet.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-cyan-500" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
          Approval Timeline & Risk Log
        </h3>
      </div>

      <div className="space-y-4 pl-2 relative">
        {timeline.map((item, idx) => (
          <div key={item.id || idx} className="flex items-start gap-4 relative">
            {idx !== timeline.length - 1 && (
              <div className="absolute left-[15px] top-7 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
            )}
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-cyan-400 flex items-center justify-center shrink-0 z-10 border border-blue-200 dark:border-blue-900/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center justify-between text-xs">
                <h5 className="font-extrabold text-slate-900 dark:text-white">{item.title}</h5>
                <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.description}</p>
              {item.user && (
                <p className="text-[10px] text-slate-400">Officer: <span className="font-semibold">{item.user}</span></p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimTimeline;
