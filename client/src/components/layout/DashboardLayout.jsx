import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0B132B] font-sans text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-[#2563EB] selection:text-white">
      {/* Fixed Left Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={isMobileSidebarOpen}
        closeMobileSidebar={closeMobileSidebar}
      />

      {/* Main Content Area: 100% Width */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isSidebarCollapsed ? "80px" : "256px",
        }}
      >
        <Navbar toggleMobileSidebar={toggleMobileSidebar} />

        {/* 100% Full-Width Content Container */}
        <main className="flex-1 overflow-x-hidden min-w-0 p-6 sm:p-8 lg:p-10 space-y-9 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
