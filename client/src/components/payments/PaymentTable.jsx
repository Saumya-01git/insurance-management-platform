import { Eye, Download } from "lucide-react";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { formatPaymentId, formatCurrency, formatDate, getCustomerName } from "../../utils/paymentHelpers";
import { downloadPaymentReceipt } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const PaymentTable = ({ payments, onView }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          💳
        </div>
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Payment Records Found</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No premium payment settlements match your active search or filter criteria.
        </p>
      </div>
    );
  }

  const handleDownload = (pay) => {
    downloadPaymentReceipt(pay);
    toast.success(`Receipt CSV for ${pay.paymentId || pay.id} downloaded!`);
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0C1424] shadow-sm">
      <table className="w-full text-left border-collapse min-w-[1050px]">
        <thead>
          <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <th className="py-4.5 px-6 min-w-[130px]">Payment ID</th>
            <th className="py-4.5 px-6 min-w-[180px]">Customer</th>
            <th className="py-4.5 px-6 min-w-[140px]">Policy #</th>
            <th className="py-4.5 px-6 min-w-[140px]">Amount</th>
            <th className="py-4.5 px-6 min-w-[170px]">Payment Method</th>
            <th className="py-4.5 px-6 min-w-[170px]">Transaction ID</th>
            <th className="py-4.5 px-6 min-w-[130px]">Settlement Date</th>
            <th className="py-4.5 px-6 min-w-[130px]">Status</th>
            <th className="py-4.5 px-6 text-right min-w-[120px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm font-semibold">
          {payments.map((pay) => {
            const customerName = getCustomerName(pay.customer);
            return (
              <tr key={pay.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                {/* Payment ID */}
                <td className="py-5 px-6 font-mono font-extrabold text-[#2563EB] dark:text-cyan-400 whitespace-nowrap text-xs sm:text-sm">
                  {formatPaymentId(pay.paymentId || pay.id)}
                </td>

                {/* Customer */}
                <td className="py-5 px-6 font-black text-slate-900 dark:text-white whitespace-nowrap text-xs sm:text-sm">
                  <span className="hover:text-[#2563EB] cursor-pointer" onClick={() => onView(pay)}>
                    {customerName}
                  </span>
                </td>

                {/* Policy # */}
                <td className="py-5 px-6 font-mono text-slate-700 dark:text-slate-200 font-bold whitespace-nowrap text-xs sm:text-sm">
                  {pay.policyNumber || "POL-9012"}
                </td>

                {/* Amount */}
                <td className="py-5 px-6 font-black text-[#10B981] dark:text-emerald-400 whitespace-nowrap text-xs sm:text-sm">
                  {formatCurrency(pay.amount)}
                </td>

                {/* Payment Method */}
                <td className="py-5 px-6 text-slate-700 dark:text-slate-200 font-bold whitespace-nowrap text-xs sm:text-sm">
                  {pay.paymentMethod}
                </td>

                {/* Transaction ID */}
                <td className="py-5 px-6 font-mono text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">
                  {pay.transactionId || "TXN-9901428"}
                </td>

                {/* Date */}
                <td className="py-5 px-6 text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-xs sm:text-sm">
                  {formatDate(pay.date)}
                </td>

                {/* Status */}
                <td className="py-5 px-6 whitespace-nowrap">
                  <PaymentStatusBadge status={pay.status} />
                </td>

                {/* Actions */}
                <td className="py-5 px-6 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onView(pay)}
                      className="p-2 rounded-xl text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                      title="View Receipt Details"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>

                    <button
                      onClick={() => handleDownload(pay)}
                      className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
                      title="Download Official Receipt CSV"
                    >
                      <Download className="w-4.5 h-4.5" />
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

export default PaymentTable;
