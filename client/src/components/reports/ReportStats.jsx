import { DollarSign, Shield, FileText, CreditCard, Users } from "lucide-react";
import { formatCurrency } from "../../utils/policyHelpers";

const ReportStats = ({ summary = {} }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Revenue */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase text-slate-400">Total Gross Revenue</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xl font-black text-slate-900 dark:text-white">
          {formatCurrency(summary.totalRevenue || 4520000)}
        </p>
      </div>

      {/* Policies */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase text-slate-400">Policies Issued</span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-cyan-400 flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xl font-black text-slate-900 dark:text-white">
          {(summary.totalPolicies || 1240).toLocaleString()}
        </p>
      </div>

      {/* Claims */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase text-slate-400">Claims Processed</span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xl font-black text-slate-900 dark:text-white">
          {(summary.totalClaims || 184).toLocaleString()}
        </p>
      </div>

      {/* Payments */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase text-slate-400">Payments Settled</span>
          <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xl font-black text-slate-900 dark:text-white">
          {(summary.totalPayments || 3420).toLocaleString()}
        </p>
      </div>

      {/* Customers */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase text-slate-400">Active Customers</span>
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xl font-black text-slate-900 dark:text-white">
          {(summary.totalCustomers || 890).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ReportStats;
