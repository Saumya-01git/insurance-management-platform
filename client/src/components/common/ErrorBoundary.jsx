import React from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 m-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-xl text-center space-y-4 max-w-2xl mx-auto my-12 z-50 relative">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 flex items-center justify-center mx-auto shadow-sm">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Something went wrong loading this module
            </h3>
            <p className="text-xs text-rose-500 font-mono font-bold bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-900/30 text-left overflow-x-auto">
              {this.state.error?.toString() || "Unknown Error"}
            </p>
          </div>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reload Module</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
