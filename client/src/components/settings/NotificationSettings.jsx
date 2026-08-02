import { useState } from "react";
import { Bell, Save } from "lucide-react";
import { toast } from "react-hot-toast";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailUnderwriting: true,
    emailClaims: true,
    smsAlerts: false,
    dailyAuditSummary: true,
  });

  const toggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Notification preferences updated!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Bell className="w-5 h-5 text-amber-500" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Audit & Event Alerts</h3>
      </div>

      <div className="space-y-4 text-xs font-semibold">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white">Underwriting Policy Alerts</p>
            <p className="text-[11px] text-slate-400 font-normal">Receive immediate email updates when a policy is underwritten or renewed.</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.emailUnderwriting}
            onChange={() => toggle("emailUnderwriting")}
            className="w-4 h-4 accent-[#2563EB] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white">Claims Loss Filing Alerts</p>
            <p className="text-[11px] text-slate-400 font-normal">Receive instant notifications when high-value loss claims are filed.</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.emailClaims}
            onChange={() => toggle("emailClaims")}
            className="w-4 h-4 accent-[#2563EB] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white">SMS Security Code Multi-Factor</p>
            <p className="text-[11px] text-slate-400 font-normal">Receive SMS codes for critical administrative changes.</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.smsAlerts}
            onChange={() => toggle("smsAlerts")}
            className="w-4 h-4 accent-[#2563EB] cursor-pointer"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>
    </form>
  );
};

export default NotificationSettings;
