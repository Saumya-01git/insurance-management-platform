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
  Sparkles,
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
        return location.pathname === "/customer-dashboard" && (currentSearch === "" || currentSearch === "?tab=dashboard");
      }
      const itemQuery = itemPath.replace("/customer-dashboard", "");
      return location.pathname === "/customer-dashboard" && currentSearch === itemQuery;
    }
    return location.pathname === itemPath;
  };

  const sidebarWidth = isCollapsed ? "84px" : "272px";

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Fixed Left Sidebar - Modern High-Tech Sans-Serif Typography & 3/4th Height Even Spacing */}
      <aside
        style={{ width: sidebarWidth }}
        className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out border-r border-purple-500/20 bg-gradient-to-b from-[#0B091F] via-[#120D30] to-[#080617] text-slate-100 flex flex-col justify-between shadow-2xl shadow-purple-950/70 backdrop-blur-xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-purple-500/20 shrink-0 w-full bg-[#0B091F]/80">
          <div className="flex items-center gap-3.5 overflow-hidden">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-purple-600/40 ring-2 ring-purple-400/30">
              <Shield className="w-6 h-6 fill-white/20" />
            </div>
            {!isCollapsed && (
              <div className="whitespace-nowrap overflow-hidden leading-tight">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-black text-white tracking-tight text-xl bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
                    InsurePulse
                  </h1>
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-purple-300 font-extrabold tracking-widest uppercase">
                  {userRole === "CUSTOMER" ? "Customer Portal" : "Carrier Suite"}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-xl text-purple-300 hover:text-white hover:bg-purple-900/40 border border-purple-500/10 hover:border-purple-500/30 transition-all cursor-pointer shrink-0"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation List - High-Tech Sans-Serif & Spreads Evenly Across 3/4th Height */}
        <div className="flex-1 px-4 py-8 flex flex-col justify-evenly w-full overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900/40">
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
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 group w-full text-slate-200 hover:text-white hover:bg-purple-900/30 border border-transparent hover:border-purple-500/30 cursor-pointer ${
                    isCollapsed ? "justify-center px-0" : ""
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="w-6 h-6 shrink-0 text-purple-400 group-hover:scale-110 transition-transform" />
                  {!isCollapsed && (
                    <span className="font-extrabold text-[15px] tracking-wide truncate">
                      {item.name}
                    </span>
                  )}
                </button>
              );
            }

            const active = isItemActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3.5 px-4 py-3.5 transition-all duration-200 group w-full ${
                  active
                    ? "bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-950/40 text-white shadow-md shadow-purple-950/60 border-l-4 border-purple-400 rounded-r-2xl rounded-l-md scale-[1.01]"
                    : "text-slate-200 hover:text-white hover:bg-purple-900/30 rounded-2xl border border-transparent hover:border-purple-500/20"
                } ${isCollapsed ? "justify-center px-0 border-l-0" : ""}`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon
                  className={`w-6 h-6 shrink-0 ${
                    active
                      ? "text-purple-300 drop-shadow-md"
                      : "text-slate-300 group-hover:text-purple-300 group-hover:scale-110 transition-transform"
                  }`}
                />
                {!isCollapsed && (
                  <span className={`text-[15px] tracking-wide truncate ${active ? "font-black text-white" : "font-extrabold text-slate-200"}`}>
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Support & Logout */}
        <div className="p-4 space-y-3.5 shrink-0 w-full border-t border-purple-500/20 bg-[#080617]/90">
          {!isCollapsed ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#181342] to-[#110D30] border border-purple-500/30 text-white space-y-2.5 shadow-lg shadow-purple-950/50">
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-4.5 h-4.5 text-purple-400" />
                <p className="text-xs font-black text-white">Need Support?</p>
              </div>
              <p className="text-[11px] text-purple-200/80 font-medium">Carrier assistance 24/7</p>
              <button
                onClick={() => openSupportDesk(userRole === "CUSTOMER" ? "raise" : "tickets")}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl text-xs font-black text-white transition-all cursor-pointer text-center shadow-md shadow-purple-900/50 border border-purple-400/20 hover:scale-[1.01]"
              >
                Contact Support
              </button>
            </div>
          ) : (
            <button
              onClick={() => openSupportDesk(userRole === "CUSTOMER" ? "raise" : "tickets")}
              className="w-full flex items-center justify-center p-3 rounded-2xl bg-[#181342] border border-purple-500/30 text-purple-300 hover:bg-purple-800/40 transition-colors cursor-pointer"
              title="Need Support? Contact Carrier Desk"
            >
              <LifeBuoy className="w-6 h-6" />
            </button>
          )}

          <button
            onClick={logout}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] font-black text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
            title="Logout"
          >
            <LogOut className="w-5.5 h-5.5 shrink-0 text-rose-400" />
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