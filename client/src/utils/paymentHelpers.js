/**
 * Payment Helper Utilities for Insurance Carrier Platform
 */

export const getCustomerName = (cust) => {
  if (!cust) return "Carrier Customer";
  if (typeof cust === "string") return cust;
  if (typeof cust === "object") {
    return cust.fullName || cust.name || cust.user?.fullName || cust.user?.name || cust.email || "Carrier Customer";
  }
  return String(cust);
};

export const formatPaymentId = (id) => {
  if (!id) return "PAY-0000";
  if (typeof id === "string" && id.startsWith("PAY-")) return id;
  const numStr = String(id).replace(/\D/g, "");
  return `PAY-${numStr.padStart(4, "0") || "8801"}`;
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

export const getPaymentStatusBadge = (status) => {
  const normalized = (status || "").toUpperCase();
  switch (normalized) {
    case "COMPLETED":
    case "SETTLED":
    case "PAID":
      return {
        label: "SETTLED",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-900/30",
        dot: "bg-emerald-500",
      };
    case "OVERDUE":
    case "FAILED":
      return {
        label: "OVERDUE",
        bg: "bg-[#EF4444]/10 dark:bg-rose-950/40",
        text: "text-rose-600 dark:text-rose-400",
        border: "border-rose-200 dark:border-rose-900/30",
        dot: "bg-rose-500",
      };
    case "PENDING":
    case "PROCESSING":
    default:
      return {
        label: "PROCESSING",
        bg: "bg-amber-50 dark:bg-amber-950/40",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-900/30",
        dot: "bg-amber-500 animate-pulse",
      };
  }
};
