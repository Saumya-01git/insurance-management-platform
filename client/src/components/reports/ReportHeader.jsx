import { Link } from "react-router-dom";
import { Download, FileText, Printer, RefreshCw } from "lucide-react";

const ReportHeader = ({ onExportCSV, onExportPDF, onPrint, onGenerate }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Link to="/dashboard" className="hover:text-[#2563EB] cursor-pointer transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white">Reports</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
          Executive Analytics & Audit Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          Real-time carrier financial health, underwriting yield, and claims distribution metrics
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
        <button
          onClick={onGenerate}
          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Refresh</span>
        </button>

        <button
          onClick={onPrint}
          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Print</span>
        </button>

        <button
          onClick={onExportPDF}
          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-rose-500" />
          <span>PDF</span>
        </button>

        <button
          onClick={onExportCSV}
          className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
};

export default ReportHeader;
