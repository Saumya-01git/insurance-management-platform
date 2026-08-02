import { ServerCrash, RefreshCw, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ServerErrorPage = ({ resetErrorBoundary }) => {
  const handleReload = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-white animate-in fade-in duration-300">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-[#0C1424] border border-white/10 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/10">
          <ServerCrash className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest">
            ERROR 500 • INTERNAL SERVER FAULT
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Unexpected System Exception
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            The carrier underwriting engine encountered an unexpected internal error. Our automated diagnostics log has recorded this incident for review.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handleReload}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Session</span>
          </button>

          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;
