import ActivityCard from "./ActivityCard";
import { Activity, ShieldCheck, FilePlus, DollarSign, UploadCloud, UserPlus } from "lucide-react";

const activities = [
  {
    user: "David Vance (Agent)",
    action: "Underwrote Health Policy #POL-8840 for Customer Sarah Jenkins.",
    time: "12 mins ago",
    icon: ShieldCheck,
  },
  {
    user: "Sarah Jenkins (Customer)",
    action: "Uploaded Passport KYC Identity document to Encrypted Vault.",
    time: "35 mins ago",
    icon: UploadCloud,
  },
  {
    user: "System Auditor",
    action: "Processed Premium Settlement Batch #PAY-9921 ($128,400).",
    time: "1 hour ago",
    icon: DollarSign,
  },
  {
    user: "Elena Rostova (Agent)",
    action: "Registered Commercial Claim #CLM-9021 ($45,000).",
    time: "2 hours ago",
    icon: FilePlus,
  },
  {
    user: "Admin System",
    action: "Provisioned new Insurance Agent account for Marcus Aurelius.",
    time: "4 hours ago",
    icon: UserPlus,
  },
];

const RecentActivity = () => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recent System Activity
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">Live Audit Trail</span>
      </div>

      <div className="pt-2">
        {activities.map((act, idx) => (
          <ActivityCard key={idx} {...act} />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
