import { Filter, ArrowUpDown } from "lucide-react";

const PolicyFilters = ({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active Only</option>
          <option value="EXPIRING_SOON">Expiring Soon</option>
          <option value="PENDING_UNDERWRITING">Pending Underwriting</option>
          <option value="EXPIRED">Expired / Cancelled</option>
        </select>
      </div>

      {/* Type Filter */}
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="h-10 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
      >
        <option value="ALL">All Coverage Types</option>
        <option value="Commercial Property">Commercial Property</option>
        <option value="Comprehensive Health">Comprehensive Health</option>
        <option value="Fleet Transport Liability">Fleet Transport</option>
        <option value="Term Life Coverage">Term Life</option>
        <option value="Cyber Defense Insurance">Cyber Defense</option>
      </select>

      {/* Sort By */}
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-10 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
        >
          <option value="newest">Sort: Start Date (Newest)</option>
          <option value="premium">Sort: Premium ($ High to Low)</option>
          <option value="coverage">Sort: Coverage Amount</option>
        </select>
      </div>
    </div>
  );
};

export default PolicyFilters;
