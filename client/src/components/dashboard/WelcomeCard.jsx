import { useAuth } from "../../context/AuthContext";
import { Sparkles, Calendar, ShieldCheck } from "lucide-react";

const WelcomeCard = () => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#140F38] via-[#211756] to-[#110D30] p-6 sm:p-8 text-white shadow-2xl shadow-purple-950/50 border border-purple-500/30">
      {/* Background Glowing Ambient Light Elements */}
      <div className="absolute -right-20 -top-20 w-88 h-88 rounded-full bg-purple-500/25 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-88 h-88 rounded-full bg-indigo-600/25 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3.5 max-w-xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/25 border border-purple-400/40 text-purple-200 text-xs font-black shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
              <span>Carrier Suite v2.4</span>
            </span>
            <span className="text-xs text-purple-200/80 font-bold flex items-center gap-1.5 bg-purple-950/40 px-3 py-1 rounded-full border border-purple-500/20">
              <Calendar className="w-3.5 h-3.5 text-purple-300" />
              {currentDate}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-white via-purple-100 to-indigo-300 bg-clip-text text-transparent">{user?.name || "Carrier Administrator"}</span> 👋
          </h2>

          <p className="text-xs sm:text-sm text-purple-100/90 font-medium leading-relaxed">
            All insurance REST systems are operational. Underwrite policies, verify customer claims, and audit premium payments across your enterprise.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="p-4 rounded-2xl bg-purple-950/50 backdrop-blur-xl border border-purple-400/30 text-center sm:text-left space-y-1 shadow-lg shadow-purple-950/40">
            <div className="flex items-center gap-1.5 text-xs text-purple-300 font-bold justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-purple-300" />
              <span>Authenticated Role</span>
            </div>
            <p className="text-sm font-black text-white uppercase tracking-widest">
              {user?.role || "ADMINISTRATOR"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
