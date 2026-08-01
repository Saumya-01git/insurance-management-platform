import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  FileText,
  CreditCard,
  FolderOpen,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Sidebar = ({ isCollapsed, toggleSidebar, isMobileOpen, closeMobileSidebar }) => {
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Customers", path: "/customers", icon: Users },
    { name: "Policies", path: "/policies", icon: ShieldCheck },
    { name: "Claims", path: "/claims", icon: FileText },
    { name: "Payments", path: "/payments", icon: CreditCard },
    { name: "Documents", path: "/documents", icon: FolderOpen },
    { name: "Reports", path: "/reports", icon: BarChart3 },
    { name: "Settings", path: "/profile", icon: Settings },
  ];

  const sidebarWidth = isCollapsed ? "80px" : "256px";

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Fixed Left Sidebar (Matching Reference Image 100%) */}
      <aside
        style={{ width: sidebarWidth }}
        className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out border-r border-slate-800/80 bg-[#050D1E] text-slate-200 flex flex-col justify-between shadow-2xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header (Matching Reference Image!) */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-slate-800/60 shrink-0 w-full">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-blue-500/30">
              <Shield className="w-5.5 h-5.5 fill-white/20" />
            </div>
            {!isCollapsed && (
              <div className="whitespace-nowrap overflow-hidden leading-tight">
                <h1 className="font-bold text-white tracking-tight text-lg">
                  InsurePulse
                </h1>
                <p className="text-xs text-blue-300 font-medium">
                  Carrier Suite
                </p>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List (Matching Reference Image!) */}
        <div className="flex-1 px-3.5 py-6 space-y-2 overflow-y-auto w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 group w-full ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/30 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  } ${isCollapsed ? "justify-center px-0" : ""}`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Help Card Widget & Logout Button (Matching Reference Image 100%!) */}
        <div className="p-3.5 space-y-3 shrink-0 w-full border-t border-slate-800/60">
          {!isCollapsed && (
            <div className="p-4 rounded-2xl bg-[#091834] border border-blue-500/20 text-white space-y-2 shadow-inner">
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-blue-400" />
                <p className="text-xs font-bold text-white">Need Help?</p>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Contact our support team</p>
              <button
                onClick={() => toast.success("Support request sent. Carrier specialist notified.", { icon: "🎧" })}
                className="w-full py-2 bg-[#142950] hover:bg-[#2563EB] rounded-xl text-xs font-bold text-white transition-colors cursor-pointer text-center"
              >
                Contact Support
              </button>
            </div>
          )}

          {/* Logout Button (Matching Reference Image!) */}
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-300 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
            title="Logout"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;