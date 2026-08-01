import { useState, useRef, useEffect } from "react";
import { Bell, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-xl p-3 z-50 animate-in fade-in duration-150 space-y-3">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Notifications
            </h4>
            <span className="text-[10px] font-bold text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded-full">
              4 New
            </span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> High Value Claim Filed
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Claim #CLM-9021 ($45,000) under review.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Passport KYC Approved
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Sarah Jenkins ID verified in vault.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
