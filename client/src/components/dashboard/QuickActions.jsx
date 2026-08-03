import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  ShieldPlus,
  FilePlus,
  Upload,
  CreditCard,
  BarChart,
  Zap,
} from "lucide-react";

const QuickActions = ({ onOpenModal }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Add Customer",
      icon: UserPlus,
      color: "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30",
      action: () => (onOpenModal ? onOpenModal("CUSTOMER") : navigate("/customers")),
    },
    {
      label: "Create Policy",
      icon: ShieldPlus,
      color: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-400/30",
      action: () => (onOpenModal ? onOpenModal("POLICY") : navigate("/policies")),
    },
    {
      label: "Register Claim",
      icon: FilePlus,
      color: "bg-violet-500/15 text-violet-600 dark:text-violet-300 border-violet-400/30",
      action: () => (onOpenModal ? onOpenModal("CLAIM") : navigate("/claims")),
    },
    {
      label: "Record Payment",
      icon: CreditCard,
      color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-400/30",
      action: () => (onOpenModal ? onOpenModal("PAYMENT") : navigate("/payments")),
    },
    {
      label: "Upload Document",
      icon: Upload,
      color: "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30",
      action: () => (onOpenModal ? onOpenModal("DOCUMENT") : navigate("/documents")),
    },
    {
      label: "Generate Report",
      icon: BarChart,
      color: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-400/30",
      action: () => navigate("/reports"),
    },
  ];

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#120D30] border border-slate-200/90 dark:border-purple-500/25 shadow-xl dark:shadow-purple-950/30 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Zap className="w-5 h-5 text-purple-400" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Quick Actions
          </h3>
        </div>
        <span className="text-xs font-black text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-400/20 px-3.5 py-1 rounded-full">
          One-click carrier tools
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={act.action}
            className="p-4.5 rounded-2xl border border-slate-200/80 dark:border-purple-500/20 bg-slate-50/70 dark:bg-purple-950/40 hover:bg-white dark:hover:bg-purple-900/40 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/15 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2.5 group text-center"
          >
            <div className={`w-11 h-11 rounded-2xl ${act.color} border flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs`}>
              <act.icon className="w-5.5 h-5.5" />
            </div>
            <span className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
              {act.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
