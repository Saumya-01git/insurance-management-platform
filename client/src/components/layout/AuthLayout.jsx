import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Zap,
  ShieldCheck,
  Cpu,
  Lock,
  Users,
  Shield,
  Clock,
} from "lucide-react";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#F8FAFC] dark:bg-[#060C17] font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Left Panel: Clean Enterprise Showcase (50% Width) */}
      <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#081120] via-[#0E2343] to-[#123A6A] text-white min-h-screen relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#2563EB]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full bg-[#06B6D4]/15 blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center gap-3.5 z-10">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] text-white flex items-center justify-center font-bold shadow-xl shadow-blue-500/30 shrink-0">
            <Zap className="w-6 h-6 fill-white/20" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl lg:text-2xl text-white tracking-tight leading-none">
              InsurePulse <span className="text-[#38BDF8] font-semibold">Carrier Suite</span>
            </h1>
            <p className="text-[10px] text-slate-300 font-extrabold tracking-widest uppercase mt-1">
              ENTERPRISE INSURANCE PLATFORM
            </p>
          </div>
        </div>

        {/* Hero Content Area */}
        <div className="my-auto py-8 space-y-7 z-10 w-full max-w-xl">
          {/* Badge Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-extrabold shadow-sm">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Guidewire & Salesforce API Compatible</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Next-Gen Carrier Infrastructure. <br />
              <span className="bg-gradient-to-r from-white via-slate-100 to-[#38BDF8] bg-clip-text text-transparent">
                Policies, Claims & Underwriting.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Streamline insurance operations, automate KYC document verification, and accelerate policy underwriting with enterprise-grade REST APIs.
            </p>
          </div>

          {/* Dashboard Preview Image */}
          <div className="rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-[#0A1832]/90 backdrop-blur-md p-2 group hover:border-cyan-400/40 transition-all duration-300">
            <img
              src="/dashboard-preview.png"
              alt="InsurePulse Enterprise Dashboard"
              className="w-full h-auto rounded-xl lg:rounded-2xl object-cover shadow-lg transform group-hover:scale-[1.01] transition-transform duration-300"
            />
          </div>

          {/* 3 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg hover:bg-white/15 transition-all space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-xs font-bold text-white tracking-tight">Role-Based Access</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                Granular RBAC for Admins, Agents & Customers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg hover:bg-white/15 transition-all space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-400/30">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-xs font-bold text-white tracking-tight">Real-Time API Engine</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                Direct 1:1 REST sync for policies & claims.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg hover:bg-white/15 transition-all space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/30">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-xs font-bold text-white tracking-tight">Encrypted KYC Vault</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                Multer storage engine for identity proofs.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="z-10 text-xs font-semibold text-slate-300 border-t border-white/10 pt-6 flex items-center justify-between">
          <p>© {new Date().getFullYear()} InsurePulse Carrier Suite.</p>
          <span className="text-cyan-300 font-bold">Enterprise Edition</span>
        </div>
      </div>

      {/* Right Authentication Side (50% Width) */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-[#F8FAFC] dark:bg-[#060C17] min-h-screen">
        <div className="w-full max-w-lg space-y-6 my-auto">
          {/* 3 Individual Premium KPI Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm text-center space-y-1">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] flex items-center justify-center mx-auto mb-1">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white">10,500+</p>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Active Users</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm text-center space-y-1">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] flex items-center justify-center mx-auto mb-1">
                <Shield className="w-4 h-4" />
              </div>
              <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white">2.5M+</p>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Policies</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm text-center space-y-1">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] flex items-center justify-center mx-auto mb-1">
                <Clock className="w-4 h-4" />
              </div>
              <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white">99.98%</p>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Uptime</p>
            </div>
          </div>

          {/* Form Outlet */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
