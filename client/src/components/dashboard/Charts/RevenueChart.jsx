import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "../../../utils/policyHelpers";

const RevenueChart = ({ revenueData: propData, paymentsList = [], policiesList = [] }) => {
  const [timeRange, setTimeRange] = useState("12M");

  let chartData = propData;

  if (!chartData) {
    const totalRev = paymentsList.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) ||
      policiesList.reduce((sum, p) => sum + (Number(p.premium) || 0), 0) || 128400;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    chartData = months.map((m, idx) => ({
      month: m,
      revenue: Math.round((totalRev / 8) * (0.5 + (idx * 0.1))),
      target: Math.round((totalRev / 8) * (0.6 + (idx * 0.08))),
    }));
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-xl text-white text-xs space-y-1">
          <p className="font-bold text-slate-300">{label} 2026</p>
          <p className="text-cyan-400 font-extrabold">
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          {payload[1] && (
            <p className="text-blue-400 font-semibold">
              Target: {formatCurrency(payload[1].value)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Premium Revenue Trend
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/30">
              <TrendingUp className="w-3 h-3" /> +15.8%
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Monthly gross written premium collection vs targets
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/50 self-start">
          {["6M", "12M", "YTD"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                timeRange === range
                  ? "bg-white dark:bg-slate-700 text-[#2563EB] dark:text-cyan-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
              tickFormatter={(val) => `$${val >= 1000 ? Math.round(val / 1000) + "k" : val}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#94A3B8"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorTarget)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
