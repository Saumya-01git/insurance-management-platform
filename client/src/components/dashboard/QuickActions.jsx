import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
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
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/30",
      action: () => (onOpenModal ? onOpenModal("CUSTOMER") : navigate("/customers")),
    },
    {
      label: "Create Policy",
      icon: ShieldPlus,
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900/30",
      action: () => (onOpenModal ? onOpenModal("POLICY") : navigate("/policies")),
    },
    {
      label: "Register Claim",
      icon: FilePlus,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/30",
      action: () => (onOpenModal ? onOpenModal("CLAIM") : navigate("/claims")),
    },
    {
      label: "Record Payment",
      icon: CreditCard,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30",
      action: () => (onOpenModal ? onOpenModal("PAYMENT") : navigate("/payments")),
    },
    {
      label: "Upload Document",
      icon: Upload,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/30",
      action: () => (onOpenModal ? onOpenModal("DOCUMENT") : navigate("/documents")),
    },
    {
      label: "Generate Report",
      icon: BarChart,
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/30",
      action: () => navigate("/reports"),
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-500" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Quick Actions
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">One-click carrier tools</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={act.action}
            className="p-3.5 rounded-2xl border bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 group text-center"
          >
            <div className={`w-10 h-10 rounded-xl ${act.color} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <act.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#2563EB] dark:group-hover:text-cyan-400 transition-colors">
              {act.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
