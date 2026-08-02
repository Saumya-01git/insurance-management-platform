import { Filter } from "lucide-react";

const DocumentFilters = ({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
        >
          <option value="ALL">All Categories</option>
          <option value="Identity / KYC">Identity / KYC</option>
          <option value="Underwriting Loss Proof">Underwriting Loss Proof</option>
          <option value="Claim Evidence">Claim Evidence</option>
          <option value="Policy Certificate">Policy Certificate</option>
        </select>
      </div>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-10 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
      >
        <option value="ALL">All Statuses</option>
        <option value="VERIFIED">Verified Only</option>
        <option value="PENDING_VERIFICATION">Pending Verification</option>
      </select>
    </div>
  );
};

export default DocumentFilters;
