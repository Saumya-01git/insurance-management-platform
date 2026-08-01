import { useState, useEffect } from "react";
import PolicyPremiumCard from "../../components/policies/PolicyPremiumCard";
import PolicyCustomerCard from "../../components/policies/PolicyCustomerCard";
import PolicyTimeline from "../../components/policies/PolicyTimeline";
import { ArrowLeft, Edit3, Shield, RefreshCw, Calendar, FileText } from "lucide-react";
import { policyService } from "../../services/policyService";
import { formatPolicyNumber, formatDate, getPolicyStatusBadge, formatCurrency } from "../../utils/policyHelpers";

const PolicyDetailsPage = ({ policyId, policyData, onBack, onEdit, onRenew }) => {
  const [policy, setPolicy] = useState(policyData || null);
  const [loading, setLoading] = useState(!policyData);

  useEffect(() => {
    if (!policyData && policyId) {
      const load = async () => {
        setLoading(true);
        const data = await policyService.getPolicyById(policyId);
        setPolicy(data);
        setLoading(false);
      };
      load();
    }
  }, [policyId, policyData]);

  if (loading) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Policy Record Not Found</h4>
        <button onClick={onBack} className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold">
          Return to Policy Center
        </button>
      </div>
    );
  }

  const badge = getPolicyStatusBadge(policy.status);

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
                Policies
              </span>
              <span>/</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {formatPolicyNumber(policy.policyNumber || policy.id)}
              </span>
            </nav>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
              Policy Underwriting File
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onRenew && (
            <button
              onClick={() => onRenew(policy)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Renew Term</span>
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(policy)}
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Agreement</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Main File Details) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-cyan-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {policy.policyType}
                  </h2>
                  <p className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                    {formatPolicyNumber(policy.policyNumber || policy.id)}
                  </p>
                </div>
              </div>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                {badge.label}
              </span>
            </div>

            {/* Terms & Dates Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Effective Start Date</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(policy.startDate)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Expiration Date</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(policy.endDate)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Assigned Underwriter</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                  {policy.underwriter || "Agent Saumya"}
                </span>
              </div>
            </div>

            {/* Notes Section */}
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-500" /> Underwriting Terms & Risk Notes
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {policy.notes || "No special risk endorsements attached to this carrier policy agreement."}
              </p>
            </div>
          </div>

          <PolicyTimeline timeline={policy.timeline} />
        </div>

        {/* Right Column (Side Cards) */}
        <div className="lg:col-span-4 space-y-6">
          <PolicyPremiumCard policy={policy} />
          <PolicyCustomerCard policy={policy} />
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailsPage;
