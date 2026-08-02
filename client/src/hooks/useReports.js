import { useState, useEffect, useCallback } from "react";
import { reportService } from "../services/reportService";
import { downloadCSV, downloadReportPDF } from "../utils/exportHelpers";
import { toast } from "react-hot-toast";

export const useReports = () => {
  const [reportsData, setReportsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportService.getReportsData();
      setReportsData(data);
    } catch (err) {
      console.error("Failed to load analytics reports:", err);
      setError("Failed to generate analytics report.");
      toast.error("Could not fetch reports data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleExportCSV = () => {
    if (!reportsData) return;
    const filename = `Executive_Carrier_Report_${new Date().toISOString().split("T")[0]}.csv`;
    const headers = ["Metric", "Live System Value"];
    const rows = [
      ["Total Gross Revenue", `$${reportsData.summary?.totalRevenue?.toLocaleString() || 0}`],
      ["Total Underwritten Policies", reportsData.summary?.totalPolicies || 0],
      ["Total Claims Processed", reportsData.summary?.totalClaims || 0],
      ["Total Payment Transactions", reportsData.summary?.totalPayments || 0],
      ["Total Onboarded Customers", reportsData.summary?.totalCustomers || 0],
      ["Total Vault Documents", reportsData.summary?.totalDocuments || 0],
    ];
    downloadCSV(filename, headers, rows);
    toast.success("Executive carrier report exported (CSV)!", { icon: "📊" });
  };

  const handleExportPDF = () => {
    if (!reportsData) return;
    downloadReportPDF(reportsData);
    toast.success("Executive analytics report downloaded!", { icon: "📄" });
  };

  const handlePrintReport = () => {
    window.print();
  };

  return {
    reportsData,
    loading,
    error,
    handleExportCSV,
    handleExportPDF,
    handlePrintReport,
    refetch: fetchReports,
  };
};
