import { useReports } from "../../hooks/useReports";
import ReportHeader from "../../components/reports/ReportHeader";
import ReportStats from "../../components/reports/ReportStats";
import ReportCharts from "../../components/reports/ReportCharts";

import { ShieldCheck, TrendingUp, AlertCircle, Award } from "lucide-react";

const ReportsDashboard = () => {
  const {
    reportsData,
    loading,
    handleExportCSV,
    handleExportPDF,
    handlePrintReport,
    refetch,
  } = useReports();

  if (loading) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
      </div>
    );
  }

  const insights = reportsData?.insights || {};

  return (
    <div className="animate-in fade-in duration-300 pb-10 max-w-7xl mx-auto">
      {/* Report Actions Header - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }}>
        <ReportHeader
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
          onPrint={handlePrintReport}
          onGenerate={refetch}
        />
      </div>

      {/* KPI Stats Cards - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }}>
        <ReportStats summary={reportsData?.summary} />
      </div>

      {/* Business Risk & Underwriting Insights Banner - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }} className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Backend Business Intelligence & Risk Analysis
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/30">
            Prisma ORM Analytics Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-slate-400 font-medium">Profit & Underwriting Health</span>
            <p className="text-base font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> {insights.profitStatus || "Healthy"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-slate-400 font-medium">Underwriting Risk Level</span>
            <p className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-500" /> {insights.riskLevel || "Low Risk"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-slate-400 font-medium">Portfolio Quality Index</span>
            <p className="text-base font-black text-[#2563EB] dark:text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> {insights.portfolioHealth || "Excellent"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-slate-400 font-medium">Claim Approval Rate</span>
            <p className="text-base font-black text-purple-600 dark:text-purple-400">
              {insights.claimApprovalRate || 100}%
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ marginBottom: "28px" }}>
        <ReportCharts reportsData={reportsData} />
      </div>
    </div>
  );
};

export default ReportsDashboard;
