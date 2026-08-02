import { useState } from "react";
import { UploadCloud, CheckCircle2, Lock } from "lucide-react";
import { formatFileSize } from "../../utils/documentHelpers";

const DocumentUploader = ({ onFileSelected, isUploading, uploadProgress = 0 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (onFileSelected) onFileSelected(file);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (onFileSelected) onFileSelected(file);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative p-8 rounded-3xl border-2 border-dashed transition-all duration-200 text-center flex flex-col items-center justify-center space-y-3 cursor-pointer ${
          dragActive
            ? "border-[#2563EB] bg-blue-50/50 dark:bg-blue-950/30 scale-[1.01]"
            : "border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-[#2563EB]/50"
        }`}
      >
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
        />

        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-cyan-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shadow-sm">
          <UploadCloud className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
            {selectedFile ? selectedFile.name : "Drag & drop files or click to upload"}
          </h4>
          <p className="text-xs text-slate-400">
            {selectedFile
              ? `Size: ${formatFileSize(selectedFile.size)} - Ready for Encryption`
              : "Supports PDF, PNG, JPG, DOCX (Max 25 MB)"}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 pt-1">
          <Lock className="w-3.5 h-3.5" /> AES-256 Bit Encrypted Storage Vault
        </div>
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] animate-spin" /> Uploading & Encrypting...
            </span>
            <span className="text-[#2563EB] dark:text-cyan-400 font-mono">{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] transition-all duration-300 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
