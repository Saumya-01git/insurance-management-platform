import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(
  (
    {
      label,
      error,
      options = [],
      placeholder = "Select an option...",
      className = "",
      containerClassName = "",
      icon: Icon,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-1.5 w-full ${containerClassName}`}>
        {label && (
          <label className="block text-[14px] font-semibold text-slate-700 dark:text-slate-200">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {Icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center z-10">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <select
            ref={ref}
            style={{
              paddingLeft: Icon ? "3rem" : "1.25rem",
              paddingRight: "2.75rem",
            }}
            className={`w-full h-[54px] text-sm rounded-xl bg-slate-50 dark:bg-[#0b121e] border appearance-none ${
              error
                ? "border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-4 focus:ring-rose-500/15"
                : "border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
            } focus:outline-none transition-all duration-200 cursor-pointer ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-slate-400 dark:text-slate-500">
                {placeholder}
              </option>
            )}
            {options.map((opt) => {
              const value = typeof opt === "object" ? opt.value : opt;
              const labelText = typeof opt === "object" ? opt.label : opt;
              return (
                <option
                  key={value}
                  value={value}
                  className="bg-white dark:bg-[#101828] text-slate-900 dark:text-slate-100"
                >
                  {labelText}
                </option>
              );
            })}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
        {error && <p className="text-xs text-rose-500 font-medium pt-0.5">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
