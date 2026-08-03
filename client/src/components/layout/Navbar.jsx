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
  Sparkles,
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
    { title: "New Claim Filed", desc: "Policy #POL-891230 filed $4,500 claim", time: "5m ago", icon: AlertCircle, color: "text-amber-400" },
    { title: "Payment Settled", desc: "Premium installment of $1,200 received", time: "1h ago", icon: CheckCircle2, color: "text-emerald-400" },
    { title: "KYC Verified", desc: "Customer Sarah Jenkins uploaded ID proof", time: "3h ago", icon: Shield, color: "text-purple-400" },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 h-18 bg-slate-100/90 dark:bg-[#0D0B26]/85 backdrop-blur-xl border-b border-slate-200/90 dark:border-purple-500/20 px-4 sm:px-8 flex items-center justify-between transition-all w-full shadow-md dark:shadow-purple-950/30">
        {/* Left Mobile Menu & Global Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden p-2.5 rounded-xl text-slate-500 dark:text-purple-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-purple-900/40 transition-colors cursor-pointer"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>

          {/* Upper Global Command Search Bar */}
          <div
            onClick={() => setIsGlobalSearchOpen(true)}
            className="relative w-full hidden sm:block cursor-pointer group"
          >
            <Search className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 pointer-events-none z-10 transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Global Search (⌘K): Search customers, policies, claims, documents..."
              style={{ paddingLeft: "52px" }}
              className="w-full h-11 pr-14 text-xs sm:text-sm font-bold rounded-full bg-white/90 dark:bg-[#16123D]/90 border border-slate-200/90 dark:border-purple-500/30 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-purple-300/60 group-hover:border-purple-500 dark:group-hover:border-purple-400 transition-all cursor-pointer shadow-sm group-hover:shadow-purple-500/10"
            />
            <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2.5 py-0.5 text-[10px] font-black text-slate-500 dark:text-purple-300 bg-slate-100 dark:bg-purple-950/60 rounded-full border border-slate-300/60 dark:border-purple-500/40">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-4 pr-1">
          {/* Quick Action Button */}
          <a
            href="/policies"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs sm:text-sm font-black shadow-md shadow-purple-900/40 hover:shadow-purple-600/50 border border-purple-400/30 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Policy</span>
          </a>

          {/* Theme Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-2xl text-slate-500 hover:text-slate-900 dark:text-purple-300 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-purple-900/40 border border-transparent dark:hover:border-purple-500/30 transition-all cursor-pointer"
            title={darkMode ? "Light Theme" : "Dark Theme"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 drop-shadow-sm" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600 drop-shadow-sm" />
            )}
          </button>

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotificationOpen((p) => !p)}
              className="p-2.5 rounded-2xl text-slate-500 hover:text-slate-900 dark:text-purple-300 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-purple-900/40 border border-transparent dark:hover:border-purple-500/30 transition-all cursor-pointer relative"
            >
              <Bell className="w-5 h-5" />
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 absolute top-2 right-2 animate-pulse ring-2 ring-white dark:ring-purple-950" />
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#16123D] rounded-3xl border border-slate-200 dark:border-purple-500/30 shadow-2xl p-4.5 z-50 animate-in zoom-in-95 duration-150 space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-purple-500/20">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      Platform Activity
                    </h4>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="text-[10px] text-purple-600 dark:text-purple-300 font-extrabold bg-purple-50 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-400/20">
                    Real-time
                  </span>
                </div>
                <div className="space-y-2.5">
                  {notifications.map((n, idx) => {
                    const Icon = n.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-purple-900/30 transition-colors border border-transparent hover:border-purple-500/20">
                        <Icon className={`w-4.5 h-4.5 mt-0.5 shrink-0 ${n.color}`} />
                        <div className="text-xs space-y-0.5">
                          <p className="font-bold text-slate-800 dark:text-slate-100">{n.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-300">{n.desc}</p>
                          <span className="text-[10px] text-slate-400 dark:text-purple-300/60 block pt-0.5 font-medium">{n.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu - Sleek Compact w-56 Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2.5 p-1.5 px-3 rounded-full hover:bg-slate-200 dark:hover:bg-purple-900/40 transition-all cursor-pointer border border-slate-300/80 dark:border-purple-500/30 bg-white/50 dark:bg-purple-950/40"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-xs shadow-md shadow-purple-900/40 ring-2 ring-purple-400/30 shrink-0">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div className="hidden md:block text-left whitespace-nowrap">
                <p className="text-xs font-black text-slate-900 dark:text-white leading-none">
                  {user?.name || "User"}
                </p>
                <span className="text-[10px] text-purple-600 dark:text-purple-300 font-extrabold mt-0.5 block uppercase tracking-wider">
                  {user?.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-purple-300 hidden sm:block" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#16123D] rounded-2xl border border-slate-200 dark:border-purple-500/30 shadow-2xl py-2 z-50 animate-in zoom-in-95 duration-150">
                {/* Compact User Header */}
                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-purple-500/20 space-y-1">
                  <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                    {user?.name || "Carrier User"}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-purple-300/80 truncate">
                    {user?.email || "user@insurepulse.com"}
                  </p>
                  <div className="pt-1">
                    <Badge status={user?.role}>{user?.role}</Badge>
                  </div>
                </div>

                {/* Compact Menu Actions */}
                <div className="p-1 space-y-0.5">
                  <a
                    href="/profile"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-purple-900/40 transition-colors"
                  >
                    <User className="w-4 h-4 text-purple-400" />
                    <span>My Profile</span>
                  </a>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-extrabold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
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