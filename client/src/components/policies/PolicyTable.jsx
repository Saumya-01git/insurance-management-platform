import { Eye, Edit3, RefreshCw, Trash2 } from "lucide-react";
import { formatPolicyNumber, formatCurrency, formatDate, getPolicyStatusBadge, getCustomerName } from "../../utils/policyHelpers";

const PolicyTable = ({ policies, onView, onEdit, onRenew, onDelete }) => {
  if (!policies || policies.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          🛡️
        </div>
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Policies Found</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No underwritten policy agreements match your active search or status filter.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0C1424] shadow-sm">
      <table className="w-full text-left border-collapse min-w-[1050px]">
        <thead>
          <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <th className="py-4.5 px-6 min-w-[130px]">Policy Number</th>
            <th className="py-4.5 px-6 min-w-[190px]">Customer</th>
            <th className="py-4.5 px-6 min-w-[190px]">Policy Type</th>
            <th className="py-4.5 px-6 min-w-[140px]">Annual Premium</th>
            <th className="py-4.5 px-6 min-w-[150px]">Coverage Limit</th>
            <th className="py-4.5 px-6 min-w-[130px]">Start Date</th>
            <th className="py-4.5 px-6 min-w-[130px]">End Date</th>
            <th className="py-4.5 px-6 min-w-[130px]">Status</th>
            <th className="py-4.5 px-6 text-right min-w-[140px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm font-semibold">
          {policies.map((pol) => {
            const badge = getPolicyStatusBadge(pol.status);
            const customerName = getCustomerName(pol.customer);
            return (
              <tr key={pol.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                {/* Policy Number */}
                <td className="py-5 px-6 font-mono font-extrabold text-[#2563EB] dark:text-cyan-400 whitespace-nowrap text-xs sm:text-sm">
                  {formatPolicyNumber(pol.policyNumber || pol.id)}
                </td>

                {/* Customer */}
                <td className="py-5 px-6 font-black text-slate-900 dark:text-white whitespace-nowrap text-xs sm:text-sm">
                  <div>
                    <p className="hover:text-[#2563EB] cursor-pointer" onClick={() => onView(pol)}>
                      {customerName}
                    </p>
                    {pol.customerEmail && (
                      <p className="text-xs text-slate-400 font-medium">{pol.customerEmail}</p>
                    )}
                  </div>
                </td>

                {/* Policy Type */}
                <td className="py-5 px-6 text-slate-700 dark:text-slate-200 font-bold whitespace-nowrap text-xs sm:text-sm">
                  {pol.policyType}
                </td>

                {/* Premium */}
                <td className="py-5 px-6 font-black text-slate-900 dark:text-white whitespace-nowrap text-xs sm:text-sm">
                  {formatCurrency(pol.premium)}
                </td>

                {/* Coverage Amount */}
                <td className="py-5 px-6 font-black text-slate-700 dark:text-slate-200 whitespace-nowrap text-xs sm:text-sm">
                  {formatCurrency(pol.coverageAmount)}
                </td>

                {/* Start Date */}
                <td className="py-5 px-6 text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-xs sm:text-sm">
                  {formatDate(pol.startDate)}
                </td>

                {/* End Date */}
                <td className="py-5 px-6 text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-xs sm:text-sm">
                  {formatDate(pol.endDate)}
                </td>

                {/* Status */}
                <td className="py-5 px-6 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.label}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-5 px-6 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onView(pol)}
                      className="p-2 rounded-xl text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                      title="View Policy Details"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>

                    <button
                      onClick={() => onEdit(pol)}
                      className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
                      title="Edit Policy"
                    >
                      <Edit3 className="w-4.5 h-4.5" />
                    </button>

                    <button
                      onClick={() => onRenew(pol)}
                      className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
                      title="Renew Policy Term"
                    >
                      <RefreshCw className="w-4.5 h-4.5" />
                    </button>

                    <button
                      onClick={() => onDelete(pol)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Delete Policy"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyTable;
