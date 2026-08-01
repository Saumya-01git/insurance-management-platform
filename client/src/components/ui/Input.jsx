import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      icon: Icon,
      rightElement,
      type = "text",
      placeholder = "",
      className = "",
      containerClassName = "",
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-1.5 w-full ${containerClassName}`}>
        {label && (
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {Icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center z-10">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            style={{
              paddingLeft: Icon ? "2.6rem" : "1rem",
              paddingRight: rightElement ? "2.6rem" : "1rem",
              ...style,
            }}
            className={`w-full h-12 text-xs sm:text-sm font-medium rounded-xl bg-[#F8FAFC] dark:bg-[#0c1322] border ${
              error
                ? "border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-4 focus:ring-rose-500/15"
                : "border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
            } focus:outline-none transition-all duration-200 placeholder-slate-400 dark:placeholder-slate-500 ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-[11px] text-rose-500 font-semibold pt-0.5">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
