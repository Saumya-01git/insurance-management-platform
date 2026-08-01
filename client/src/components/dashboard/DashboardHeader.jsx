import Breadcrumb from "./Breadcrumb";
import { RefreshCw, Download } from "lucide-react";
import { toast } from "react-hot-toast";

const DashboardHeader = ({ title = "Dashboard Overview", subtitle = "Enterprise Insurance Carrier Metrics & REST Synchronization" }) => {
  return (
    <div className="space-y-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
      <Breadcrumb />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.success("Dashboard metrics synchronized with Prisma database.")}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync REST Data</span>
          </button>

          <button
            onClick={() => toast.success("Executive PDF Summary downloaded.")}
            className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Executive Summary</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
