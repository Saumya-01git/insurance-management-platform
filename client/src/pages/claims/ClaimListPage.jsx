import { useState } from "react";
import ClaimStats from "../../components/claims/ClaimStats";
import ClaimTable from "../../components/claims/ClaimTable";
import DeleteClaimModal from "../../components/claims/DeleteClaimModal";

import { Plus, Download, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { downloadClaimsCSV } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const ClaimListPage = ({
  claims,
  rawClaims,
  totalCount,
  stats,
  loading,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  currentPage,
  setCurrentPage,
  totalPages,
  onNavigateAdd,
  onNavigateView,
  onNavigateEdit,
  handleApproveClaim,
  handleRejectClaim,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  claimToDelete,
  handleDeletePrompt,
  confirmDeleteClaim,
}) => {
  const handleExportData = () => {
    downloadClaimsCSV(rawClaims || claims);
    toast.success("Claims registry exported (CSV)!", { icon: "📊" });
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      {/* Top Header Section */}
      <div className="space-y-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="hover:text-[#2563EB] cursor-pointer">Dashboard</span>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white">Claims</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Claims Processing Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Review loss filings, verify property documentation, and audit settlement payouts
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleExportData}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Registry</span>
            </button>

            <button
              onClick={onNavigateAdd}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Register Claim</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <ClaimStats stats={stats} />

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by claim ID, customer, policy #..."
            className="w-full h-11 pl-10 pr-4 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Review</option>
              <option value="APPROVED">Approved Only</option>
              <option value="REJECTED">Rejected Only</option>
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
          >
            <option value="newest">Sort: Filing Date (Newest)</option>
            <option value="amount">Sort: Claim Amount ($ High to Low)</option>
          </select>
        </div>
      </div>

      {/* Claims Table */}
      {loading ? (
        <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
        </div>
      ) : (
        <ClaimTable
          claims={claims}
          onView={onNavigateView}
          onEdit={onNavigateEdit}
          onApprove={handleApproveClaim}
          onReject={handleRejectClaim}
          onDelete={handleDeletePrompt}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of{" "}
            <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span> ({totalCount} total claims)
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

      {/* Delete Modal */}
      <DeleteClaimModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteClaim}
        claim={claimToDelete}
      />
    </div>
  );
};

export default ClaimListPage;
