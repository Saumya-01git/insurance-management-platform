import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp, BarChart2, PieChart as PieIcon, CreditCard, Users } from "lucide-react";
import { formatCurrency } from "../../utils/policyHelpers";

const ReportCharts = ({ reportsData }) => {
  if (!reportsData) return null;

  const {
    revenueTrend = [],
    monthlyPolicies = [],
    claimsDistribution = [],
    paymentAnalytics = [],
    customerGrowth = [],
  } = reportsData;

  return (
    <div className="space-y-6">
      {/* Revenue Trend Area Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Carrier Gross Revenue Growth Trend
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">YTD 2026</span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                formatter={(val) => [formatCurrency(val), "Revenue"]}
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid 2: Monthly Policies & Claims Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Policies */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-cyan-500" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Monthly Underwritten Policies Volume
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyPolicies} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                <Bar dataKey="count" fill="#38BDF8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Claims Distribution */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Claims Settlement Ratio
            </h3>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={claimsDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                  {claimsDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-bold pt-1">
            {claimsDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid 3: Payment Analytics & Customer Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Payment Analytics */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Payment Gateway Settlements
            </h3>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentAnalytics} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <YAxis type="category" dataKey="method" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <Tooltip formatter={(val) => [formatCurrency(val), "Volume"]} contentStyle={{ borderRadius: "12px" }} />
                <Bar dataKey="amount" fill="#10B981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Growth */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Insured Policyholder Growth
            </h3>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <Tooltip contentStyle={{ borderRadius: "12px" }} />
                <Line type="monotone" dataKey="count" stroke="#A855F7" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCharts;
