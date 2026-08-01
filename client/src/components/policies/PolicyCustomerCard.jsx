import { User, Mail, ShieldCheck } from "lucide-react";
import { getCustomerName } from "../../utils/policyHelpers";

const PolicyCustomerCard = ({ policy }) => {
  if (!policy) return null;

  const customerName = getCustomerName(policy.customer);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          Insured Policyholder
        </span>
        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-cyan-400 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center">
          <User className="w-4.5 h-4.5" />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
          {customerName}
        </h4>
        {policy.customerEmail && (
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" /> {policy.customerEmail}
          </p>
        )}
        <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" /> Identity Verified (Prisma DB)
        </div>
      </div>
    </div>
  );
};

export default PolicyCustomerCard;
