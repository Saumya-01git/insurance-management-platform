import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { policyApi } from "../../api/policyApi";
import { CreditCard, DollarSign, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

const PAYMENT_STATUSES = [
  { value: "PAID", label: "Paid & Settled" },
  { value: "PENDING", label: "Pending Payment" },
  { value: "OVERDUE", label: "Overdue Balance" },
];

const PAYMENT_METHODS = [
  { value: "CREDIT_CARD", label: "Credit / Debit Card" },
  { value: "BANK_TRANSFER", label: "Direct Bank Transfer" },
  { value: "UPI", label: "UPI / Digital Wallet" },
  { value: "CASH", label: "Cash Payment" },
];

const PaymentFormModal = ({ isOpen, onClose, onSubmit, isLoading = false }) => {
  const [policies, setPolicies] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      policyApi
        .getAll()
        .then((data) => {
          const list = Array.isArray(data) ? data : data.data || [];
          setPolicies(list);
        })
        .catch(() => toast.error("Could not fetch policies list for payment entry"));

      const today = new Date().toISOString().split("T")[0];
      reset({
        policy_id: "",
        amount: "300",
        payment_status: "PAID",
        payment_method: "CREDIT_CARD",
        payment_date: today,
      });
    }
  }, [isOpen, reset]);

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      policy_id: parseInt(data.policy_id, 10),
      amount: parseFloat(data.amount),
    };
    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Premium Payment"
      subtitle="Log a customer premium installment or payment transaction"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <Select
          label="Insurance Policy Target *"
          icon={ShieldCheck}
          placeholder="Select Policy..."
          error={errors.policy_id?.message}
          options={policies.map((p) => ({
            value: p.id,
            label: `#${p.policy_number} - ${p.policy_type} (${p.customer?.name || "Customer #" + p.customer_id})`,
          }))}
          {...register("policy_id", { required: "Policy selection is required" })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Payment Amount ($) *"
            type="number"
            step="0.01"
            icon={DollarSign}
            placeholder="300.00"
            error={errors.amount?.message}
            {...register("amount", { required: "Payment amount is required" })}
          />

          <Input
            label="Payment Date *"
            type="date"
            icon={Calendar}
            error={errors.payment_date?.message}
            {...register("payment_date", { required: "Payment date is required" })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Payment Method"
            icon={CreditCard}
            options={PAYMENT_METHODS}
            {...register("payment_method")}
          />

          <Select
            label="Payment Status *"
            options={PAYMENT_STATUSES}
            {...register("payment_status", { required: "Payment status is required" })}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
          <Button variant="secondary" size="md" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" icon={CheckCircle2} isLoading={isLoading}>
            Record Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentFormModal;
