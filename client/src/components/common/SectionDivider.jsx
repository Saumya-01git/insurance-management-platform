import { Sparkles } from "lucide-react";

const SectionDivider = ({ title, subtitle, icon: Icon = Sparkles, badge }) => {
  return (
    <div
      style={{ marginTop: "56px", marginBottom: "28px" }}
      className="w-full flex items-center justify-between gap-4 border-b border-slate-300/70 dark:border-purple-500/25 pb-4"
    >
      {/* Left Timeline Circle Node & Title Group */}
      <div className="flex items-center gap-3.5">
        {/* Timeline Circle Bullet Node */}
        <div className="w-6 h-6 rounded-full border-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-[#0B091F] flex items-center justify-center shrink-0 shadow-md shadow-purple-900/30 ring-4 ring-purple-500/15">
          <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-300 animate-pulse" />
        </div>

        {/* Section Title & Subtitle */}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-wide uppercase">
              {title}
            </h3>
            {badge && (
              <span className="text-[11px] font-black text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 border border-purple-400/40 px-3 py-0.5 rounded-full shadow-xs">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-purple-300/70 font-bold mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Side Timeline End Circle Node */}
      <div className="hidden sm:flex items-center gap-2.5">
        <span className="text-[11px] font-black text-purple-600 dark:text-purple-300/80 uppercase tracking-widest">
          Live Data Stream
        </span>
        <div className="w-3.5 h-3.5 rounded-full border-2 border-purple-400/60 bg-purple-500/20 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
