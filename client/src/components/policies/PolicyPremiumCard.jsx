import { DollarSign, Shield, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/policyHelpers";

const PolicyPremiumCard = ({ policy }) => {
  if (!policy) return null;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          Financial Portfolio
        </span>
        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30 flex items-center justify-center">
          <DollarSign className="w-4.5 h-4.5" />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-[11px] font-medium text-slate-400 block">Annual Written Premium</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {formatCurrency(policy.premium)}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Policy Coverage Limit:</span>
          <span className="font-extrabold text-slate-900 dark:text-white">{formatCurrency(policy.coverageAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default PolicyPremiumCard;
