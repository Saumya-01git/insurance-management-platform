import { Search, X } from "lucide-react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  placeholder = "Search records...",
  className = "",
}) => {
  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <Search className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        style={{ paddingLeft: "52px", paddingRight: "40px" }}
        className="w-full h-12 text-xs sm:text-sm font-semibold rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15 transition-all placeholder:text-slate-400"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-full cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
