import { Clock, CheckCircle2 } from "lucide-react";

const PaymentHistory = ({ history = [] }) => {
  if (!history || history.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm text-center text-xs text-slate-400">
        No additional gateway clearance events logged.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-emerald-500" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
          Gateway Audit Trail & Clearance Log
        </h3>
      </div>

      <div className="space-y-4 pl-2 relative">
        {history.map((item, idx) => (
          <div key={item.id || idx} className="flex items-start gap-4 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 z-10 border border-emerald-200 dark:border-emerald-900/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center justify-between text-xs">
                <h5 className="font-extrabold text-slate-900 dark:text-white">{item.title}</h5>
                <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
