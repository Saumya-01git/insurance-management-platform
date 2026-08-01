import { useState } from "react";
import { RefreshCw, X, Calendar } from "lucide-react";
import { formatPolicyNumber, formatDate } from "../../utils/policyHelpers";

const RenewPolicyModal = ({ isOpen, onClose, onConfirm, policy }) => {
  const [newEndDate, setNewEndDate] = useState("2027-08-01");

  if (!isOpen || !policy) return null;

  const handleRenew = (e) => {
    e.preventDefault();
    onConfirm(newEndDate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <form onSubmit={handleRenew} className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-900/30 shrink-0">
            <RefreshCw className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            Renew Policy Coverage Term
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Extend coverage term for <span className="font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">{formatPolicyNumber(policy.policyNumber || policy.id)}</span> ({policy.customer}).
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
            New End Validity Date
          </label>
          <input
            type="date"
            required
            value={newEndDate}
            onChange={(e) => setNewEndDate(e.target.value)}
            className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Confirm Renewal</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RenewPolicyModal;
