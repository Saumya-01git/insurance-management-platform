import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { policyApi } from "../../api/policyApi";
import { FileText, DollarSign, Calendar, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

const ClaimFormModal = ({ isOpen, onClose, onSubmit, isLoading = false }) => {
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
          setPolicies(list.filter((p) => p.status === "ACTIVE"));
        })
        .catch(() => toast.error("Could not fetch active policies for claim filing"));

      const today = new Date().toISOString().split("T")[0];
      reset({
        policy_id: "",
        claim_amount: "5000",
        reason: "",
        submission_date: today,
      });
    }
  }, [isOpen, reset]);

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      policy_id: parseInt(data.policy_id, 10),
      claim_amount: parseFloat(data.claim_amount),
    };
    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Insurance Claim"
      subtitle="File a reimbursement or indemnity claim for an active policy"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <Select
          label="Active Insurance Policy *"
          icon={ShieldCheck}
          placeholder="Select Active Policy..."
          error={errors.policy_id?.message}
          options={policies.map((p) => ({
            value: p.id,
            label: `#${p.policy_number} - ${p.policy_type} (${p.customer?.name || "Customer #" + p.customer_id})`,
          }))}
          {...register("policy_id", { required: "Policy selection is required" })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Claim Amount Requested ($) *"
            type="number"
            step="0.01"
            icon={DollarSign}
            placeholder="5000.00"
            error={errors.claim_amount?.message}
            {...register("claim_amount", { required: "Claim amount is required" })}
          />

          <Input
            label="Incident / Submission Date *"
            type="date"
            icon={Calendar}
            error={errors.submission_date?.message}
            {...register("submission_date", { required: "Submission date is required" })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[14px] font-semibold text-slate-700 dark:text-slate-200">
            Claim Description & Reason *
          </label>
          <textarea
            rows={4}
            placeholder="Describe the incident, loss details, or medical expenses incurred..."
            className="w-full text-sm p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b121e] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-[#2563EB] focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
            {...register("reason", { required: "Reason and description are required" })}
          />
          {errors.reason && (
            <p className="text-xs text-rose-500 font-medium pt-0.5">{errors.reason.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
          <Button variant="secondary" size="md" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" icon={FileText} isLoading={isLoading}>
            File Claim
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ClaimFormModal;
