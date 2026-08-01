import { Search } from "lucide-react";

const SearchBar = ({ placeholder = "Search policies, claims, customers...", onSearch }) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="w-full h-10 pl-10 pr-12 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all placeholder-slate-400"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-extrabold text-slate-500 dark:text-slate-300">
        <span>⌘K</span>
      </div>
    </div>
  );
};

export default SearchBar;
