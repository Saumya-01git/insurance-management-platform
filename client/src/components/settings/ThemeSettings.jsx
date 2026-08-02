import { Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-hot-toast";

const ThemeSettings = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Palette className="w-5 h-5 text-cyan-500" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Workspace Design System & Contrast</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Light Mode Card */}
        <div
          onClick={() => {
            if (darkMode) toggleDarkMode();
            toast.success("Applied Enterprise Light Theme");
          }}
          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer space-y-3 ${
            !darkMode
              ? "border-[#2563EB] bg-blue-50/50 dark:bg-blue-950/20 shadow-md"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0C1424]"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            {!darkMode && <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white">ACTIVE</span>}
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Enterprise Light Workspace</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Clean white canvas with dark blue navigation sidebar.</p>
          </div>
        </div>

        {/* Dark Mode Card */}
        <div
          onClick={() => {
            if (!darkMode) toggleDarkMode();
            toast.success("Applied Deep Navy Carrier Theme");
          }}
          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer space-y-3 ${
            darkMode
              ? "border-[#2563EB] bg-blue-950/40 shadow-md"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0C1424]"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            {darkMode && <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white">ACTIVE</span>}
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Deep Navy Dark Carrier</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sleek high-contrast dark workspace for extended operations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
