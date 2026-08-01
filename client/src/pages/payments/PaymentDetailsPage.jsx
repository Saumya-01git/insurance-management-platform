import { useState, useEffect } from "react";
import PaymentStatusBadge from "../../components/payments/PaymentStatusBadge";
import PaymentHistory from "../../components/payments/PaymentHistory";
import { ArrowLeft, Download, CreditCard, DollarSign, Calendar, ShieldCheck, User, CheckCircle2 } from "lucide-react";
import { paymentService } from "../../services/paymentService";
import { formatPaymentId, formatDate, formatCurrency } from "../../utils/paymentHelpers";
import { downloadPaymentReceipt } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const PaymentDetailsPage = ({ paymentId, paymentData, onBack }) => {
  const [payment, setPayment] = useState(paymentData || null);
  const [loading, setLoading] = useState(!paymentData);

  useEffect(() => {
    if (!paymentData && paymentId) {
      const load = async () => {
        setLoading(true);
        const data = await paymentService.getPaymentById(paymentId);
        setPayment(data);
        setLoading(false);
      };
      load();
    }
  }, [paymentId, paymentData]);

  if (loading) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Payment Transaction Not Found</h4>
        <button onClick={onBack} className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold">
          Return to Payments
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    downloadPaymentReceipt(payment);
    toast.success(`Receipt CSV for ${payment.paymentId || payment.id} downloaded!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="hover:text-[#2563EB] cursor-pointer" onClick={onBack}>
                Payments
              </span>
              <span>/</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {formatPaymentId(payment.paymentId || payment.id)}
              </span>
            </nav>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
              Premium Payment Receipt & Voucher
            </h1>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Receipt File</span>
        </button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Receipt Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30 flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {payment.paymentMethod}
                  </h2>
                  <p className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                    {formatPaymentId(payment.paymentId || payment.id)}
                  </p>
                </div>
              </div>

              <PaymentStatusBadge status={payment.status} />
            </div>

            {/* Financial Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Settled Amount</span>
                <span className="text-xl font-black text-[#10B981] dark:text-emerald-400 flex items-center gap-1">
                  <DollarSign className="w-5 h-5" />
                  {formatCurrency(payment.amount)}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Settlement Date</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(payment.date)}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Transaction Reference</span>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white truncate block">
                  {payment.transactionId || "TXN-9940128"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500 dark:text-slate-400">Payment Gateway Processor</span>
              <span className="text-slate-900 dark:text-white">{payment.gateway || "Stripe Enterprise Gateway"}</span>
            </div>
          </div>

          <PaymentHistory history={payment.history} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#2563EB]" /> Remitting Policyholder
            </h4>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">
              {typeof payment.customer === "object" ? (payment.customer?.fullName || "Carrier Customer") : (payment.customer || "Carrier Customer")}
            </p>
            <p className="text-xs font-mono text-[#2563EB] dark:text-cyan-400 font-extrabold">
              {payment.customerId || "CUST-1049"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Settled Policy Agreement
            </h4>
            <p className="text-sm font-mono font-extrabold text-slate-900 dark:text-white">
              {payment.policyNumber || "POL-9012"}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> Escrow Deposit Cleared
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
