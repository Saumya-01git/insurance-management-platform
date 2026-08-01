const ActivityCard = ({ title, user, action, time, icon: Icon, color = "blue" }) => {
  return (
    <div className="flex items-start gap-3.5 relative pb-4 last:pb-0 group">
      {/* Connector Line */}
      <div className="absolute left-4 top-8 -bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800 group-last:hidden" />

      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#2563EB] dark:text-cyan-400 flex items-center justify-center shrink-0 z-10 shadow-sm">
        <Icon className="w-4 h-4" />
      </div>

      <div className="space-y-0.5 flex-1 min-w-0">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-900 dark:text-white truncate">
            {user}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 shrink-0">
            {time}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {action}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
