import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { CheckCircle2, XCircle, FileText } from "lucide-react";

const ClaimReviewModal = ({
  isOpen,
  onClose,
  onApprove,
  onReject,
  claim = null,
  isLoading = false,
}) => {
  if (!claim) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Review Insurance Claim"
      subtitle={`Claim Reference #${claim.id} • Status: ${claim.status}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requested Payout</span>
            <Badge status={claim.status}>{claim.status}</Badge>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            ${parseFloat(claim.claim_amount || 0).toLocaleString()}
          </p>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-2 border-t border-slate-200/60 dark:border-white/5">
            <p>
              Policy Ref: <span className="font-bold">#{claim.policy?.policy_number || claim.policy_id}</span> ({claim.policy?.policy_type})
            </p>
            <p>
              Customer: <span className="font-bold">{claim.policy?.customer?.name || "N/A"}</span>
            </p>
            <p>
              Filed On: <span className="font-bold">{claim.submission_date ? new Date(claim.submission_date).toLocaleDateString() : "N/A"}</span>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-500" /> Incident Description & Reason
          </h4>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {claim.reason || "No description provided."}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
          <Button variant="secondary" size="md" onClick={onClose} isDisabled={isLoading} className="w-full sm:w-auto">
            Close
          </Button>

          {claim.status === "PENDING" && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="danger"
                size="md"
                icon={XCircle}
                onClick={() => onReject(claim.id)}
                isLoading={isLoading}
              >
                Reject Claim
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={CheckCircle2}
                onClick={() => onApprove(claim.id)}
                isLoading={isLoading}
              >
                Approve Payout
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ClaimReviewModal;
