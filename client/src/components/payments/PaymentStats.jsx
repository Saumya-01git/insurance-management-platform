import { DollarSign, CreditCard, Clock, AlertTriangle } from "lucide-react";
import { formatCurrency } from "../../utils/paymentHelpers";

const PaymentStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats?.totalRevenue ?? 4520000),
      badge: "+15.8%",
      icon: DollarSign,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30",
      description: "Gross written premium collected",
    },
    {
      title: "Today's Settlements",
      value: stats?.todaysPayments ?? 0,
      badge: "Real-time",
      icon: CreditCard,
      color: "bg-[#2563EB]/10 text-[#2563EB] dark:text-cyan-400 border-blue-200 dark:border-blue-900/30",
      description: "Settled payments today",
    },
    {
      title: "Pending Settlements",
      value: stats?.pendingPayments ?? 0,
      badge: "In Transit",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/30",
      description: "ACH / Check clearance",
    },
    {
      title: "Overdue Payments",
      value: stats?.overduePayments ?? 0,
      badge: "Escalated",
      icon: AlertTriangle,
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/30",
      description: "Overdue installment policies",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {statCards.map((st, idx) => {
        const Icon = st.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {st.title}
              </span>
              <div className={`w-10 h-10 rounded-xl ${st.color} border flex items-center justify-center shrink-0 shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {st.value}
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {st.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentStats;
