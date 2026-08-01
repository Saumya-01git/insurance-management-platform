import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users } from "lucide-react";

const customerData = [
  { month: "Jan", customers: 6200 },
  { month: "Feb", customers: 6540 },
  { month: "Mar", customers: 6980 },
  { month: "Apr", customers: 7320 },
  { month: "May", customers: 7850 },
  { month: "Jun", customers: 8210 },
  { month: "Jul", customers: 8590 },
  { month: "Aug", customers: 8932 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-xl text-white text-xs space-y-1">
        <p className="font-bold text-slate-300">{label} 2026</p>
        <p className="text-cyan-400 font-extrabold">{payload[0].value.toLocaleString()} Customers</p>
      </div>
    );
  }
  return null;
};

const CustomerGrowthChart = () => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Customer Acquisition
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Cumulative policyholder onboarding
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
          <Users className="w-4 h-4" />
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={customerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="customers"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: "#10B981", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerGrowthChart;
