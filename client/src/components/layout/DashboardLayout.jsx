import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  const leftPadding = isDesktop ? (isSidebarCollapsed ? "80px" : "256px") : "0px";

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070D19] font-sans text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-[#2563EB] selection:text-white">
      {/* Fixed Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={isMobileSidebarOpen}
        closeMobileSidebar={closeMobileSidebar}
      />

      {/* Main Content Area (Guaranteed exact padding-left to prevent hiding under sidebar!) */}
      <div
        style={{ paddingLeft: leftPadding }}
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
      >
        <Navbar toggleMobileSidebar={toggleMobileSidebar} />
        <main className="flex-1 overflow-x-hidden min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
