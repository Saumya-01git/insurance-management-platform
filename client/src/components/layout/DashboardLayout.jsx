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
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#080617] font-sans text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-purple-600 selection:text-white">
      {/* Fixed Left Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={isMobileSidebarOpen}
        closeMobileSidebar={closeMobileSidebar}
      />

      {/* Main Content Area: Offset with a Distinct 20px Breathing Gap from Sidebar */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isSidebarCollapsed ? "96px" : "288px",
        }}
      >
        <Navbar toggleMobileSidebar={toggleMobileSidebar} />

        {/* Full Content Container with Generous Breathing Gap */}
        <main className="flex-1 overflow-x-hidden min-w-0 p-6 sm:p-8 lg:p-10 pr-6 sm:pr-8 lg:pr-10 space-y-8 w-full">
          <Outlet />
        </main>
      </div>

      {/* Floating Scroll To Top Arrow Button (Bottom Right) */}
      <ScrollToTop />
    </div>
  );
};

export default DashboardLayout;
