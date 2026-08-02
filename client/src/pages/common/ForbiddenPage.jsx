import { ShieldAlert, ArrowLeft } from "lucide-react";

const ForbiddenPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-5 animate-in fade-in duration-300">
      <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 flex items-center justify-center shadow-lg shadow-rose-600/10">
        <ShieldAlert className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-mono font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">
          ERROR 403 • ACCESS RESTRICTED
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Forbidden Carrier Zone
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          You do not possess security clearance to access this underwriter module. Please contact your carrier system administrator for credentials.
        </p>
      </div>

      <button
        onClick={() => window.history.back()}
        className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Workspace</span>
      </button>
    </div>
  );
};

export default ForbiddenPage;
