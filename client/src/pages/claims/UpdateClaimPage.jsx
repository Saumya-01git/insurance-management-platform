import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import { formatClaimId } from "../../utils/claimHelpers";

const UpdateClaimPage = ({ claim, onCancel, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    customer: "",
    policyNumber: "",
    claimType: "Property Loss",
    claimAmount: "",
    date: "",
    status: "PENDING",
    assignedAgent: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (claim) {
      setFormData({
        customer: claim.customer || "",
        policyNumber: claim.policyNumber || "",
        claimType: claim.claimType || "Property Loss",
        claimAmount: claim.claimAmount || "",
        date: claim.date || "",
        status: claim.status || "PENDING",
        assignedAgent: claim.assignedAgent || "",
        description: claim.description || "",
      });
    }
  }, [claim]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (onSubmitSuccess) {
        await onSubmitSuccess(claim.id, formData);
      } else {
        toast.success("Claim record updated!");
        if (onCancel) onCancel();
      }
    } catch (err) {
      toast.error("Failed to update claim.");
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
              Claims
            </span>
            <span>/</span>
            <span className="font-bold text-slate-900 dark:text-white">Update Claim</span>
          </nav>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
            Update Claim Assessment: {formatClaimId(claim?.claimId || claim?.id)}
          </h1>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Claimant Customer Name
            </label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Policy Number
            </label>
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Claim Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            >
              <option value="PENDING">PENDING</option>
              <option value="UNDER_REVIEW">UNDER_REVIEW</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Claim Amount ($)
            </label>
            <input
              type="number"
              name="claimAmount"
              value={formData.claimAmount}
              onChange={handleChange}
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Assigned Adjuster
            </label>
            <input
              type="text"
              name="assignedAgent"
              value={formData.assignedAgent}
              onChange={handleChange}
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
            Description / Assessment Note
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
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
            <Save className="w-4 h-4" />
            <span>{submitting ? "Updating..." : "Update Claim Assessment"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClaimPage;
