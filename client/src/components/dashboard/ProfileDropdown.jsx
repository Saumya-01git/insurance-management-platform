import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Settings, LogOut, Shield, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center font-black shadow-md text-xs shrink-0">
          {user?.name ? user.name.substring(0, 2).toUpperCase() : "AU"}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight">
            {user?.name || "Carrier Admin"}
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {user?.role || "ADMIN"}
          </p>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-xl p-2 z-50 animate-in fade-in duration-150 space-y-1">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
              {user?.name || "Carrier Admin"}
            </p>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              {user?.email || "admin@insurepulse.com"}
            </p>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/profile");
            }}
            className="w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <User className="w-4 h-4 text-[#2563EB]" />
            <span>View Profile</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/profile");
            }}
            className="w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-cyan-500" />
            <span>Platform Settings</span>
          </button>

          <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
