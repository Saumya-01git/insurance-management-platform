import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      toast.success("Welcome back! Carrier session initialized.");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === "ADMIN") {
      setValue("email", "admin@insurepulse.com");
      setValue("password", "admin123");
    } else if (role === "AGENT") {
      setValue("email", "agent@insurepulse.com");
      setValue("password", "agent123");
    } else {
      setValue("email", "customer@insurepulse.com");
      setValue("password", "customer123");
    }
  };

  return (
    <div className="bg-white dark:bg-[#0C1424] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-blue-950/10 border border-slate-200/80 dark:border-white/10 space-y-7 animate-in fade-in duration-300">
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
          Sign in to access your carrier workspace and policy dashboard.
        </p>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Work Email *"
          type="email"
          icon={Mail}
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
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
              message: "Password must be at least 6 characters",
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

          <a
            href="#forgot"
            onClick={(e) => {
              e.preventDefault();
              toast("Demo Mode: Password reset is managed by System Administrator.", { icon: "🔒" });
            }}
            className="text-[#2563EB] hover:underline font-bold"
          >
            Forgot password?
          </a>
        </div>

        {/* Gradient CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 text-sm font-extrabold rounded-2xl text-white bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#0284C7] hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-600/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Sign In to Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Quick Demo Credentials Presets Bar */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">
          Quick Demo Credentials
        </p>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleDemoLogin("ADMIN")}
            className="h-11 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer text-center"
          >
            Admin Demo
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("AGENT")}
            className="h-11 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer text-center"
          >
            Agent Demo
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("CUSTOMER")}
            className="h-11 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer text-center"
          >
            Customer
          </button>
        </div>
      </div>

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
