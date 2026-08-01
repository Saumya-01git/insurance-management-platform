import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FileText } from "lucide-react";

const claimsData = [
  { name: "Approved", value: 680, color: "#10B981" },
  { name: "Under Review", value: 340, color: "#06B6D4" },
  { name: "Pending", value: 165, color: "#F59E0B" },
  { name: "Rejected", value: 62, color: "#EF4444" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-xl text-white text-xs space-y-1">
        <p className="font-bold text-slate-300">{data.name} Claims</p>
        <p className="text-cyan-400 font-extrabold">{data.value} Filed Claims</p>
      </div>
    );
  }
  return null;
};

const ClaimsChart = () => {
  const totalClaims = claimsData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Claims Status Breakdown
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Real-time claims underwriting status
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 flex items-center justify-center">
          <FileText className="w-4 h-4" />
        </div>
      </div>

      <div className="h-64 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={claimsData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {claimsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Total Count Overlay */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-xl font-black text-slate-900 dark:text-white">{totalClaims}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Claims</p>
        </div>
      </div>
    </div>
  );
};

export default ClaimsChart;
