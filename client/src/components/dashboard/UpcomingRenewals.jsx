import { Shield, Clock, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

const renewals = [
  {
    policyId: "POL-7712",
    customer: "Global Logistics Inc.",
    type: "Commercial Auto",
    premium: "$18,500",
    dueDate: "In 4 Days",
    urgent: true,
  },
  {
    policyId: "POL-6641",
    customer: "Elena Rostova",
    type: "Comprehensive Health",
    premium: "$4,200",
    dueDate: "In 9 Days",
    urgent: false,
  },
  {
    policyId: "POL-5590",
    customer: "Apex Tech Labs",
    type: "Cyber Risk & Liability",
    premium: "$32,000",
    dueDate: "In 14 Days",
    urgent: false,
  },
  {
    policyId: "POL-3329",
    customer: "Marcus Aurelius",
    type: "Term Life Coverage",
    premium: "$1,850",
    dueDate: "In 21 Days",
    urgent: false,
  },
];

const UpcomingRenewals = () => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Upcoming Policy Renewals
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">Next 30 Days</span>
      </div>

      <div className="space-y-3">
        {renewals.map((ren, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/30">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                    {ren.customer}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">
                    {ren.policyId}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {ren.type} • <span className="font-extrabold text-slate-700 dark:text-slate-200">{ren.premium}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                  ren.urgent
                    ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {ren.dueDate}
              </span>
              <button
                onClick={() => toast.success(`Renewal notice sent for ${ren.policyId}`)}
                className="w-8 h-8 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white flex items-center justify-center shadow-sm cursor-pointer transition-all"
                title="Send Renewal Notice"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingRenewals;
