import { useState } from "react";
import PaymentStats from "../../components/payments/PaymentStats";
import PaymentFilters from "../../components/payments/PaymentFilters";
import PaymentTable from "../../components/payments/PaymentTable";
import PaymentCard from "../../components/payments/PaymentCard";

import { Plus, Download, Search, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { downloadPaymentsCSV } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const PaymentListPage = ({
  payments,
  rawPayments,
  totalCount,
  stats,
  loading,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
  sortBy,
  setSortBy,
  currentPage,
  setCurrentPage,
  totalPages,
  onNavigateAdd,
  onNavigateView,
}) => {
  const [viewMode, setViewMode] = useState("table");

  const handleExportData = () => {
    downloadPaymentsCSV(rawPayments || payments);
    toast.success("Payment settlement ledger exported (CSV)!", { icon: "📊" });
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      {/* Top Header Section */}
      <div className="space-y-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="hover:text-[#2563EB] cursor-pointer">Dashboard</span>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white">Payments</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Payment & Billing Operations
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Premium payment settlements, ACH wires, and automated invoice receipts
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleExportData}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Ledger</span>
            </button>

            <button
              onClick={onNavigateAdd}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Record Premium Payment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <PaymentStats stats={stats} />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by payment ID, customer, transaction #..."
            className="w-full h-11 pl-10 pr-4 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <PaymentFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            methodFilter={methodFilter}
            setMethodFilter={setMethodFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shrink-0">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-700 text-[#2563EB] dark:text-cyan-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "card"
                  ? "bg-white dark:bg-slate-700 text-[#2563EB] dark:text-cyan-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main View */}
      {loading ? (
        <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
        </div>
      ) : viewMode === "table" ? (
        <PaymentTable payments={payments} onView={onNavigateView} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {payments.map((pay) => (
            <PaymentCard key={pay.id} payment={pay} onView={onNavigateView} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of{" "}
            <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span> ({totalCount} total payments)
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#2563EB] dark:text-cyan-400">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentListPage;
