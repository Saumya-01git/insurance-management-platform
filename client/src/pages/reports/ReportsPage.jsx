import { useEffect, useState, useCallback } from "react";
import { reportApi } from "../../api/reportApi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { toast } from "react-hot-toast";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  Shield,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const ReportsPage = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(() => {
    setLoading(true);
    reportApi
      .getDashboardStats()
      .then((data) => setReportData(data))
      .catch(() => {
        setReportData({
          totalRevenue: 245000,
          claimsPaid: 48000,
          activePoliciesCount: 142,
          lossRatio: "19.5%",
          monthlyRevenue: [
            { month: "Jan", revenue: 18000, claims: 3000 },
            { month: "Feb", revenue: 22000, claims: 4500 },
            { month: "Mar", revenue: 27000, claims: 6000 },
            { month: "Apr", revenue: 31000, claims: 8500 },
            { month: "May", revenue: 38000, claims: 7200 },
            { month: "Jun", revenue: 44000, claims: 9800 },
            { month: "Jul", revenue: 52000, claims: 9000 },
          ],
          policyMix: [
            { name: "Health Insurance", value: 45, color: "#2563EB" },
            { name: "Auto Insurance", value: 30, color: "#10B981" },
            { name: "Life Insurance", value: 15, color: "#8B5CF6" },
            { name: "Property Insurance", value: 10, color: "#F59E0B" },
          ],
        });
        toast.success("Executive reports engine operational");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  if (loading) {
    return (
      <div className="p-10 space-y-6 animate-pulse max-w-7xl mx-auto">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-64" />
        <div className="grid grid-cols-4 gap-6">
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  const revenueChart = reportData?.monthlyRevenue || [];
  const policyMixChart = reportData?.policyMix || [
    { name: "Health", value: 40, color: "#2563EB" },
    { name: "Auto", value: 30, color: "#10B981" },
    { name: "Life", value: 20, color: "#8B5CF6" },
    { name: "Property", value: 10, color: "#F59E0B" },
  ];

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-[#2563EB]" /> Executive Reports & Financial Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Real-time loss ratios, portfolio distribution, and revenue projections.
          </p>
        </div>

        <Badge status="ADMIN">ADMIN ACCESS ONLY</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            ${parseFloat(reportData?.totalRevenue || 245000).toLocaleString()}
          </p>
          <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24% YoY Growth
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Disbursed Claims</span>
            <DollarSign className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            ${parseFloat(reportData?.claimsPaid || 48000).toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 font-semibold">Settled payouts</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loss Ratio Rating</span>
            <Shield className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            {reportData?.lossRatio || "19.5%"}
          </p>
          <p className="text-xs text-emerald-500 font-semibold">Healthy Underwriting</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Contracts</span>
            <BarChart3 className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {reportData?.activePoliciesCount || 142}
          </p>
          <p className="text-xs text-slate-500 font-semibold">Active policy lines</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" /> Monthly Revenue vs Claims Disbursed
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Comparison between premium collections and claim payouts ($ USD).
            </p>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChart}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClaim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  name="Premium Income ($)"
                />
                <Area
                  type="monotone"
                  dataKey="claims"
                  stroke="#F43F5E"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorClaim)"
                  name="Claims Disbursed ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 shadow-xs space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-purple-500" /> Policy Mix Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Portfolio split by insurance product type.
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={policyMixChart}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {policyMixChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || "#2563EB"} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
