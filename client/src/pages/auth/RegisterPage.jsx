import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { Mail, Lock, User, Eye, EyeOff, UserPlus, ArrowRight, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "AGENT",
      organization: "SecureLife Insurance Co.",
    },
  });

  const onSubmit = async (data) => {
    if (!agreeTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    try {
      setIsLoading(true);
      await registerAuth(data);
      toast.success("Registration successful! Access granted.");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Email might already exist.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#101828] rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 dark:border-white/10 space-y-5 animate-in fade-in duration-300">
      {/* Header Tag (Exact Match to Screenshot 2!) */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 text-[#2563EB] dark:text-blue-400 text-xs font-bold">
          <UserPlus className="w-3.5 h-3.5" />
          <span>New Account</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Create Your Account
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Join thousands of insurance professionals who trust InsurePulse
        </p>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <Input
          label="Full Name *"
          icon={User}
          placeholder="Saumya Singh"
          error={errors.name?.message}
          {...register("name", { required: "Full name is required" })}
        />

        <Input
          label="Work Email *"
          type="email"
          icon={Mail}
          placeholder="saumya.singh@insurepulse.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email address",
            },
          })}
        />

        <Select
          label="Account Type *"
          options={[
            { value: "AGENT", label: "Insurance Agent" },
            { value: "ADMIN", label: "Administrator (Full Access)" },
            { value: "CUSTOMER", label: "Customer (Self-Service)" },
          ]}
          {...register("role", { required: "Role is required" })}
        />

        <Input
          label="Organization *"
          icon={Building}
          placeholder="SecureLife Insurance Co."
          {...register("organization")}
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

        {/* Terms Checkbox (Exact Match to Screenshot 2!) */}
        <div className="pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400 font-medium">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer shrink-0"
            />
            <span>
              I agree to the{" "}
              <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#2563EB] hover:underline font-bold">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-[#2563EB] hover:underline font-bold">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* CTA Button (Exact Gradient Match to Screenshot 2!) */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#2563EB] to-[#00A3FF] hover:from-blue-700 hover:to-sky-500 shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Footer Login Link */}
      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-1">
        Already have an account?{" "}
        <Link to="/login" className="text-[#2563EB] hover:underline font-bold">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
