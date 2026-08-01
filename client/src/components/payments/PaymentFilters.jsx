import { Filter, ArrowUpDown } from "lucide-react";

const PaymentFilters = ({
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
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
          <option value="COMPLETED">Settled Only</option>
          <option value="PENDING">Processing</option>
          <option value="OVERDUE">Overdue / Failed</option>
        </select>
      </div>

      {/* Method Filter */}
      <select
        value={methodFilter}
        onChange={(e) => setMethodFilter(e.target.value)}
        className="h-10 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
      >
        <option value="ALL">All Payment Methods</option>
        <option value="ACH">ACH Wire Transfer</option>
        <option value="Bank Wire">Bank Wire</option>
        <option value="Credit Card">Credit Card</option>
      </select>

      {/* Sort By */}
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-10 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
        >
          <option value="newest">Sort: Date (Newest)</option>
          <option value="amount">Sort: Amount ($ High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default PaymentFilters;
