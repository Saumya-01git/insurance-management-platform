import { TrendingUp, TrendingDown, Shield, Users, FileText, DollarSign } from "lucide-react";

const StatCard = ({ title, value, change, isPositive, icon: Icon, color = "blue", description }) => {
  const colorMap = {
    blue: {
      bg: "bg-purple-500/15 dark:bg-purple-950/60",
      text: "text-purple-600 dark:text-purple-300",
      border: "border-purple-300/40 dark:border-purple-500/40",
    },
    emerald: {
      bg: "bg-emerald-500/15 dark:bg-emerald-950/60",
      text: "text-emerald-600 dark:text-emerald-300",
      border: "border-emerald-300/40 dark:border-emerald-500/40",
    },
    cyan: {
      bg: "bg-indigo-500/15 dark:bg-indigo-950/60",
      text: "text-indigo-600 dark:text-indigo-300",
      border: "border-indigo-300/40 dark:border-indigo-500/40",
    },
    amber: {
      bg: "bg-amber-500/15 dark:bg-amber-950/60",
      text: "text-amber-600 dark:text-amber-300",
      border: "border-amber-300/40 dark:border-amber-500/40",
    },
  };

  const activeColor = colorMap[color] || colorMap.blue;

  const CardIcon = Icon || (title.includes("Customer") ? Users : title.includes("Policy") ? Shield : title.includes("Claim") ? FileText : DollarSign);

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#120D30] border border-slate-200/90 dark:border-purple-500/25 shadow-xl dark:shadow-purple-950/30 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-1 transition-all duration-300 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-purple-200/70">
          {title}
        </span>
        <div className={`w-12 h-12 rounded-2xl ${activeColor.bg} ${activeColor.text} ${activeColor.border} border flex items-center justify-center shrink-0 shadow-md`}>
          <CardIcon className="w-6 h-6 stroke-[2.2]" />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
              isPositive
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-500/40"
                : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border border-rose-300/40 dark:border-rose-500/40"
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{change}</span>
          </span>
          <span className="text-xs text-slate-400 dark:text-purple-200/60 font-semibold">vs last month</span>
        </div>
      </div>

      {description && (
        <p className="text-xs text-slate-400 dark:text-purple-200/60 pt-2.5 border-t border-slate-100 dark:border-purple-500/15 font-medium leading-normal">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
