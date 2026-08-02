import { useState } from "react";
import { Link } from "react-router-dom";
import PaymentStats from "../../components/payments/PaymentStats";
import PaymentFilters from "../../components/payments/PaymentFilters";
import PaymentTable from "../../components/payments/PaymentTable";
import PaymentCard from "../../components/payments/PaymentCard";
import SearchBar from "../../components/ui/SearchBar";

import { Plus, Download, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="animate-in fade-in duration-300 pb-10">
      {/* Top Header Section */}
      <div style={{ marginBottom: "28px" }} className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-3">
          <Link to="/dashboard" className="hover:text-[#2563EB] cursor-pointer transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white">Payments</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Payment & Billing Operations
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mt-1">
              Premium payment settlements, ACH wires, and automated invoice receipts
            </p>
          </div>

          <div className="flex items-center gap-3.5 self-start sm:self-auto pr-1 sm:pr-2">
            <button
              onClick={handleExportData}
              className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Ledger</span>
            </button>

            <button
              onClick={onNavigateAdd}
              className="px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Record Premium Payment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }}>
        <PaymentStats stats={stats} />
      </div>

      {/* Toolbar - Guaranteed 28px Bottom Margin */}
      <div
        style={{ marginBottom: "28px" }}
        className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        {/* Search */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by payment ID, customer, transaction #..."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 w-full md:w-auto">
          <PaymentFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            methodFilter={methodFilter}
            setMethodFilter={setMethodFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shrink-0 ml-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-700 text-[#2563EB] dark:text-cyan-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title="Table View"
            >
              <List className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "card"
                  ? "bg-white dark:bg-slate-700 text-[#2563EB] dark:text-cyan-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main View - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }}>
        {loading ? (
          <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
          </div>
        ) : viewMode === "table" ? (
          <PaymentTable payments={payments} onView={onNavigateView} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {payments.map((pay) => (
              <PaymentCard key={pay.id} payment={pay} onView={onNavigateView} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of{" "}
            <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span> ({totalCount} total payments)
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#2563EB] dark:text-cyan-400">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
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
