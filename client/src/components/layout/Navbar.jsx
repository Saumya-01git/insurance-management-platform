import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Menu,
  Sun,
  Moon,
  LogOut,
  User,
  ChevronDown,
  Search,
  Bell,
  Shield,
  Plus,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Badge from "../ui/Badge";
import GlobalSearchModal from "./GlobalSearchModal";

const Navbar = ({ toggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { title: "New Claim Filed", desc: "Policy #POL-891230 filed $4,500 claim", time: "5m ago", icon: AlertCircle, color: "text-amber-500" },
    { title: "Payment Settled", desc: "Premium installment of $1,200 received", time: "1h ago", icon: CheckCircle2, color: "text-emerald-500" },
    { title: "KYC Verified", desc: "Customer Sarah Jenkins uploaded ID proof", time: "3h ago", icon: Shield, color: "text-blue-500" },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-slate-100/90 dark:bg-[#0B132B]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 flex items-center justify-between transition-colors w-full">
        {/* Left Mobile Menu & Global Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Upper Global Command Search Bar - Soft Slate Pill */}
          <div
            onClick={() => setIsGlobalSearchOpen(true)}
            className="relative w-full hidden sm:block cursor-pointer group"
          >
            <Search className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 pointer-events-none z-10 transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Global Search (⌘K): Search customers, policies, claims, documents..."
              style={{ paddingLeft: "52px" }}
              className="w-full h-11 pr-14 text-xs sm:text-sm font-semibold rounded-full bg-white/90 dark:bg-[#131E36] border border-slate-200/90 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 group-hover:border-blue-400 transition-all cursor-pointer shadow-xs"
            />
            <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-300/50 dark:border-slate-700">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-4 pr-1">
          {/* Quick Action Button */}
          <a
            href="/policies"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Policy</span>
          </a>

          {/* Theme Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={darkMode ? "Light Theme" : "Dark Theme"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-500" />
            )}
          </button>

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotificationOpen((p) => !p)}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
            >
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 animate-pulse" />
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#131E36] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl p-4 z-50 animate-in zoom-in-95 duration-150 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Platform Activity
                  </h4>
                  <span className="text-[10px] text-blue-500 font-bold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                    Real-time
                  </span>
                </div>
                <div className="space-y-2.5">
                  {notifications.map((n, idx) => {
                    const Icon = n.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${n.color}`} />
                        <div className="text-xs space-y-0.5">
                          <p className="font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                          <p className="text-[11px] text-slate-400">{n.desc}</p>
                          <span className="text-[9px] text-slate-400 block pt-0.5">{n.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative pl-1" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 p-1.5 px-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800/60 transition-colors cursor-pointer border border-slate-300/80 dark:border-white/10"
            >
              <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div className="hidden md:block text-left whitespace-nowrap">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                  {user?.name || "User"}
                </p>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5 block">
                  {user?.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#131E36] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl py-2 z-50 animate-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-white/5 space-y-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                  <div className="pt-1">
                    <Badge status={user?.role}>{user?.role}</Badge>
                  </div>
                </div>

                <div className="p-1">
                  <a
                    href="/profile"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </a>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Search Modal */}
      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;