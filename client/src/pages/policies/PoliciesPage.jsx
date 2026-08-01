import { useEffect, useState, useMemo, useCallback } from "react";
import { policyApi } from "../../api/policyApi";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import PolicyFormModal from "./PolicyFormModal";
import PolicyRenewModal from "./PolicyRenewModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { toast } from "react-hot-toast";
import { ShieldCheck, Plus, RefreshCw, XCircle, Trash2, Edit2 } from "lucide-react";

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [renewingPolicy, setRenewingPolicy] = useState(null);
  const [isRenewOpen, setIsRenewOpen] = useState(false);
  const [deletingPolicy, setDeletingPolicy] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchPolicies = useCallback(() => {
    policyApi
      .getAll()
      .then((data) => setPolicies(Array.isArray(data) ? data : data.data || []))
      .catch((err) => toast.error(err.response?.data?.message || "Failed to load policy catalog"));
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const filteredPolicies = useMemo(() => {
    if (activeTab === "ACTIVE") return policies.filter((p) => p.status === "ACTIVE");
    if (activeTab === "EXPIRING") {
      const now = new Date();
      const nextMonth = new Date();
      nextMonth.setDate(now.getDate() + 30);
      return policies.filter((p) => {
        if (p.status !== "ACTIVE" || !p.end_date) return false;
        const end = new Date(p.end_date);
        return end >= now && end <= nextMonth;
      });
    }
    if (activeTab === "CANCELLED") return policies.filter((p) => p.status === "CANCELLED" || p.status === "EXPIRED");
    return policies;
  }, [policies, activeTab]);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingPolicy) {
        await policyApi.update(editingPolicy.id, formData);
        toast.success("Policy updated successfully");
      } else {
        await policyApi.create(formData);
        toast.success("New policy issued successfully");
      }
      setIsFormOpen(false);
      setEditingPolicy(null);
      fetchPolicies();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save policy");
    }
  };

  const handleRenewSubmit = async (policyId, renewData) => {
    try {
      await policyApi.renew(policyId, renewData);
      toast.success("Policy coverage renewed successfully");
      setIsRenewOpen(false);
      setRenewingPolicy(null);
      fetchPolicies();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to renew policy");
    }
  };

  const handleCancelPolicy = async (policyId) => {
    try {
      await policyApi.cancel(policyId);
      toast.success("Policy status updated to Cancelled");
      fetchPolicies();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel policy");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPolicy) return;
    try {
      await policyApi.delete(deletingPolicy.id);
      toast.success("Policy deleted from system");
      setIsDeleteOpen(false);
      setDeletingPolicy(null);
      fetchPolicies();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete policy");
    }
  };

  const columns = [
    {
      header: "Policy Ref & Type",
      accessorKey: "policy_number",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/50 dark:border-emerald-800/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">#{row.policy_number}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              {row.policy_type} INSURANCE
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Customer Owner",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-200">
            {row.customer?.name || `Customer #${row.customer_id}`}
          </p>
          <p className="text-xs text-slate-400">{row.customer?.email || ""}</p>
        </div>
      ),
    },
    {
      header: "Annual Premium",
      accessorKey: "premium_amount",
      cell: (row) => (
        <div>
          <span className="font-extrabold text-slate-900 dark:text-white text-sm">
            ${parseFloat(row.premium_amount || 0).toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block">/ year</span>
        </div>
      ),
    },
    {
      header: "Validity Period",
      cell: (row) => (
        <div className="text-xs text-slate-600 dark:text-slate-300 font-medium space-y-0.5">
          <p>Start: {row.start_date ? new Date(row.start_date).toLocaleDateString() : "N/A"}</p>
          <p className="text-slate-400">End: {row.end_date ? new Date(row.end_date).toLocaleDateString() : "N/A"}</p>
        </div>
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
              setRenewingPolicy(row);
              setIsRenewOpen(true);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer"
            title="Renew Policy"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setEditingPolicy(row);
              setIsFormOpen(true);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors cursor-pointer"
            title="Edit Policy"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {row.status === "ACTIVE" && (
            <button
              onClick={() => handleCancelPolicy(row.id)}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              title="Cancel Coverage"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              setDeletingPolicy(row);
              setIsDeleteOpen(true);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
            title="Delete Policy"
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
            <ShieldCheck className="w-7 h-7 text-[#2563EB]" /> Policy Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Active carrier policies, expiry tracking, renewals, and cancellations.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => {
            setEditingPolicy(null);
            setIsFormOpen(true);
          }}
        >
          Issue New Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Policies</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{policies.length}</p>
          <p className="text-xs text-slate-500 font-semibold">Issued in platform</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Policies</span>
          <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {policies.filter((p) => p.status === "ACTIVE").length}
          </p>
          <p className="text-xs text-emerald-500 font-semibold">Currently covered</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Premium Portfolio</span>
          <p className="text-3xl font-extrabold text-[#2563EB] dark:text-blue-400">
            ${policies.reduce((sum, p) => sum + parseFloat(p.premium_amount || 0), 0).toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 font-semibold">Annual recurring value</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expiring / Action Needed</span>
          <p className="text-3xl font-extrabold text-amber-500">
            {policies.filter((p) => p.status === "EXPIRED" || p.status === "CANCELLED").length}
          </p>
          <p className="text-xs text-amber-500 font-semibold">Renewal attention</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3 overflow-x-auto">
        {[
          { id: "ALL", label: "All Policies" },
          { id: "ACTIVE", label: "Active Coverage" },
          { id: "EXPIRING", label: "Expiring Soon" },
          { id: "CANCELLED", label: "Cancelled / Expired" },
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
        data={filteredPolicies}
        searchPlaceholder="Search policy number, customer, policy type..."
        emptyTitle="No policy records found"
        emptySubtitle="Issue a new policy to start tracking customer insurance lifecycles."
      />

      <PolicyFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPolicy(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingPolicy}
      />

      <PolicyRenewModal
        isOpen={isRenewOpen}
        onClose={() => {
          setIsRenewOpen(false);
          setRenewingPolicy(null);
        }}
        onRenew={handleRenewSubmit}
        policy={renewingPolicy}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Insurance Policy"
        message={`Are you sure you want to delete policy #${deletingPolicy?.policy_number}? This step will permanently remove the record.`}
      />
    </div>
  );
};

export default PoliciesPage;
