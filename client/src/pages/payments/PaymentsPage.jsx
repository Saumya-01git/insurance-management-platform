import { useEffect, useState, useMemo, useCallback } from "react";
import { paymentApi } from "../../api/paymentApi";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import PaymentFormModal from "./PaymentFormModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { toast } from "react-hot-toast";
import { CreditCard, Plus, Trash2 } from "lucide-react";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingPayment, setDeletingPayment] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchPayments = useCallback(() => {
    paymentApi
      .getAll()
      .then((data) => setPayments(Array.isArray(data) ? data : data.data || []))
      .catch((err) => toast.error(err.response?.data?.message || "Failed to load payment transactions"));
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const filteredPayments = useMemo(() => {
    if (activeTab === "PAID") return payments.filter((p) => p.payment_status === "PAID");
    if (activeTab === "PENDING") return payments.filter((p) => p.payment_status === "PENDING");
    if (activeTab === "OVERDUE") return payments.filter((p) => p.payment_status === "OVERDUE");
    return payments;
  }, [payments, activeTab]);

  const handleFormSubmit = async (formData) => {
    try {
      await paymentApi.create(formData);
      toast.success("Payment transaction recorded successfully");
      setIsFormOpen(false);
      fetchPayments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to record payment");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPayment) return;
    try {
      await paymentApi.delete(deletingPayment.id);
      toast.success("Payment record deleted");
      setIsDeleteOpen(false);
      setDeletingPayment(null);
      fetchPayments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete payment record");
    }
  };

  const totalPaidRevenue = payments
    .filter((p) => p.payment_status === "PAID")
    .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  const pendingAmount = payments
    .filter((p) => p.payment_status === "PENDING")
    .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  const overdueAmount = payments
    .filter((p) => p.payment_status === "OVERDUE")
    .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  const columns = [
    {
      header: "Tx ID & Policy",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-200/50 dark:border-teal-800/40">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">TX-#{row.id}</p>
            <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-0.5">
              Policy #{row.policy?.policy_number || row.policy_id}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Customer Account",
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
      header: "Amount Paid",
      accessorKey: "amount",
      cell: (row) => (
        <span className="font-extrabold text-slate-900 dark:text-white text-sm">
          ${parseFloat(row.amount || 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: "Payment Date",
      accessorKey: "payment_date",
      cell: (row) => (
        <span className="text-slate-600 dark:text-slate-400 font-medium">
          {row.payment_date ? new Date(row.payment_date).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => <Badge status={row.payment_status}>{row.payment_status}</Badge>,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setDeletingPayment(row);
              setIsDeleteOpen(true);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
            title="Delete Payment Record"
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
            <CreditCard className="w-7 h-7 text-[#2563EB]" /> Premium Payments Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Monitor customer premium installments, record transactions, and track overdue accounts.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsFormOpen(true)}
        >
          Record Premium Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Collected Revenue</span>
          <p className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">
            ${totalPaidRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-teal-500 font-semibold">Settled transactions</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Collectables</span>
          <p className="text-3xl font-extrabold text-[#2563EB] dark:text-blue-400">
            ${pendingAmount.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 font-semibold">Awaiting processing</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overdue Balance</span>
          <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            ${overdueAmount.toLocaleString()}
          </p>
          <p className="text-xs text-rose-500 font-semibold">Alerts active</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction Count</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{payments.length}</p>
          <p className="text-xs text-slate-500 font-semibold">Recorded installments</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3 overflow-x-auto">
        {[
          { id: "ALL", label: "All Transactions" },
          { id: "PAID", label: "Paid & Settled" },
          { id: "PENDING", label: "Pending" },
          { id: "OVERDUE", label: "Overdue" },
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
        data={filteredPayments}
        searchPlaceholder="Search by transaction ID, policy, customer..."
        emptyTitle="No payment records found"
        emptySubtitle="Record a new premium payment to track financial collections."
      />

      <PaymentFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Payment Record"
        message={`Are you sure you want to remove payment TX-#${deletingPayment?.id}? This will remove it from collection records.`}
      />
    </div>
  );
};

export default PaymentsPage;
