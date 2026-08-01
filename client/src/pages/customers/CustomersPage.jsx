import { useEffect, useState, useCallback } from "react";
import { customerApi } from "../../api/customerApi";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import CustomerFormModal from "./CustomerFormModal";
import CustomerDetailModal from "./CustomerDetailModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { toast } from "react-hot-toast";
import { Users, UserPlus, Eye, Edit2, Trash2, ShieldCheck, Mail, Phone } from "lucide-react";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchCustomers = useCallback(() => {
    customerApi
      .getAll()
      .then((data) => setCustomers(Array.isArray(data) ? data : data.data || []))
      .catch((err) => toast.error(err.response?.data?.message || "Failed to load customers directory"));
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCustomer) {
        await customerApi.update(editingCustomer.id, formData);
        toast.success("Customer record updated successfully");
      } else {
        await customerApi.create(formData);
        toast.success("New customer registered successfully");
      }
      setIsFormOpen(false);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save customer record");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCustomer) return;
    try {
      await customerApi.delete(deletingCustomer.id);
      toast.success("Customer profile deleted");
      setIsDeleteOpen(false);
      setDeletingCustomer(null);
      fetchCustomers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete customer");
    }
  };

  const columns = [
    {
      header: "Customer Info",
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
            {row.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3 text-slate-400" /> {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Phone Number",
      accessorKey: "phone",
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          <span>{row.phone || "N/A"}</span>
        </div>
      ),
    },
    {
      header: "Date of Birth",
      accessorKey: "dob",
      cell: (row) => (
        <span className="text-slate-600 dark:text-slate-400 font-medium">
          {row.dob ? new Date(row.dob).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      header: "Address",
      accessorKey: "address",
      cell: (row) => (
        <span className="text-slate-600 dark:text-slate-400 truncate max-w-[200px] block" title={row.address}>
          {row.address || "N/A"}
        </span>
      ),
    },
    {
      header: "Policies Attached",
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {row.policies ? row.policies.length : 0} Policies
          </span>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setSelectedCustomer(row);
              setIsDetailOpen(true);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setEditingCustomer(row);
              setIsFormOpen(true);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors cursor-pointer"
            title="Edit Customer"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setDeletingCustomer(row);
              setIsDeleteOpen(true);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
            title="Delete Customer"
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
            <Users className="w-7 h-7 text-[#2563EB]" /> Customer Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Manage customer master files, contact details, and policy links.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={UserPlus}
          onClick={() => {
            setEditingCustomer(null);
            setIsFormOpen(true);
          }}
        >
          Register Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Customers</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{customers.length}</p>
          <p className="text-xs text-emerald-500 font-semibold">Active accounts recorded</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">With Active Policies</span>
          <p className="text-3xl font-extrabold text-[#2563EB] dark:text-blue-400">
            {customers.filter((c) => c.policies && c.policies.length > 0).length}
          </p>
          <p className="text-xs text-slate-500 font-semibold">Insured accounts</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Directory Status</span>
          <div className="pt-1">
            <Badge status="ACTIVE">REST API Connected</Badge>
          </div>
          <p className="text-xs text-slate-500 font-semibold pt-1">Real-time sync enabled</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={customers}
        searchPlaceholder="Search by customer name, email, phone..."
        emptyTitle="No customers registered yet"
        emptySubtitle="Click 'Register Customer' above to add your first customer file."
      />

      <CustomerFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingCustomer}
      />

      <CustomerDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        customer={selectedCustomer}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Customer Profile"
        message={`Are you sure you want to delete ${deletingCustomer?.name}? All associated customer data will be removed.`}
      />
    </div>
  );
};

export default CustomersPage;
