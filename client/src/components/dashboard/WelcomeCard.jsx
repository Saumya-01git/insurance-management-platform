import { useAuth } from "../../context/AuthContext";
import { Sparkles, Calendar, ShieldCheck, ArrowRight } from "lucide-react";

const WelcomeCard = () => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#081120] via-[#0E2343] to-[#123A6A] p-6 sm:p-8 text-white shadow-xl">
      {/* Background Glow Overlay */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Carrier Suite v2.4</span>
            </span>
            <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {currentDate}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">{user?.name || "Carrier Administrator"}</span> 👋
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            All insurance REST systems are operational. Underwrite policies, verify customer claims, and audit premium payments across your enterprise.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center sm:text-left space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-bold justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Authenticated Role</span>
            </div>
            <p className="text-sm font-extrabold text-white uppercase tracking-wider">
              {user?.role || "ADMINISTRATOR"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
