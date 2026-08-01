import { useState } from "react";
import PolicyStats from "../../components/policies/PolicyStats";
import PolicySearch from "../../components/policies/PolicySearch";
import PolicyFilters from "../../components/policies/PolicyFilters";
import PolicyTable from "../../components/policies/PolicyTable";
import PolicyCard from "../../components/policies/PolicyCard";
import DeletePolicyModal from "../../components/policies/DeletePolicyModal";
import RenewPolicyModal from "../../components/policies/RenewPolicyModal";

import { Plus, Download, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { downloadPoliciesCSV } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const PolicyListPage = ({
  policies,
  rawPolicies,
  totalCount,
  stats,
  loading,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  sortBy,
  setSortBy,
  currentPage,
  setCurrentPage,
  totalPages,
  onNavigateAdd,
  onNavigateView,
  onNavigateEdit,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  policyToDelete,
  handleDeletePrompt,
  confirmDeletePolicy,
  isRenewModalOpen,
  setIsRenewModalOpen,
  policyToRenew,
  handleRenewPrompt,
  confirmRenewPolicy,
}) => {
  const [viewMode, setViewMode] = useState("table");

  const handleExportData = () => {
    downloadPoliciesCSV(rawPolicies || policies);
    toast.success("Carrier policy portfolio exported (CSV)!", { icon: "📊" });
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      {/* Top Header Section */}
      <div className="space-y-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="hover:text-[#2563EB] cursor-pointer">Dashboard</span>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white">Policies</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Policy Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Underwritten carrier agreements, renewal tracking, and portfolio lifecycle management
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleExportData}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Portfolio</span>
            </button>

            <button
              onClick={onNavigateAdd}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Policy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <PolicyStats stats={stats} />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PolicySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <PolicyFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
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

      {/* Policies View */}
      {loading ? (
        <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
        </div>
      ) : viewMode === "table" ? (
        <PolicyTable
          policies={policies}
          onView={onNavigateView}
          onEdit={onNavigateEdit}
          onRenew={handleRenewPrompt}
          onDelete={handleDeletePrompt}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {policies.map((pol) => (
            <PolicyCard
              key={pol.id}
              policy={pol}
              onView={onNavigateView}
              onEdit={onNavigateEdit}
              onRenew={handleRenewPrompt}
              onDelete={handleDeletePrompt}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of{" "}
            <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span> ({totalCount} total policies)
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

      {/* Modals */}
      <DeletePolicyModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeletePolicy}
        policy={policyToDelete}
      />

      <RenewPolicyModal
        isOpen={isRenewModalOpen}
        onClose={() => setIsRenewModalOpen(false)}
        onConfirm={confirmRenewPolicy}
        policy={policyToRenew}
      />
    </div>
  );
};

export default PolicyListPage;
