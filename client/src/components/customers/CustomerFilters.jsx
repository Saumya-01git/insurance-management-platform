import { Filter, ArrowUpDown } from "lucide-react";

const CustomerFilters = ({
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-5">
      {/* Status Filter */}
      <div className="flex items-center gap-2.5">
        <Filter className="w-4 h-4 text-slate-400" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active Only</option>
          <option value="PENDING_KYC">Pending KYC</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="flex items-center gap-2.5">
        <ArrowUpDown className="w-4 h-4 text-slate-400" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-11 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
        >
          <option value="newest">Sort: Newest Onboarded</option>
          <option value="name">Sort: Name (A-Z)</option>
          <option value="premium">Sort: Total Premium ($)</option>
        </select>
      </div>
    </div>
  );
};

export default CustomerFilters;
