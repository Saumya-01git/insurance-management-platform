import { useAuth } from "../../context/AuthContext";
import { User, Mail, Shield, CheckCircle, Key } from "lucide-react";
import Badge from "../../components/ui/Badge";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-5xl mx-auto min-w-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <User className="w-7 h-7 text-[#2563EB]" /> Account & Security Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          View your authenticated carrier credentials, role permissions, and active session status.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/25">
              {user?.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {user?.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge status={user?.role}>{user?.role}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-500" /> Full Name
            </span>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {user?.name || "N/A"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-blue-500" /> Email Address
            </span>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {user?.email || "N/A"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-purple-500" /> System Role & Permissions
            </span>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {user?.role || "CUSTOMER"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Session Authorization
            </span>
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active JWT Session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
