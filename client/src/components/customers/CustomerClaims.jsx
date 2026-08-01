import { FileText } from "lucide-react";
import { formatDate } from "../../utils/customerHelpers";

const CustomerClaims = ({ claims = [] }) => {
  if (!claims || claims.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 space-y-2">
        <FileText className="w-8 h-8 text-slate-400 mx-auto" />
        <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">No Filed Claims</h5>
        <p className="text-[11px] text-slate-400">This customer has clean claims history with 0 active losses.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-500" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Filed Claims ({claims.length})
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pr-4">Claim Reference</th>
              <th className="pb-3 px-4">Loss Type</th>
              <th className="pb-3 px-4">Claimed Amount</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 px-4">Filing Date</th>
              <th className="pb-3 pl-4">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-semibold">
            {claims.map((clm) => (
              <tr key={clm.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 pr-4 font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                  {clm.id}
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                  {clm.type}
                </td>
                <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">
                  {clm.amount}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-900/30">
                    {clm.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-medium">
                  {formatDate(clm.date)}
                </td>
                <td className="py-3.5 pl-4 text-slate-600 dark:text-slate-300 font-normal">
                  {clm.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerClaims;
