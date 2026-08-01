import { Bell, AlertTriangle, ShieldCheck, FileCheck, CheckCircle2 } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "High Value Claim Filed",
    message: "Claim #CLM-9021 ($45,000) submitted by David Vance for Property Loss.",
    time: "10 mins ago",
    type: "warning",
    icon: AlertTriangle,
    color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-200 dark:border-amber-900/30",
  },
  {
    id: 2,
    title: "KYC Verification Approved",
    message: "Identity document verified for Customer Sarah Jenkins (Passports Vault).",
    time: "45 mins ago",
    type: "success",
    icon: ShieldCheck,
    color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-200 dark:border-emerald-900/30",
  },
  {
    id: 3,
    title: "Automated Renewal Executed",
    message: "Health Insurance Policy #POL-4410 auto-renewed for $3,400 annual premium.",
    time: "2 hours ago",
    type: "info",
    icon: FileCheck,
    color: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 border-cyan-200 dark:border-cyan-900/30",
  },
  {
    id: 4,
    title: "Payment Settlement Complete",
    message: "Premium collection batch #PAY-8821 ($128,400) settled via Stripe Gateway.",
    time: "5 hours ago",
    type: "success",
    icon: CheckCircle2,
    color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-900/30",
  },
];

const NotificationPanel = () => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-500" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            System Alerts & Notifications
          </h3>
        </div>
        <span className="text-xs font-bold text-[#2563EB] dark:text-cyan-400 hover:underline cursor-pointer">
          Mark all read
        </span>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-start gap-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className={`w-9 h-9 rounded-xl ${item.color} border flex items-center justify-center shrink-0 shadow-sm`}>
              <item.icon className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {item.title}
                </h4>
                <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
