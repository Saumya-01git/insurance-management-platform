import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Calendar, RefreshCw } from "lucide-react";

const PolicyRenewModal = ({ isOpen, onClose, onRenew, policy = null, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (policy) {
      const currentEnd = policy.end_date ? new Date(policy.end_date) : new Date();
      currentEnd.setFullYear(currentEnd.getFullYear() + 1);
      reset({
        end_date: currentEnd.toISOString().split("T")[0],
      });
    }
  }, [policy, reset, isOpen]);

  const handleFormSubmit = (data) => {
    onRenew(policy.id, data);
  };

  if (!policy) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Renew Policy Coverage"
      subtitle={`Policy #${policy.policy_number} • Current Status: ${policy.status}`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <p className="font-bold text-[#2563EB] dark:text-blue-400">Policy Renewal Summary</p>
          <p>Customer: <span className="font-semibold">{policy.customer?.name || "N/A"}</span></p>
          <p>Type: <span className="font-semibold">{policy.policy_type}</span></p>
        </div>

        <Input
          label="New Expiration End Date *"
          type="date"
          icon={Calendar}
          error={errors.end_date?.message}
          {...register("end_date", { required: "New end date is required" })}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
          <Button variant="secondary" size="md" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" icon={RefreshCw} isLoading={isLoading}>
            Confirm Renewal
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PolicyRenewModal;
