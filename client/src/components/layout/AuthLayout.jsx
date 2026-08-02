import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ShieldCheck,
  Cpu,
  Lock,
  Shield,
  Zap,
  Activity,
  CheckCircle2,
} from "lucide-react";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full grid grid-cols-1 lg:grid-cols-12 bg-[#F8FAFC] dark:bg-[#060C17] font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Left Panel: Ultra-Premium Showcase (7 of 12 columns) */}
      <div className="lg:col-span-7 flex flex-col justify-between px-6 sm:px-10 lg:px-12 py-6 sm:py-8 lg:py-8 bg-gradient-to-br from-[#020712] via-[#081B36] to-[#0F2F59] text-white h-full relative overflow-hidden">
        {/* Ambient Background Radial Glows */}
        <div className="absolute -top-36 -left-36 w-[650px] h-[650px] rounded-full bg-[#2563EB]/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-36 -right-36 w-[650px] h-[650px] rounded-full bg-[#06B6D4]/20 blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center justify-between z-10 shrink-0 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] text-white flex items-center justify-center font-bold shadow-xl shadow-blue-500/35 border border-white/20 shrink-0">
              <Zap className="w-5.5 h-5.5 fill-white/20" />
            </div>
            <div>
              <h1 className="font-black text-xl lg:text-2xl text-white tracking-tight leading-none">
                InsurePulse <span className="text-[#38BDF8] font-black">Carrier Suite</span>
              </h1>
              <p className="text-[10px] text-slate-300 font-black tracking-widest uppercase mt-0.5">
                Enterprise Insurance Infrastructure
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-300 text-[11px] font-extrabold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Core Engine Online</span>
          </div>
        </div>

        {/* Hero Content Area */}
        <div className="my-auto space-y-5 z-10 w-full">
          {/* Headline & Subtitle Group */}
          <div className="space-y-3">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 backdrop-blur-md border border-blue-400/30 text-cyan-300 text-xs font-black shadow-sm">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Next-Gen Underwriting & Claims Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white tracking-tight leading-[1.12]">
              Enterprise Insurance Infrastructure. <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-[#38BDF8] bg-clip-text text-transparent">
                Policies, Claims & Risk Intelligence.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed w-full">
              Streamline policy underwriting, process loss claims, manage premium collections, and secure identity documents with your PostgreSQL + Express REST platform.
            </p>
          </div>

          {/* Full-Width Dashboard Preview Image Container */}
          <div className="relative w-full rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-[#071329]/90 backdrop-blur-md p-1.5 group hover:border-cyan-400/50 transition-all duration-300 my-3">
            <img
              src="/dashboard-preview.png"
              alt="InsurePulse Enterprise Dashboard"
              className="w-full h-[250px] sm:h-[290px] lg:h-[320px] object-cover object-left-top rounded-xl shadow-lg transform group-hover:scale-[1.01] transition-transform duration-300"
            />

            {/* Top Right Floating Glass Badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-2 shadow-xl z-10">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Live REST API Sync</span>
            </div>

            {/* Bottom Left Floating Glass Badge */}
            <div className="absolute bottom-4 left-4 px-3.5 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-white/20 text-white text-xs font-black flex items-center gap-2.5 shadow-2xl z-10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="leading-none text-white font-black text-[11px]">AES-256 Encrypted Vault</p>
                <p className="text-[9px] text-slate-400 font-semibold mt-0.5">KYC Identity Protection</p>
              </div>
            </div>
          </div>

          {/* 3 Real Enterprise Badges Across Full Width */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-0.5 w-full">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg hover:bg-white/15 transition-all space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-white tracking-tight">Role-Based RBAC</h4>
              <p className="text-[11px] text-slate-300 leading-snug font-medium">
                Granular security for Admins, Agents & Customers.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg hover:bg-white/15 transition-all space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-400/30">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-white tracking-tight">Express REST Sync</h4>
              <p className="text-[11px] text-slate-300 leading-snug font-medium">
                Live 1:1 Prisma backend REST integration.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg hover:bg-white/15 transition-all space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/30">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-white tracking-tight">Encrypted KYC Vault</h4>
              <p className="text-[11px] text-slate-300 leading-snug font-medium">
                AES-256 bit secure repository for identity proof.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="z-10 text-xs font-semibold text-slate-300 border-t border-white/10 pt-3 flex items-center justify-between shrink-0">
          <p>© {new Date().getFullYear()} InsurePulse Carrier Suite.</p>
          <div className="flex items-center gap-3 text-[11px] text-cyan-300 font-extrabold">
            <span>SOC2 Type II</span>
            <span>•</span>
            <span>ISO 27001</span>
            <span>•</span>
            <span className="text-emerald-400 font-black">Production Ready</span>
          </div>
        </div>
      </div>

      {/* Right Authentication Side (5 of 12 columns) - Elevated Floating 3D Card Ambient Container */}
      <div className="lg:col-span-5 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 bg-gradient-to-tr from-[#F1F5F9] via-[#F8FAFC] to-[#E2E8F0] dark:from-[#040812] dark:via-[#060C17] dark:to-[#0A1224] h-full overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          {/* Form Outlet */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
