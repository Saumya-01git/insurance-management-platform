import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import { Mail, Phone, MapPin, Calendar, ShieldCheck } from "lucide-react";

const CustomerDetailModal = ({ isOpen, onClose, customer }) => {
  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customer Master File"
      subtitle={`Account ID #${customer.id} • Registered Profile`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
              {customer.name?.charAt(0) || "C"}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {customer.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" /> {customer.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge status="ACTIVE">Verified Customer</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-500" /> Phone Contact
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {customer.phone || "N/A"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Date of Birth
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {customer.dob ? new Date(customer.dob).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 space-y-1 sm:col-span-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-500" /> Address
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {customer.address || "N/A"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-500" /> Associated Policies ({customer.policies?.length || 0})
          </h4>
          {customer.policies && customer.policies.length > 0 ? (
            <div className="space-y-2">
              {customer.policies.map((policy) => (
                <div
                  key={policy.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      #{policy.policy_number} • {policy.policy_type}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Premium: ${policy.premium_amount} | Coverage: ${policy.coverage_amount || policy.premium_amount * 10}
                    </p>
                  </div>
                  <Badge status={policy.status}>{policy.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No insurance policies attached to this customer yet.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetailModal;
