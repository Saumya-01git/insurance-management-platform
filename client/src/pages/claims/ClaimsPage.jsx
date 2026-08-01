import { useEffect, useState, useMemo, useCallback } from "react";
import { claimApi } from "../../api/claimApi";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import ClaimFormModal from "./ClaimFormModal";
import ClaimReviewModal from "./ClaimReviewModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { toast } from "react-hot-toast";
import { FileText, Plus, Eye, Trash2 } from "lucide-react";

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [deletingClaim, setDeletingClaim] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchClaims = useCallback(() => {
    claimApi
      .getAll()
      .then((data) => setClaims(Array.isArray(data) ? data : data.data || []))
      .catch((err) => toast.error(err.response?.data?.message || "Failed to load insurance claims"));
  }, []);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  const filteredClaims = useMemo(() => {
    if (activeTab === "PENDING") return claims.filter((c) => c.status === "PENDING");
    if (activeTab === "APPROVED") return claims.filter((c) => c.status === "APPROVED");
    if (activeTab === "REJECTED") return claims.filter((c) => c.status === "REJECTED");
    return claims;
  }, [claims, activeTab]);

  const handleFormSubmit = async (formData) => {
    try {
      await claimApi.create(formData);
      toast.success("Insurance claim submitted successfully for verification");
      setIsFormOpen(false);
      fetchClaims();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit claim");
    }
  };

  const handleApproveClaim = async (id) => {
    try {
      await claimApi.approve(id);
      toast.success("Claim approved! Payout authorization logged.");
      setIsReviewOpen(false);
      setSelectedClaim(null);
      fetchClaims();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve claim");
    }
  };

  const handleRejectClaim = async (id) => {
    try {
      await claimApi.reject(id);
      toast.success("Claim rejected.");
      setIsReviewOpen(false);
      setSelectedClaim(null);
      fetchClaims();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject claim");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingClaim) return;
    try {
      await claimApi.delete(deletingClaim.id);
      toast.success("Claim record deleted");
      setIsDeleteOpen(false);
      setDeletingClaim(null);
      fetchClaims();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete claim");
    }
  };

  const pendingCount = claims.filter((c) => c.status === "PENDING").length;
  const approvedCount = claims.filter((c) => c.status === "APPROVED").length;
  const totalPayout = claims
    .filter((c) => c.status === "APPROVED")
    .reduce((sum, c) => sum + parseFloat(c.claim_amount || 0), 0);

  const columns = [
    {
      header: "Claim ID & Policy",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-200/50 dark:border-amber-800/40">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Claim #{row.id}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
              Policy #{row.policy?.policy_number || row.policy_id}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Customer Applicant",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-200">
            {row.policy?.customer?.name || "N/A"}
          </p>
          <p className="text-xs text-slate-400">{row.policy?.customer?.email || ""}</p>
        </div>
      ),
    },
    {
      header: "Requested Amount",
      accessorKey: "claim_amount",
      cell: (row) => (
        <span className="font-extrabold text-slate-900 dark:text-white text-sm">
          ${parseFloat(row.claim_amount || 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: "Submission Date",
      accessorKey: "submission_date",
      cell: (row) => (
        <span className="text-slate-600 dark:text-slate-400 font-medium">
          {row.submission_date ? new Date(row.submission_date).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => <Badge status={row.status}>{row.status}</Badge>,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setSelectedClaim(row);
              setIsReviewOpen(true);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer"
            title="Review Claim"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setDeletingClaim(row);
              setIsDeleteOpen(true);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
            title="Delete Claim Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-[#2563EB]" /> Claims Verification Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Review customer claims, verify supporting evidence, and process payouts.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsFormOpen(true)}
        >
          Submit Insurance Claim
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Claims Filed</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{claims.length}</p>
          <p className="text-xs text-slate-500 font-semibold">Lifetime applications</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Review</span>
          <p className="text-3xl font-extrabold text-amber-500">{pendingCount}</p>
          <p className="text-xs text-amber-500 font-semibold">Action required</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approved Claims</span>
          <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{approvedCount}</p>
          <p className="text-xs text-emerald-500 font-semibold">Settled & Authorized</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Settled Payout</span>
          <p className="text-3xl font-extrabold text-[#2563EB] dark:text-blue-400">
            ${totalPayout.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 font-semibold">Disbursed to date</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3 overflow-x-auto">
        {[
          { id: "ALL", label: "All Claims" },
          { id: "PENDING", label: `Pending Verification (${pendingCount})` },
          { id: "APPROVED", label: "Approved Payouts" },
          { id: "REJECTED", label: "Rejected Applications" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredClaims}
        searchPlaceholder="Search claim ID, policy, customer name..."
        emptyTitle="No claim applications found"
        emptySubtitle="File a new claim to begin the verification and approval process."
      />

      <ClaimFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ClaimReviewModal
        isOpen={isReviewOpen}
        onClose={() => {
          setIsReviewOpen(false);
          setSelectedClaim(null);
        }}
        onApprove={handleApproveClaim}
        onReject={handleRejectClaim}
        claim={selectedClaim}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Claim Record"
        message={`Are you sure you want to delete claim #${deletingClaim?.id}? This action cannot be undone.`}
      />
    </div>
  );
};

export default ClaimsPage;
