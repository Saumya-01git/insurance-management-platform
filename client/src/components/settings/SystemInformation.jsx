import { Server, Database, ShieldCheck, CheckCircle2 } from "lucide-react";

const SystemInformation = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Server className="w-5 h-5 text-purple-500" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">System Architecture & Node Diagnostics</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="text-slate-400 font-medium">Platform Build Version</span>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">v4.18.0 (Production Release)</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="text-slate-400 font-medium">Database ORM Engine</span>
          <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
            <Database className="w-4 h-4" /> Prisma ORM v5.14
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="text-slate-400 font-medium">Backend Runtime</span>
          <p className="text-sm font-extrabold text-[#2563EB] dark:text-cyan-400 font-mono">Node.js Express REST Engine</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="text-slate-400 font-medium">API Health Status</span>
          <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Operational (100% Uptime)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemInformation;
