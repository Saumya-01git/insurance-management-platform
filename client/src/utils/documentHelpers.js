/**
 * Document Helper Utilities for Insurance Carrier Vault
 */
import { FileText, Image as ImageIcon, FileCheck, FileCode, ShieldCheck } from "lucide-react";

export const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) return "1.2 MB";
  if (typeof bytes === "string") return bytes;
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export const getFileIcon = (fileType = "") => {
  const type = (fileType || "").toLowerCase();
  if (type.includes("pdf")) return FileText;
  if (type.includes("jpg") || type.includes("jpeg") || type.includes("png") || type.includes("image")) return ImageIcon;
  if (type.includes("doc") || type.includes("docx")) return FileCheck;
  return FileCode;
};

export const getDocumentStatusBadge = (status) => {
  const normalized = (status || "").toUpperCase();
  switch (normalized) {
    case "VERIFIED":
    case "APPROVED":
      return {
        label: "VERIFIED",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-900/30",
        dot: "bg-emerald-500",
      };
    case "REJECTED":
    case "EXPIRED":
      return {
        label: "REJECTED",
        bg: "bg-[#EF4444]/10 dark:bg-rose-950/40",
        text: "text-rose-600 dark:text-rose-400",
        border: "border-rose-200 dark:border-rose-900/30",
        dot: "bg-rose-500",
      };
    case "PENDING_VERIFICATION":
    case "PROCESSING":
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
