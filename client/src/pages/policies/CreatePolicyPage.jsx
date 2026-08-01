import { useState } from "react";
import { ArrowLeft, Shield, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

const CreatePolicyPage = ({ onCancel, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    customer: "",
    customerEmail: "",
    policyType: "Commercial Property",
    coverageAmount: "",
    premium: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "2027-08-01",
    status: "ACTIVE",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.coverageAmount || !formData.premium) {
      toast.error("Please fill in required fields: Customer, Coverage, and Premium.");
      return;
    }

    try {
      setSubmitting(true);
      if (onSubmitSuccess) {
        await onSubmitSuccess(formData);
      } else {
        toast.success("New policy underwritten!");
        if (onCancel) onCancel();
      }
    } catch (err) {
      toast.error("Failed to issue policy.");
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
              Policies
            </span>
            <span>/</span>
            <span className="font-bold text-slate-900 dark:text-white">Issue Policy</span>
          </nav>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
            Issue New Underwritten Policy
          </h1>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Shield className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              1. Customer & Coverage Selection
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Insured Customer Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="customer"
                required
                value={formData.customer}
                onChange={handleChange}
                placeholder="e.g. David Vance or Global Logistics Inc."
                className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Customer Email Address
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="david.vance@company.com"
                className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Policy Coverage Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="policyType"
                value={formData.policyType}
                onChange={handleChange}
                className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
              >
                <option value="Commercial Property">Commercial Property</option>
                <option value="Comprehensive Health">Comprehensive Health</option>
                <option value="Fleet Transport Liability">Fleet Transport Liability</option>
                <option value="Term Life Coverage">Term Life Coverage</option>
                <option value="Cyber Defense Insurance">Cyber Defense Insurance</option>
                <option value="Homeowners Specialty">Homeowners Specialty</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Initial Policy Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="PENDING_UNDERWRITING">PENDING_UNDERWRITING</option>
                <option value="EXPIRING_SOON">EXPIRING_SOON</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial & Term Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              2. Financial Limits & Term Dates
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Coverage Amount ($) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="coverageAmount"
                required
                value={formData.coverageAmount}
                onChange={handleChange}
                placeholder="1500000"
                className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Annual Premium ($) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="premium"
                required
                value={formData.premium}
                onChange={handleChange}
                placeholder="32000"
                className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                End Expiration Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
            Underwriting Terms & Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Specify risk terms, coverage endorsements, or inspector notes..."
            className="w-full p-3.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
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
            <Plus className="w-4 h-4" />
            <span>{submitting ? "Submitting..." : "Issue & Activate Policy"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePolicyPage;
