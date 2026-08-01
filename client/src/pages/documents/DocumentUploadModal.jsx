import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { customerApi } from "../../api/customerApi";
import { UploadCloud, FileText, User, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

const DOC_TYPES = [
  { value: "ID_PROOF", label: "Identity Proof (Passport, Driver License, SSN)" },
  { value: "ADDRESS_PROOF", label: "Address Proof (Utility Bill, Bank Statement)" },
  { value: "POLICY_DOC", label: "Policy Agreement / Contract" },
  { value: "CLAIM_DOC", label: "Claim Supporting Evidence" },
];

const DocumentUploadModal = ({ isOpen, onClose, onUpload, isLoading = false }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      customerApi
        .getAll()
        .then((data) => setCustomers(Array.isArray(data) ? data : data.data || []))
        .catch(() => toast.error("Could not fetch customer list for document upload"));

      reset({
        customer_id: "",
        document_type: "ID_PROOF",
      });
    }
  }, [isOpen, reset]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (data) => {
    if (!selectedFile) {
      toast.error("Please select a document file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("customer_id", data.customer_id);
    formData.append("document_type", data.document_type || "ID_PROOF");
    formData.append("file", selectedFile);

    onUpload(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Customer KYC Document"
      subtitle="Attach PDF or image documents to a customer's master file"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Customer Owner *"
            icon={User}
            placeholder="Select Customer..."
            error={errors.customer_id?.message}
            options={customers.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.email})`,
            }))}
            {...register("customer_id", { required: "Customer selection is required" })}
          />

          <Select
            label="Document Category *"
            icon={FileText}
            options={DOC_TYPES}
            {...register("document_type")}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[14px] font-semibold text-slate-700 dark:text-slate-200">
            Document Attachment (PDF, PNG, JPG, DOCX) *
          </label>
          <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#2563EB] dark:hover:border-blue-500 rounded-2xl p-6 transition-colors bg-slate-50/50 dark:bg-slate-900/40 text-center flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] dark:bg-blue-950/40 dark:text-blue-400 flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {selectedFile.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Size: {(selectedFile.size / 1024).toFixed(1)} KB • Click to replace file
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Drop your file here, or <span className="text-[#2563EB] underline">browse</span>
                </p>
                <p className="text-xs text-slate-400">Supports PDF, PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
          <Button variant="secondary" size="md" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" icon={UploadCloud} isLoading={isLoading}>
            Upload Document
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DocumentUploadModal;
