import { useState } from "react";
import { Link } from "react-router-dom";
import ClaimStats from "../../components/claims/ClaimStats";
import ClaimTable from "../../components/claims/ClaimTable";
import DeleteClaimModal from "../../components/claims/DeleteClaimModal";
import SearchBar from "../../components/ui/SearchBar";

import { Plus, Download, Filter, ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="animate-in fade-in duration-300 pb-10">
      {/* Top Header Section */}
      <div style={{ marginBottom: "28px" }} className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-3">
          <Link to="/dashboard" className="hover:text-[#2563EB] cursor-pointer transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white">Claims</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Claims Processing Center
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mt-1">
              Review loss filings, verify property documentation, and audit settlement payouts
            </p>
          </div>

          <div className="flex items-center gap-3.5 self-start sm:self-auto pr-1 sm:pr-2">
            <button
              onClick={handleExportData}
              className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Registry</span>
            </button>

            <button
              onClick={onNavigateAdd}
              className="px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Register Claim</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }}>
        <ClaimStats stats={stats} />
      </div>

      {/* Search & Filter Toolbar - Guaranteed 28px Bottom Margin */}
      <div
        style={{ marginBottom: "28px" }}
        className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        {/* Search */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by claim ID, customer, policy #..."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          <div className="flex items-center gap-2.5">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
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
            className="h-11 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] cursor-pointer"
          >
            <option value="newest">Sort: Filing Date (Newest)</option>
            <option value="amount">Sort: Claim Amount ($ High to Low)</option>
          </select>
        </div>
      </div>

      {/* Claims Table - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }}>
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of{" "}
            <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span> ({totalCount} total claims)
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
