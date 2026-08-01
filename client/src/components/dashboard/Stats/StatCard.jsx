import { TrendingUp, TrendingDown, Shield, Users, FileText, DollarSign } from "lucide-react";

const StatCard = ({ title, value, change, isPositive, icon: Icon, color = "blue", description }) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/40",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/30",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-900/30",
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-cyan-950/40",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-100 dark:border-cyan-900/30",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/40",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-100 dark:border-amber-900/30",
    },
  };

  const activeColor = colorMap[color] || colorMap.blue;

  // Fallback default icon if none provided
  const CardIcon = Icon || (title.includes("Customer") ? Users : title.includes("Policy") ? Shield : title.includes("Claim") ? FileText : DollarSign);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-xl ${activeColor.bg} ${activeColor.text} ${activeColor.border} border flex items-center justify-center shrink-0 shadow-sm`}>
          <CardIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
              isPositive
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30"
                : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30"
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{change}</span>
          </span>
          <span className="text-xs text-slate-400 font-medium">vs last month</span>
        </div>
      </div>

      {description && (
        <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80 font-medium">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
