import { CreditCard, Eye, Download, Calendar } from "lucide-react";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { formatPaymentId, formatCurrency, formatDate, getCustomerName } from "../../utils/paymentHelpers";
import { downloadPaymentReceipt } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const PaymentCard = ({ payment, onView }) => {
  const customerName = getCustomerName(payment.customer);

  const handleDownload = () => {
    downloadPaymentReceipt(payment);
    toast.success(`Receipt CSV for ${payment.paymentId || payment.id} downloaded!`);
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                {formatPaymentId(payment.paymentId || payment.id)}
              </p>
              <h4
                onClick={() => onView(payment)}
                className="text-sm font-extrabold text-slate-900 dark:text-white hover:text-[#2563EB] cursor-pointer tracking-tight line-clamp-1"
              >
                {customerName}
              </h4>
            </div>
          </div>

          <PaymentStatusBadge status={payment.status} />
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Payment Amount</span>
            <span className="font-black text-[#10B981] dark:text-emerald-400">{formatCurrency(payment.amount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Method</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">{payment.paymentMethod}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Policy #</span>
            <span className="font-mono text-slate-600 dark:text-slate-300 font-bold">{payment.policyNumber || "POL-9012"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Settled: {formatDate(payment.date)}
          </span>
          <span className="font-mono text-[10px]">{payment.transactionId}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-1.5">
        <button
          onClick={() => onView(payment)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
          title="View Receipt"
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={handleDownload}
          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
          title="Download Receipt CSV"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
