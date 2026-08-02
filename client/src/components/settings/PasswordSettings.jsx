import { useState } from "react";
import { Lock, Save } from "lucide-react";
import { toast } from "react-hot-toast";

const PasswordSettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    toast.success("Security password updated successfully!");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Lock className="w-5 h-5 text-rose-500" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Change Account Password</h3>
      </div>

      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            required
            value={passwords.currentPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">New Secure Password</label>
          <input
            type="password"
            name="newPassword"
            required
            value={passwords.newPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={passwords.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all cursor-pointer flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Update Password</span>
        </button>
      </div>
    </form>
  );
};

export default PasswordSettings;
