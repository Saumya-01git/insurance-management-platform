import { Shield, Eye, Edit3, RefreshCw, Trash2, Calendar } from "lucide-react";
import { formatPolicyNumber, formatCurrency, formatDate, getPolicyStatusBadge, getCustomerName } from "../../utils/policyHelpers";

const PolicyCard = ({ policy, onView, onEdit, onRenew, onDelete }) => {
  const badge = getPolicyStatusBadge(policy.status);
  const customerName = getCustomerName(policy.customer);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-cyan-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                {formatPolicyNumber(policy.policyNumber || policy.id)}
              </p>
              <h4
                onClick={() => onView(policy)}
                className="text-sm font-extrabold text-slate-900 dark:text-white hover:text-[#2563EB] cursor-pointer tracking-tight line-clamp-1"
              >
                {policy.policyType}
              </h4>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
            {badge.label}
          </span>
        </div>

        {/* Customer & Premium */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Insured Customer</span>
            <span className="font-bold text-slate-900 dark:text-white">{customerName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Annual Premium</span>
            <span className="font-black text-[#2563EB] dark:text-cyan-400">{formatCurrency(policy.premium)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Coverage Amount</span>
            <span className="font-extrabold text-slate-700 dark:text-slate-200">{formatCurrency(policy.coverageAmount)}</span>
          </div>
        </div>

        {/* Term Dates */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Start: {formatDate(policy.startDate)}
          </span>
          <span>End: {formatDate(policy.endDate)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-1.5">
        <button
          onClick={() => onView(policy)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={() => onEdit(policy)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
          title="Edit Policy"
        >
          <Edit3 className="w-4 h-4" />
        </button>

        <button
          onClick={() => onRenew(policy)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
          title="Renew Term"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete(policy)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
          title="Delete Policy"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PolicyCard;
