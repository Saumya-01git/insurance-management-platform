import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, UserCheck, Shield, Key } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const DEMO_ACCOUNTS = {
  ADMIN: { email: "saumya@admin.com", pass: "SaumyaPass2026!", name: "Saumya", label: "Admin Suite" },
  AGENT: { email: "sonam@agent.com", pass: "SonamPass2026!", name: "Sonam", label: "Agent Suite" },
  CUSTOMER: { email: "naira@gmail.com", pass: "NairaPass2026!", name: "Naira", label: "Customer Portal" },
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("ADMIN");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: DEMO_ACCOUNTS.ADMIN.email,
      password: DEMO_ACCOUNTS.ADMIN.pass,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await login(data.email, data.password, selectedRole);
      const loggedUser = res?.user;
      const role = (loggedUser?.role || selectedRole || "ADMIN").toUpperCase();

      toast.success(`Authenticated! Welcome back ${loggedUser?.name || "User"} (${role}).`, { icon: "🔐" });

      if (role === "CUSTOMER") {
        navigate("/customer-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err?.message || "Invalid credentials or unauthorized role access.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSelect = (roleKey) => {
    setSelectedRole(roleKey);
    const demo = DEMO_ACCOUNTS[roleKey];
    if (demo) {
      setValue("email", demo.email);
      setValue("password", demo.pass);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0C1424] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-blue-950/10 border border-slate-200/80 dark:border-white/10 space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 text-[#2563EB] dark:text-blue-400 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Carrier Workspace Sign In</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Welcome back
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Sign in with authorized enterprise credentials to access your portal.
        </p>
      </div>

      {/* Role Portal Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200">
          Select Targeted Portal:
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: "ADMIN", label: "Admin Suite", icon: Shield },
            { id: "AGENT", label: "Agent Suite", icon: UserCheck },
            { id: "CUSTOMER", label: "Customer", icon: ShieldCheck },
          ].map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleDemoSelect(role.id)}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-600/30 scale-[1.02]"
                    : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Demo Preset Credentials Helper */}
      <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 space-y-2 text-xs">
        <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
          <span className="flex items-center gap-1.5">
            <Key className="w-4 h-4 text-[#2563EB]" />
            <span>Default Demo Credentials (1-Click):</span>
          </span>
          <span className="font-mono text-[10px] text-[#2563EB] underline font-extrabold uppercase">
            RBAC Secure
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
          <div
            onClick={() => handleDemoSelect("ADMIN")}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-400 transition-all space-y-0.5"
          >
            <p className="font-black text-[#2563EB]">ADMIN: Saumya</p>
            <p className="font-mono text-slate-600 dark:text-slate-300 text-[10px]">saumya@admin.com</p>
            <p className="font-mono text-slate-400 text-[9px]">pass: SaumyaPass2026!</p>
          </div>

          <div
            onClick={() => handleDemoSelect("AGENT")}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-400 transition-all space-y-0.5"
          >
            <p className="font-black text-cyan-600">AGENT: Sonam</p>
            <p className="font-mono text-slate-600 dark:text-slate-300 text-[10px]">sonam@agent.com</p>
            <p className="font-mono text-slate-400 text-[9px]">pass: SonamPass2026!</p>
          </div>

          <div
            onClick={() => handleDemoSelect("CUSTOMER")}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-400 transition-all space-y-0.5"
          >
            <p className="font-black text-emerald-600">CUSTOMER: Naira</p>
            <p className="font-mono text-slate-600 dark:text-slate-300 text-[10px]">naira@gmail.com</p>
            <p className="font-mono text-slate-400 text-[9px]">pass: NairaPass2026!</p>
          </div>
        </div>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Work / Account Email *"
          type="email"
          icon={Mail}
          placeholder="e.g. saumya@admin.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email address is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
        />

        <Input
          label="Password *"
          type={showPassword ? "text" : "password"}
          icon={Lock}
          placeholder="••••••••••••"
          error={errors.password?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />

        {/* Options Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
            />
            <span>Remember me</span>
          </label>
        </div>

        {/* Gradient CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 text-sm font-extrabold rounded-2xl text-white bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#0284C7] hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-600/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Sign In as {selectedRole}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Footer Registration Link */}
      <div className="pt-2 text-center space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-[#2563EB] hover:underline font-extrabold">
            Sign Up
          </Link>
        </p>

        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200/60 dark:border-blue-800/40">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>Hosted on InsurePulse Enterprise Cloud</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
