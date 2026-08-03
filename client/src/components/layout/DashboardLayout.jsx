import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ScrollToTop from "../common/ScrollToTop";

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

      {/* Main Content Area: 100% Width with Slight Space & Separation Gap from Sidebar */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isSidebarCollapsed ? "84px" : "268px",
        }}
      >
        <Navbar toggleMobileSidebar={toggleMobileSidebar} />

        {/* 100% Full-Width Content Container with Slight Padding & Space from Border */}
        <main className="flex-1 overflow-x-hidden min-w-0 p-5 sm:p-7 lg:p-9 space-y-8 w-full">
          <Outlet />
        </main>
      </div>

      {/* Floating Scroll To Top Arrow Button (Bottom Right) */}
      <ScrollToTop />
    </div>
  );
};

export default DashboardLayout;
