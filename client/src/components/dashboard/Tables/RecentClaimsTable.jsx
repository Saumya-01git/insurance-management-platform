import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowUpRight } from "lucide-react";
import { claimService } from "../../../services/claimService";
import { formatClaimId, formatCurrency, formatDate, getCustomerName } from "../../../utils/claimHelpers";

const statusStyles = {
  APPROVED: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30",
  UNDER_REVIEW: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900/30",
  PENDING: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900/30",
  REJECTED: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900/30",
};

const RecentClaimsTable = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const load = async () => {
      const list = await claimService.getClaims();
      setClaims(Array.isArray(list) ? list.slice(0, 5) : []);
    };
    load();
  }, []);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-500" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recent Claim Filings
          </h3>
        </div>
        <button
          onClick={() => navigate("/claims")}
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] dark:text-cyan-400 hover:underline cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pr-4">Claim Reference</th>
              <th className="pb-3 px-4">Claimant</th>
              <th className="pb-3 px-4">Claim Type</th>
              <th className="pb-3 px-4">Amount</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 pl-4 text-right">Filing Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-semibold">
            {claims.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-400 text-xs font-medium">
                  No active claims found in registry.
                </td>
              </tr>
            ) : (
              claims.map((claim) => {
                const customerName = getCustomerName(claim.customer);
                const statusKey = (claim.status || "PENDING").toUpperCase();
                return (
                  <tr key={claim.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 pr-4 font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                      {formatClaimId(claim.claimId || claim.id)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {customerName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                      {claim.claimType}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-white">
                      {typeof claim.claimAmount === "number" ? formatCurrency(claim.claimAmount) : claim.claimAmount}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                          statusStyles[statusKey] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {statusKey.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 pl-4 text-right text-slate-500 dark:text-slate-400 font-medium">
                      {formatDate(claim.date)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentClaimsTable;
