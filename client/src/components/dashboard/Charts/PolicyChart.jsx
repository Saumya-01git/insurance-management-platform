import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Shield } from "lucide-react";

const PolicyChart = ({ policyData: propData, policiesList = [] }) => {
  let chartData = propData;

  if (!chartData && Array.isArray(policiesList) && policiesList.length > 0) {
    const health = policiesList.filter((p) => (p.policyType || "").toLowerCase().includes("health")).length;
    const auto = policiesList.filter((p) => (p.policyType || "").toLowerCase().includes("auto") || (p.policyType || "").toLowerCase().includes("vehicle") || (p.policyType || "").toLowerCase().includes("fleet")).length;
    const life = policiesList.filter((p) => (p.policyType || "").toLowerCase().includes("life")).length;
    const property = policiesList.filter((p) => (p.policyType || "").toLowerCase().includes("property") || (p.policyType || "").toLowerCase().includes("commercial") || (p.policyType || "").toLowerCase().includes("cyber")).length;

    chartData = [
      { type: "Health", count: health, color: "#2563EB" },
      { type: "Auto / Fleet", count: auto, color: "#06B6D4" },
      { type: "Life", count: life, color: "#3B82F6" },
      { type: "Property / Cyber", count: property, color: "#8B5CF6" },
    ];
  }

  if (!chartData) {
    chartData = [
      { type: "Health", count: 2, color: "#2563EB" },
      { type: "Auto / Fleet", count: 0, color: "#06B6D4" },
      { type: "Life", count: 1, color: "#3B82F6" },
      { type: "Property / Cyber", count: 3, color: "#8B5CF6" },
    ];
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-xl text-white text-xs space-y-1">
          <p className="font-bold text-slate-300">{data.type} Insurance</p>
          <p className="text-cyan-400 font-extrabold">{data.count} Active Policies</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Policies by Type
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Active underwritten portfolio distribution
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
          <Shield className="w-4 h-4" />
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
            <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 11 }} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PolicyChart;
