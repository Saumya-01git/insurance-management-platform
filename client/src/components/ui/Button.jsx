import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-semibold shadow-lg shadow-[#2563EB]/25 border border-blue-400/20 active:scale-[0.99]",
  blue:
    "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-semibold shadow-lg shadow-[#2563EB]/25 border border-blue-400/20 active:scale-[0.99]",
  secondary:
    "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold",
  outline:
    "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium",
  ghost:
    "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-medium",
  danger:
    "bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-lg shadow-rose-600/20 border border-rose-500/30",
};

const sizes = {
  sm: "h-9 px-3.5 text-xs rounded-lg gap-1.5",
  md: "h-11 px-4 text-xs rounded-xl gap-2",
  lg: "h-[54px] px-6 text-base rounded-xl gap-2.5",
};

const Button = ({
  children,
  variant = "primary",
  size = "lg",
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  type = "button",
  className = "",
  onClick,
  ...props
}) => {
  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.lg;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${selectedVariant} ${selectedSize} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-5 h-5 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
