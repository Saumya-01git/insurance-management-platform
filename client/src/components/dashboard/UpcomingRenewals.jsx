import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Clock, ArrowRight } from "lucide-react";
import { policyService } from "../../services/policyService";
import { formatPolicyNumber, formatCurrency, getCustomerName } from "../../utils/policyHelpers";
import { toast } from "react-hot-toast";

const UpcomingRenewals = () => {
  const navigate = useNavigate();
  const [renewals, setRenewals] = useState([]);

  useEffect(() => {
    const load = async () => {
      const list = await policyService.getPolicies();
      setRenewals(Array.isArray(list) ? list.slice(0, 4) : []);
    };
    load();
  }, []);

  const handleNavigateToRenew = (pol) => {
    toast.success(`Opening policy renewal center for ${pol.policyNumber || pol.id}`);
    navigate("/policies");
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Upcoming Policy Renewals
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">Next 30 Days</span>
      </div>

      <div className="space-y-3">
        {renewals.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs font-medium">
            No upcoming renewals due.
          </div>
        ) : (
          renewals.map((pol) => {
            const customerName = getCustomerName(pol.customer);
            return (
              <div
                key={pol.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/30">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                        {customerName}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        {formatPolicyNumber(pol.policyNumber || pol.id)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {pol.policyType} • <span className="font-extrabold text-slate-700 dark:text-slate-200">{formatCurrency(pol.premium)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30">
                    Due Soon
                  </span>
                  <button
                    onClick={() => handleNavigateToRenew(pol)}
                    className="w-8 h-8 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white flex items-center justify-center shadow-sm cursor-pointer transition-all active:scale-95"
                    title="Go to Policy Center to Renew"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UpcomingRenewals;
