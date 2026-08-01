import { Eye, Edit3, CheckCircle, XCircle, Trash2 } from "lucide-react";
import ClaimStatusBadge from "./ClaimStatusBadge";
import { formatClaimId, formatCurrency, formatDate, getCustomerName } from "../../utils/claimHelpers";

const ClaimTable = ({ claims, onView, onEdit, onApprove, onReject, onDelete }) => {
  if (!claims || claims.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          📋
        </div>
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Claims Found</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No registered claim filings match your active search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0C1424] shadow-sm">
      <table className="w-full text-left border-collapse min-w-[1050px]">
        <thead>
          <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            <th className="py-4 px-5 min-w-[120px]">Claim ID</th>
            <th className="py-4 px-5 min-w-[170px]">Customer</th>
            <th className="py-4 px-5 min-w-[130px]">Policy #</th>
            <th className="py-4 px-5 min-w-[140px]">Loss Type</th>
            <th className="py-4 px-5 min-w-[130px]">Claim Amount</th>
            <th className="py-4 px-5 min-w-[120px]">Filing Date</th>
            <th className="py-4 px-5 min-w-[130px]">Status</th>
            <th className="py-4 px-5 min-w-[150px]">Assigned Agent</th>
            <th className="py-4 px-5 text-right min-w-[150px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-semibold">
          {claims.map((clm) => {
            const customerName = getCustomerName(clm.customer);
            return (
              <tr key={clm.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                {/* Claim ID */}
                <td className="py-4.5 px-5 font-mono font-extrabold text-[#2563EB] dark:text-cyan-400 whitespace-nowrap">
                  {formatClaimId(clm.claimId || clm.id)}
                </td>

                {/* Customer */}
                <td className="py-4.5 px-5 font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                  <span className="hover:text-[#2563EB] cursor-pointer" onClick={() => onView(clm)}>
                    {customerName}
                  </span>
                </td>

                {/* Policy # */}
                <td className="py-4.5 px-5 font-mono text-slate-600 dark:text-slate-300 font-bold whitespace-nowrap">
                  {clm.policyNumber || "POL-9012"}
                </td>

                {/* Loss Type */}
                <td className="py-4.5 px-5 text-slate-700 dark:text-slate-200 font-bold whitespace-nowrap">
                  {clm.claimType}
                </td>

                {/* Amount */}
                <td className="py-4.5 px-5 font-black text-slate-900 dark:text-white whitespace-nowrap">
                  {typeof clm.claimAmount === "number" ? formatCurrency(clm.claimAmount) : clm.claimAmount}
                </td>

                {/* Date */}
                <td className="py-4.5 px-5 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                  {formatDate(clm.date)}
                </td>

                {/* Status */}
                <td className="py-4.5 px-5 whitespace-nowrap">
                  <ClaimStatusBadge status={clm.status} />
                </td>

                {/* Assigned Agent */}
                <td className="py-4.5 px-5 text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                  {clm.assignedAgent || "Agent Saumya"}
                </td>

                {/* Actions */}
                <td className="py-4.5 px-5 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onView(clm)}
                      className="p-2 rounded-xl text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onEdit(clm)}
                      className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
                      title="Update Claim"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {clm.status !== "APPROVED" && (
                      <button
                        onClick={() => onApprove(clm.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
                        title="Approve Claim"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}

                    {clm.status !== "REJECTED" && (
                      <button
                        onClick={() => onReject(clm.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Reject Claim"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => onDelete(clm)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Delete Claim"
                    >
                      <Trash2 className="w-4 h-4" />
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

export default ClaimTable;
