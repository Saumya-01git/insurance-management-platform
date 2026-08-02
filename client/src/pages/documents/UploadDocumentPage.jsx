import { useState } from "react";
import { ArrowLeft, UploadCloud, Lock } from "lucide-react";
import DocumentUploader from "../../components/documents/DocumentUploader";
import { toast } from "react-hot-toast";

const UploadDocumentPage = ({ onCancel, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Identity / KYC",
    customer: "David Vance",
    customerId: "CUST-1049",
    policyNumber: "POL-9012",
    notes: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    if (!formData.title) {
      setFormData((prev) => ({ ...prev, title: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && !formData.title) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(25);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 95;
          }
          return prev + 25;
        });
      }, 250);

      setTimeout(async () => {
        clearInterval(interval);
        setUploadProgress(100);
        if (onSubmitSuccess) {
          await onSubmitSuccess({
            ...formData,
            file: selectedFile,
            fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : "3.5 MB",
            fileType: selectedFile?.type || "application/pdf",
          });
        } else {
          toast.success("Document uploaded & encrypted!");
          if (onCancel) onCancel();
        }
        setIsUploading(false);
      }, 1200);
    } catch (err) {
      toast.error("Upload failed.");
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="hover:text-[#2563EB] cursor-pointer" onClick={onCancel}>
              Documents
            </span>
            <span>/</span>
            <span className="font-bold text-slate-900 dark:text-white">Upload Vault Document</span>
          </nav>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
            Upload & Encrypt Policy File
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
        <DocumentUploader
          onFileSelected={handleFileSelected}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Document Display Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Passport_Identity_Proof.pdf"
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Document Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            >
              <option value="Identity / KYC">Identity / KYC</option>
              <option value="Underwriting Loss Proof">Underwriting Loss Proof</option>
              <option value="Claim Evidence">Claim Evidence</option>
              <option value="Policy Certificate">Policy Certificate</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Associated Customer
            </label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="David Vance"
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Associated Policy #
            </label>
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              placeholder="POL-9012"
              className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
            Vault Description & Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add security or compliance verification notes..."
            className="w-full p-3.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isUploading ? "Encrypting & Uploading..." : "Upload to Vault"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadDocumentPage;
