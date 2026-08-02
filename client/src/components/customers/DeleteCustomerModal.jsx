import { AlertTriangle, Trash2, X } from "lucide-react";
import { formatCustomerId } from "../../utils/customerHelpers";

const DeleteCustomerModal = ({ isOpen, onClose, onConfirm, customer }) => {
  if (!isOpen || !customer) return null;

  const customerName =
    typeof customer.fullName === "string"
      ? customer.fullName
      : customer.name || customer.user?.fullName || "Carrier Customer";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-900/30 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Body */}
        <div className="space-y-2">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            Delete Customer Record?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Are you sure you want to permanently delete <strong className="text-slate-900 dark:text-white">{customerName}</strong> (<span className="font-mono text-[#2563EB] dark:text-cyan-400">{formatCustomerId(customer.id)}</span>)?
          </p>
          <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/30 text-[11px] text-rose-700 dark:text-rose-300 font-semibold space-y-1">
            <p>⚠️ Warning: This action cannot be undone.</p>
            <p className="font-normal">All associated policy records, claims, and KYC vault documents will be detached from active underwriting.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;
