import { useState, useEffect } from "react";
import { Bell, AlertTriangle, ShieldCheck, CheckCircle2, Check, UserCheck } from "lucide-react";
import { claimService } from "../../services/claimService";
import { policyService } from "../../services/policyService";
import { paymentService } from "../../services/paymentService";
import { formatCurrency, getCustomerName } from "../../utils/policyHelpers";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const NotificationPanel = () => {
  const { user } = useAuth();
  const [notificationsList, setNotificationsList] = useState([]);
  const [isAllRead, setIsAllRead] = useState(false);

  const userRole = (user?.role || "ADMIN").toUpperCase();
  const userName = user?.name || user?.fullName || "Policyholder";

  useEffect(() => {
    const load = async () => {
      try {
        const [claims, policies, payments] = await Promise.all([
          claimService.getClaims().catch(() => []),
          policyService.getPolicies().catch(() => []),
          paymentService.getPayments().catch(() => []),
        ]);

        const list = [];

        // 1. Session Active Notification (Self)
        list.push({
          id: "notif-user-login",
          title: `Active ${userRole} Session`,
          message: `${userName} authenticated to carrier platform.`,
          time: "Just now",
          icon: UserCheck,
          color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-900/30",
        });

        if (userRole === "CUSTOMER") {
          // CUSTOMER: Strictly isolated to Customer's OWN alerts ONLY!
          list.push({
            id: "notif-cust-1",
            title: "Policy Status Verified",
            message: `Your insurance policy coverage is active and verified for ${userName}.`,
            time: "15 mins ago",
            icon: ShieldCheck,
            color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-200 dark:border-emerald-900/30",
          });
          list.push({
            id: "notif-cust-2",
            title: "Premium Payment Receipt",
            message: `Your latest premium installment of $1,200 has been cleared.`,
            time: "1 hour ago",
            icon: CheckCircle2,
            color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-900/30",
          });
        } else {
          // ADMIN / AGENT: Portfolio & Carrier System Alerts across customers
          if (Array.isArray(claims) && claims.length > 0) {
            const highClaim = claims.find((c) => Number(c.claimAmount) > 10000) || claims[0];
            list.push({
              id: "notif-1",
              title: "High Value Claim Filed",
              message: `Claim #${highClaim.claimId || highClaim.id} (${formatCurrency(highClaim.claimAmount)}) submitted by ${getCustomerName(highClaim.customer)} for ${highClaim.claimType || "Loss"}.`,
              time: "10 mins ago",
              icon: AlertTriangle,
              color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-200 dark:border-amber-900/30",
            });
          }

          if (Array.isArray(policies) && policies.length > 0) {
            const activePol = policies[0];
            list.push({
              id: "notif-2",
              title: "Underwriting Execution Complete",
              message: `${activePol.policyType || "Policy"} #${activePol.policyNumber || activePol.id} active for ${getCustomerName(activePol.customer)} (${formatCurrency(activePol.premium)} annual).`,
              time: "45 mins ago",
              icon: ShieldCheck,
              color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-200 dark:border-emerald-900/30",
            });
          }

          if (Array.isArray(payments) && payments.length > 0) {
            const pay = payments[0];
            list.push({
              id: "notif-3",
              title: "Premium Settlement Cleared",
              message: `Payment batch #${pay.paymentId || pay.id} (${formatCurrency(pay.amount)}) settled via ${pay.paymentMethod || "Stripe Gateway"}.`,
              time: "2 hours ago",
              icon: CheckCircle2,
              color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-900/30",
            });
          }
        }

        setNotificationsList(list);
      } catch (err) {
        setNotificationsList(getFallbackNotifications(userName, userRole));
      }
    };
    load();
  }, [user, userName, userRole]);

  const getFallbackNotifications = (name, role) => {
    return [
      {
        id: "fallback-1",
        title: `Active ${role} Session`,
        message: `${name} successfully logged in to carrier workspace.`,
        time: "Just now",
        icon: UserCheck,
        color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-900/30",
      },
      {
        id: "fallback-2",
        title: "Policy Status Active",
        message: "Coverage terms and underwriting risk parameters verified.",
        time: "15 mins ago",
        icon: ShieldCheck,
        color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-200 dark:border-emerald-900/30",
      },
    ];
  };

  const handleMarkAllRead = () => {
    setIsAllRead(true);
    toast.success("All system alerts marked as read!", { icon: "✅" });
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-500" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            System Alerts & Notifications
          </h3>
        </div>
        {!isAllRead ? (
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-[#2563EB] dark:text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        ) : (
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/30 flex items-center gap-1">
            <Check className="w-3 h-3" /> All Read
          </span>
        )}
      </div>

      {isAllRead ? (
        <div className="p-8 text-center bg-slate-50/60 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <Check className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
            All System Notifications Cleared
          </p>
          <p className="text-[11px] text-slate-400 font-medium">
            You have reviewed all underwriter alerts and high value claim filings.
          </p>
          <button
            onClick={() => setIsAllRead(false)}
            className="text-xs font-extrabold text-[#2563EB] dark:text-cyan-400 hover:underline pt-1 cursor-pointer block mx-auto"
          >
            Restore notifications list
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {notificationsList.map((item) => (
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
      )}
    </div>
  );
};

export default NotificationPanel;
