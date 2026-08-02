import { Eye, Download, Trash2 } from "lucide-react";
import { getFileIcon, getDocumentStatusBadge, formatFileSize } from "../../utils/documentHelpers";
import { downloadDocumentFile } from "../../utils/exportHelpers";
import { toast } from "react-hot-toast";

const DocumentTable = ({ documents, onPreview, onDelete }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          📁
        </div>
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Documents Found</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No files match your search criteria or category filter in the encrypted vault.
        </p>
      </div>
    );
  }

  const handleDownload = (doc) => {
    downloadDocumentFile(doc);
    toast.success(`Vault document ${doc.title} downloaded!`);
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0C1424] shadow-sm">
      <table className="w-full text-left border-collapse min-w-[1050px]">
        <thead>
          <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <th className="py-4.5 px-6 min-w-[130px]">Document ID</th>
            <th className="py-4.5 px-6 min-w-[240px]">Document Name</th>
            <th className="py-4.5 px-6 min-w-[170px]">Category</th>
            <th className="py-4.5 px-6 min-w-[180px]">Associated Customer</th>
            <th className="py-4.5 px-6 min-w-[110px]">File Size</th>
            <th className="py-4.5 px-6 min-w-[130px]">Upload Date</th>
            <th className="py-4.5 px-6 min-w-[130px]">Status</th>
            <th className="py-4.5 px-6 text-right min-w-[130px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm font-semibold">
          {documents.map((doc) => {
            const Icon = getFileIcon(doc.fileType || doc.title);
            const badge = getDocumentStatusBadge(doc.status);
            const customerName = typeof doc.customer === "object" ? (doc.customer?.fullName || "Carrier Customer") : (doc.customer || "Carrier Customer");

            return (
              <tr key={doc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-5 px-6 font-mono font-extrabold text-[#2563EB] dark:text-cyan-400 whitespace-nowrap text-xs sm:text-sm">
                  {doc.documentId || doc.id}
                </td>

                <td className="py-5 px-6 font-black text-slate-900 dark:text-white whitespace-nowrap text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4.5 h-4.5 text-purple-500 shrink-0" />
                    <span className="hover:text-[#2563EB] cursor-pointer truncate max-w-xs" onClick={() => onPreview(doc)}>
                      {doc.title}
                    </span>
                  </div>
                </td>

                <td className="py-5 px-6 text-slate-700 dark:text-slate-200 font-bold whitespace-nowrap text-xs sm:text-sm">
                  {doc.category}
                </td>

                <td className="py-5 px-6 font-black text-slate-900 dark:text-white whitespace-nowrap text-xs sm:text-sm">
                  {customerName}
                </td>

                <td className="py-5 px-6 text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-xs sm:text-sm">
                  {formatFileSize(doc.fileSize)}
                </td>

                <td className="py-5 px-6 text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-xs sm:text-sm">
                  {doc.uploadDate}
                </td>

                <td className="py-5 px-6 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.label}
                  </span>
                </td>

                <td className="py-5 px-6 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onPreview(doc)}
                      className="p-2 rounded-xl text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                      title="Preview Document"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>

                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
                      title="Download Encrypted File"
                    >
                      <Download className="w-4.5 h-4.5" />
                    </button>

                    <button
                      onClick={() => onDelete(doc)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Delete Document"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
