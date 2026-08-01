/**
 * Customer Helper Utilities for Insurance Carrier Platform
 */

export const formatCustomerId = (id) => {
  if (!id) return "CUST-0000";
  if (typeof id === "string" && id.startsWith("CUST-")) return id;
  const numStr = String(id).replace(/\D/g, "");
  return `CUST-${numStr.padStart(4, "0") || "1001"}`;
};

export const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export const getInitials = (name) => {
  if (!name) return "CU";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const getStatusBadgeStyle = (status) => {
  const normalized = (status || "").toUpperCase();
  switch (normalized) {
    case "ACTIVE":
      return {
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-900/30",
        dot: "bg-emerald-500",
      };
    case "INACTIVE":
    case "SUSPENDED":
      return {
        bg: "bg-slate-100 dark:bg-slate-800",
        text: "text-slate-600 dark:text-slate-400",
        border: "border-slate-200 dark:border-slate-700",
        dot: "bg-slate-400",
      };
    case "PENDING_KYC":
    case "PENDING":
      return {
        bg: "bg-amber-50 dark:bg-amber-950/40",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-900/30",
        dot: "bg-amber-500 animate-pulse",
      };
    case "HIGH_RISK":
      return {
        bg: "bg-rose-50 dark:bg-rose-950/40",
        text: "text-rose-600 dark:text-rose-400",
        border: "border-rose-200 dark:border-rose-900/30",
        dot: "bg-rose-500",
      };
    default:
      return {
        bg: "bg-blue-50 dark:bg-blue-950/40",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-900/30",
        dot: "bg-blue-500",
      };
  }
};
