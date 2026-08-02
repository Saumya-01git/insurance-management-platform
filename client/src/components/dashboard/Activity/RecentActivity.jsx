import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  ShieldCheck,
  FilePlus,
  DollarSign,
  UserPlus,
  LogIn,
  UploadCloud,
  CheckCircle2,
  Clock,
} from "lucide-react";

const RecentActivity = () => {
  const { user } = useAuth();
  const userRole = (user?.role || "ADMIN").toUpperCase();
  const userName = user?.name || "User";

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setActivities(getFallbackActivities(userName, userRole));
    setLoading(false);
  }, [userRole, userName]);

  const getFallbackActivities = (name, role) => {
    if (role === "CUSTOMER") {
      return [
        {
          user: `${name} (Customer)`,
          action: "Authenticated to Policyholder Portal session.",
          time: "Just now",
          icon: LogIn,
        },
        {
          user: `${name} (Customer)`,
          action: "Submitted Commercial Property Claim Proof document.",
          time: "45 mins ago",
          icon: UploadCloud,
        },
        {
          user: `${name} (Customer)`,
          action: "Premium settlement ACH payment confirmed ($3,200).",
          time: "2 hours ago",
          icon: DollarSign,
        },
      ];
    }

    return [
      {
        user: `${name} (${role})`,
        action: `Authenticated to carrier workspace session & initialized ${role} token.`,
        time: "Just now",
        icon: LogIn,
      },
      {
        user: "Customer Naira (Customer)",
        action: "Underwrote Health Policy #POL-8840 for Customer Naira.",
        time: "12 mins ago",
        icon: ShieldCheck,
      },
      {
        user: "David Vance (Agent)",
        action: "Registered Commercial Property Claim #CLM-9021.",
        time: "35 mins ago",
        icon: FilePlus,
      },
      {
        user: "System Auditor",
        action: "Processed Premium Settlement Batch #PAY-9921 ($128,400).",
        time: "1 hour ago",
        icon: DollarSign,
      },
    ];
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recent System Activity
          </h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Live Operational Audit
        </span>
      </div>

      {loading ? (
        <div className="space-y-3 py-2 animate-pulse">
          <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        </div>
      ) : (
        <div className="space-y-3.5 flex-1">
          {activities.slice(0, 4).map((act, idx) => {
            const Icon = act.icon || Clock;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/30">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-extrabold text-slate-900 dark:text-white truncate">
                      {act.user}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {act.time}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium line-clamp-1">
                    {act.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
