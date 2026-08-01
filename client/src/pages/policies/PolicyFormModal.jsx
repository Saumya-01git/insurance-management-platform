import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { customerApi } from "../../api/customerApi";
import { ShieldCheck, DollarSign, Calendar, User, FileText } from "lucide-react";
import { toast } from "react-hot-toast";

const POLICY_TYPES = [
  { value: "HEALTH", label: "Health Insurance" },
  { value: "AUTO", label: "Auto / Vehicle Insurance" },
  { value: "LIFE", label: "Life Insurance" },
  { value: "PROPERTY", label: "Property & Home Insurance" },
];

const POLICY_STATUSES = [
  { value: "ACTIVE", label: "Active Policy" },
  { value: "EXPIRED", label: "Expired" },
  { value: "CANCELLED", label: "Cancelled" },
];

const PolicyFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) => {
  const [customers, setCustomers] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      customerApi
        .getAll()
        .then((data) => setCustomers(Array.isArray(data) ? data : data.data || []))
        .catch(() => toast.error("Could not fetch customer list for policy assignment"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      reset({
        customer_id: initialData.customer_id || initialData.customer?.id || "",
        policy_type: initialData.policy_type || "HEALTH",
        policy_number: initialData.policy_number || "",
        premium_amount: initialData.premium_amount || "",
        coverage_amount: initialData.coverage_amount || "",
        start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().split("T")[0] : "",
        end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().split("T")[0] : "",
        status: initialData.status || "ACTIVE",
      });
    } else {
      const generatedNo = "POL-" + Math.floor(100000 + Math.random() * 900000);
      const today = new Date().toISOString().split("T")[0];
      const nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0];

      reset({
        customer_id: "",
        policy_type: "HEALTH",
        policy_number: generatedNo,
        premium_amount: "1200",
        coverage_amount: "50000",
        start_date: today,
        end_date: nextYear,
        status: "ACTIVE",
      });
    }
  }, [initialData, reset, isOpen]);

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      customer_id: parseInt(data.customer_id, 10),
      premium_amount: parseFloat(data.premium_amount),
      coverage_amount: parseFloat(data.coverage_amount || 0),
    };
    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Insurance Policy" : "Issue New Insurance Policy"}
      subtitle={initialData ? "Update existing policy parameters" : "Assign coverage parameters to a registered customer"}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Customer Owner *"
            icon={User}
            placeholder="Select Customer..."
            error={errors.customer_id?.message}
            options={customers.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.email})`,
            }))}
            {...register("customer_id", { required: "Customer selection is required" })}
          />

          <Select
            label="Policy Type *"
            icon={ShieldCheck}
            error={errors.policy_type?.message}
            options={POLICY_TYPES}
            {...register("policy_type", { required: "Policy type is required" })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Policy Reference Number *"
            icon={FileText}
            error={errors.policy_number?.message}
            {...register("policy_number", { required: "Policy number is required" })}
          />

          <Input
            label="Annual Premium ($) *"
            type="number"
            step="0.01"
            icon={DollarSign}
            placeholder="1200.00"
            error={errors.premium_amount?.message}
            {...register("premium_amount", { required: "Premium amount is required" })}
          />

          <Input
            label="Coverage Cap ($)"
            type="number"
            step="0.01"
            icon={DollarSign}
            placeholder="50000.00"
            {...register("coverage_amount")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Start Effective Date *"
            type="date"
            icon={Calendar}
            error={errors.start_date?.message}
            {...register("start_date", { required: "Start date is required" })}
          />

          <Input
            label="Expiration Date *"
            type="date"
            icon={Calendar}
            error={errors.end_date?.message}
            {...register("end_date", { required: "End date is required" })}
          />
        </div>

        {initialData && (
          <Select
            label="Policy Status"
            options={POLICY_STATUSES}
            {...register("status")}
          />
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
          <Button variant="secondary" size="md" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" isLoading={isLoading}>
            {initialData ? "Update Policy" : "Issue Policy"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PolicyFormModal;
