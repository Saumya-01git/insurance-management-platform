import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileSettings from "../../components/settings/ProfileSettings";
import CompanySettings from "../../components/settings/CompanySettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import PasswordSettings from "../../components/settings/PasswordSettings";
import ThemeSettings from "../../components/settings/ThemeSettings";
import SystemInformation from "../../components/settings/SystemInformation";

import { User, Building2, Bell, Lock, Palette, Server } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "company", label: "Company Info", icon: Building2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "password", label: "Security & Password", icon: Lock },
    { id: "theme", label: "Theme Preferences", icon: Palette },
    { id: "system", label: "System Information", icon: Server },
  ];

  return (
    <div className="animate-in fade-in duration-300 pb-10 max-w-7xl mx-auto">
      {/* Top Header - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }} className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-3">
          <Link to="/dashboard" className="hover:text-[#2563EB] cursor-pointer transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white">Settings</span>
        </nav>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Carrier Platform Settings
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mt-1">
            Configure underwriter accounts, corporate company profile, multi-factor security, and system parameters
          </p>
        </div>
      </div>

      {/* Main Settings Layout Grid - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }} className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Navigation Sidebar Tabs */}
        <div className="lg:col-span-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full p-4 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-3.5 text-left ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/30 scale-[1.01]"
                    : "bg-white dark:bg-[#0C1424] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-white/10"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "company" && <CompanySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "password" && <PasswordSettings />}
          {activeTab === "theme" && <ThemeSettings />}
          {activeTab === "system" && <SystemInformation />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
