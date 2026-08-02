import { Eye, Edit3, Trash2 } from "lucide-react";
import { formatCustomerId, formatCurrency, formatDate, getInitials, getStatusBadgeStyle } from "../../utils/customerHelpers";

const CustomerTable = ({ customers, onView, onEdit, onDelete }) => {
  if (!customers || customers.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          🔍
        </div>
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Customers Found</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No carrier customer records match your filter criteria or search keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0C1424] shadow-sm">
      <table className="w-full text-left border-collapse min-w-[1050px]">
        <thead>
          <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <th className="py-4.5 px-6 min-w-[130px]">Customer ID</th>
            <th className="py-4.5 px-6 min-w-[70px]">Profile</th>
            <th className="py-4.5 px-6 min-w-[190px]">Customer Name</th>
            <th className="py-4.5 px-6 min-w-[210px]">Email</th>
            <th className="py-4.5 px-6 min-w-[150px]">Phone</th>
            <th className="py-4.5 px-6 text-center min-w-[120px]">Policies</th>
            <th className="py-4.5 px-6 min-w-[140px]">Total Premium</th>
            <th className="py-4.5 px-6 min-w-[130px]">Status</th>
            <th className="py-4.5 px-6 min-w-[130px]">Created Date</th>
            <th className="py-4.5 px-6 text-right min-w-[120px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm font-semibold">
          {customers.map((cust) => {
            const badgeStyle = getStatusBadgeStyle(cust.status);
            return (
              <tr key={cust.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                {/* ID */}
                <td className="py-5 px-6 font-mono font-extrabold text-[#2563EB] dark:text-cyan-400 whitespace-nowrap text-xs sm:text-sm">
                  {formatCustomerId(cust.id)}
                </td>

                {/* Profile Photo */}
                <td className="py-5 px-6 whitespace-nowrap">
                  {cust.avatar ? (
                    <img
                      src={cust.avatar}
                      alt={cust.fullName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                      {getInitials(cust.fullName)}
                    </div>
                  )}
                </td>

                {/* Name */}
                <td className="py-5 px-6 font-black text-slate-900 dark:text-white whitespace-nowrap text-xs sm:text-sm">
                  <div>
                    <p className="hover:text-[#2563EB] cursor-pointer" onClick={() => onView(cust)}>
                      {cust.fullName}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">{cust.occupation || "Individual"}</p>
                  </div>
                </td>

                {/* Email */}
                <td className="py-5 px-6 text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-xs sm:text-sm">
                  {cust.email}
                </td>

                {/* Phone */}
                <td className="py-5 px-6 text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-xs sm:text-sm">
                  {cust.phone}
                </td>

                {/* Policy Count */}
                <td className="py-5 px-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-cyan-400 font-black text-xs border border-blue-100 dark:border-blue-900/30">
                    {cust.policiesCount || cust.policies?.length || 0} Policies
                  </span>
                </td>

                {/* Total Premium */}
                <td className="py-5 px-6 font-black text-slate-900 dark:text-white whitespace-nowrap text-xs sm:text-sm">
                  {formatCurrency(cust.totalPremium)}
                </td>

                {/* Status */}
                <td className="py-5 px-6 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
                    {cust.status || "ACTIVE"}
                  </span>
                </td>

                {/* Created Date */}
                <td className="py-5 px-6 text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-xs sm:text-sm">
                  {formatDate(cust.createdDate)}
                </td>

                {/* Actions */}
                <td className="py-5 px-6 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onView(cust)}
                      className="p-2 rounded-xl text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>

                    <button
                      onClick={() => onEdit(cust)}
                      className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
                      title="Edit Customer"
                    >
                      <Edit3 className="w-4.5 h-4.5" />
                    </button>

                    <button
                      onClick={() => onDelete(cust)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Delete Customer"
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

export default CustomerTable;
