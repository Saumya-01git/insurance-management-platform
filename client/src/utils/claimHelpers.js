/**
 * Claim Helper Utilities for Insurance Carrier Platform
 */

export const getCustomerName = (cust) => {
  if (!cust) return "Carrier Customer";
  if (typeof cust === "string") return cust;
  if (typeof cust === "object") {
    return cust.fullName || cust.name || cust.user?.fullName || cust.user?.name || cust.email || "Carrier Customer";
  }
  return String(cust);
};

export const formatClaimId = (id) => {
  if (!id) return "CLM-0000";
  if (typeof id === "string" && id.startsWith("CLM-")) return id;
  const numStr = String(id).replace(/\D/g, "");
  return `CLM-${numStr.padStart(4, "0") || "9001"}`;
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

export const getClaimStatusBadge = (status) => {
  const normalized = (status || "").toUpperCase();
  switch (normalized) {
    case "APPROVED":
    case "SETTLED":
      return {
        label: "APPROVED",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-900/30",
        dot: "bg-emerald-500",
      };
    case "REJECTED":
    case "DENIED":
      return {
        label: "REJECTED",
        bg: "bg-[#EF4444]/10 dark:bg-rose-950/40",
        text: "text-rose-600 dark:text-rose-400",
        border: "border-rose-200 dark:border-rose-900/30",
        dot: "bg-rose-500",
      };
    case "UNDER_REVIEW":
    case "INVESTIGATING":
      return {
        label: "UNDER REVIEW",
        bg: "bg-cyan-50 dark:bg-cyan-950/40",
        text: "text-cyan-600 dark:text-cyan-400",
        border: "border-cyan-200 dark:border-cyan-900/30",
        dot: "bg-cyan-500 animate-pulse",
      };
    case "PENDING":
    case "SUBMITTED":
    default:
      return {
        label: "PENDING",
        bg: "bg-amber-50 dark:bg-amber-950/40",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-900/30",
        dot: "bg-amber-500 animate-pulse",
      };
  }
};
