import { useState } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { toast } from "react-hot-toast";

const RecordPaymentPage = ({ onCancel, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    customer: "",
    customerId: "CUST-1049",
    policyNumber: "",
    amount: "",
    paymentMethod: "ACH Wire Transfer",
    date: new Date().toISOString().split("T")[0],
    status: "COMPLETED",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.policyNumber || !formData.amount) {
      toast.error("Please fill in required fields: Customer, Policy #, and Amount.");
      return;
    }

    try {
      setSubmitting(true);
      if (onSubmitSuccess) {
        await onSubmitSuccess(formData);
      } else {
        toast.success("Payment recorded!");
        if (onCancel) onCancel();
      }
    } catch (err) {
      toast.error("Failed to record payment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="hover:text-[#2563EB] cursor-pointer" onClick={onCancel}>
              Payments
            </span>
            <span>/</span>
            <span className="font-bold text-slate-900 dark:text-white">Record Payment</span>
          </nav>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
            Record Premium Settlement Payment
          </h1>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Remitting Customer Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="customer"
              required
              value={formData.customer}
              onChange={handleChange}
              placeholder="e.g. David Vance"
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Policy Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="policyNumber"
              required
              value={formData.policyNumber}
              onChange={handleChange}
              placeholder="POL-9012"
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Payment Amount ($) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              required
              value={formData.amount}
              onChange={handleChange}
              placeholder="32000"
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Payment Settlement Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            >
              <option value="ACH Wire Transfer">ACH Wire Transfer</option>
              <option value="Bank Wire Transfer">Bank Wire Transfer</option>
              <option value="Credit Card (Visa)">Credit Card (Visa)</option>
              <option value="Credit Card (MasterCard)">Credit Card (MasterCard)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Settlement Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Payment Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            >
              <option value="COMPLETED">COMPLETED</option>
              <option value="PENDING">PENDING</option>
              <option value="OVERDUE">OVERDUE</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>{submitting ? "Recording..." : "Record & Deposit Payment"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordPaymentPage;
