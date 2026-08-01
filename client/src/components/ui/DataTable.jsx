import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import Input from "./Input";

const DataTable = ({
  columns = [],
  data = [],
  searchable = true,
  searchPlaceholder = "Search records...",
  pageSize = 8,
  emptyTitle = "No records found",
  emptySubtitle = "Try adjusting your search criteria or add new entries.",
  actionButton = null,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((item) =>
      columns.some((col) => {
        if (!col.accessorKey) return false;
        const val = item[col.accessorKey];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(term);
      })
    );
  }, [data, searchTerm, columns]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="bg-white dark:bg-[#101828] border border-slate-200/90 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden space-y-4 p-6">
      {(searchable || actionButton) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
          {searchable ? (
            <div className="w-full sm:w-80">
              <Input
                icon={Search}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          ) : (
            <div />
          )}
          {actionButton && <div className="w-full sm:w-auto flex items-center gap-2">{actionButton}</div>}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-white/5">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200/80 dark:border-white/10 uppercase tracking-wider text-[11px]">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-4 py-3.5 ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-200 font-medium">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`px-4 py-4 ${col.className || ""}`}>
                      {col.cell ? col.cell(row) : row[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                      <Inbox className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {emptyTitle}
                      </p>
                      <p className="text-xs text-slate-400 max-w-sm">
                        {emptySubtitle}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div>
            Showing <span className="font-semibold text-slate-800 dark:text-white">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-semibold text-slate-800 dark:text-white">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </span>{" "}
            of <span className="font-semibold text-slate-800 dark:text-white">{filteredData.length}</span> results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-semibold text-slate-800 dark:text-slate-200">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
