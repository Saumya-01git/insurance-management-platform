import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Headphones,
} from "lucide-react";
import SupportModal from "../common/SupportModal";

const Sidebar = ({ isCollapsed, toggleSidebar, isMobileOpen, closeMobileSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const userRole = (user?.role || "ADMIN").toUpperCase();

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [initialSupportTab, setInitialSupportTab] = useState("raise");

  const openSupportDesk = (tab = "raise") => {
    setInitialSupportTab(tab);
    setIsSupportModalOpen(true);
  };

  let navItems = [];

  if (userRole === "CUSTOMER") {
    navItems = [
      { name: "My Dashboard", path: "/customer-dashboard", icon: LayoutDashboard },
      { name: "My Policies", path: "/customer-dashboard?tab=policies", icon: ShieldCheck },
      { name: "My Claims", path: "/customer-dashboard?tab=claims", icon: FileText },
      { name: "My Payments", path: "/customer-dashboard?tab=payments", icon: CreditCard },
      { name: "My Documents", path: "/customer-dashboard?tab=documents", icon: FolderOpen },
      { name: "Support Desk", isAction: true, onClick: () => openSupportDesk("tickets"), icon: Headphones },
      { name: "Profile", path: "/profile", icon: Settings },
    ];
  } else if (userRole === "AGENT") {
    navItems = [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Customers", path: "/customers", icon: Users },
      { name: "Policies", path: "/policies", icon: ShieldCheck },
      { name: "Claims", path: "/claims", icon: FileText },
      { name: "Payments", path: "/payments", icon: CreditCard },
      { name: "Documents", path: "/documents", icon: FolderOpen },
      { name: "Reports", path: "/reports", icon: BarChart3 },
      { name: "Support Tickets", isAction: true, onClick: () => openSupportDesk("tickets"), icon: Headphones },
    ];
  } else {
    // ADMIN (All access)
    navItems = [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Customers", path: "/customers", icon: Users },
      { name: "Policies", path: "/policies", icon: ShieldCheck },
      { name: "Claims", path: "/claims", icon: FileText },
      { name: "Payments", path: "/payments", icon: CreditCard },
      { name: "Documents", path: "/documents", icon: FolderOpen },
      { name: "Reports", path: "/reports", icon: BarChart3 },
      { name: "Support Tickets", isAction: true, onClick: () => openSupportDesk("tickets"), icon: Headphones },
      { name: "Settings", path: "/settings", icon: Settings },
    ];
  }

  const isItemActive = (itemPath) => {
    if (!itemPath) return false;
    if (userRole === "CUSTOMER" && itemPath.startsWith("/customer-dashboard")) {
      const currentSearch = location.search || "";
      if (itemPath === "/customer-dashboard") {
        // "My Dashboard" is ONLY active if no tab param or tab=dashboard
        return location.pathname === "/customer-dashboard" && (currentSearch === "" || currentSearch === "?tab=dashboard");
      }
      const itemQuery = itemPath.replace("/customer-dashboard", "");
      return location.pathname === "/customer-dashboard" && currentSearch === itemQuery;
    }
    return location.pathname === itemPath;
  };

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

      {/* Fixed Left Sidebar - Executive Navy Theme */}
      <aside
        style={{ width: sidebarWidth }}
        className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out border-r border-slate-700/50 bg-gradient-to-b from-[#0B192E] via-[#0F2744] to-[#0A172A] text-slate-200 flex flex-col justify-between shadow-2xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-slate-700/50 shrink-0 w-full bg-[#0B192E]/60">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1D4ED8] to-[#2563EB] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-blue-600/40">
              <Shield className="w-5.5 h-5.5 fill-white/20" />
            </div>
            {!isCollapsed && (
              <div className="whitespace-nowrap overflow-hidden leading-tight">
                <h1 className="font-black text-white tracking-tight text-lg">
                  InsurePulse
                </h1>
                <p className="text-[11px] text-cyan-400 font-bold tracking-wider uppercase">
                  {userRole === "CUSTOMER" ? "Customer Portal" : "Carrier Suite"}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto w-full">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            if (item.isAction) {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    closeMobileSidebar();
                    item.onClick();
                  }}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-xs tracking-wide transition-all duration-200 group w-full text-slate-300 hover:text-white hover:bg-[#1E293B]/70 cursor-pointer ${
                    isCollapsed ? "justify-center px-0" : ""
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0 text-cyan-400" />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </button>
              );
            }

            const active = isItemActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs tracking-wide transition-all duration-200 group w-full ${
                  active
                    ? "bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white shadow-lg shadow-blue-950/60 font-extrabold scale-[1.01]"
                    : "text-slate-300 font-semibold hover:text-white hover:bg-[#1E293B]/70"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? "text-cyan-300" : "text-slate-400 group-hover:text-white"}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* Bottom Support & Logout */}
        <div className="p-4 space-y-3 shrink-0 w-full border-t border-slate-700/50 bg-[#091526]/80">
          {!isCollapsed ? (
            <div className="p-4 rounded-2xl bg-[#0F2444] border border-cyan-500/20 text-white space-y-2 shadow-inner">
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-cyan-400" />
                <p className="text-xs font-black text-white">Need Support?</p>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Carrier assistance 24/7</p>
              <button
                onClick={() => openSupportDesk(userRole === "CUSTOMER" ? "raise" : "tickets")}
                className="w-full py-2 bg-[#1E3A8A] hover:bg-[#2563EB] rounded-xl text-xs font-bold text-white transition-colors cursor-pointer text-center shadow-sm"
              >
                Contact Support
              </button>
            </div>
          ) : (
            <button
              onClick={() => openSupportDesk(userRole === "CUSTOMER" ? "raise" : "tickets")}
              className="w-full flex items-center justify-center p-2.5 rounded-2xl bg-[#0F2444] text-cyan-400 hover:bg-[#1E3A8A] transition-colors cursor-pointer"
              title="Need Support? Contact Carrier Desk"
            >
              <LifeBuoy className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold text-slate-300 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
            title="Logout"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0 text-rose-400" />
            {!isCollapsed && <span>Logout ({userRole})</span>}
          </button>
        </div>
      </aside>

      {/* Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        initialTab={initialSupportTab}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;