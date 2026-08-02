import { useState } from "react";
import { Building2, Save } from "lucide-react";
import { toast } from "react-hot-toast";

const CompanySettings = () => {
  const [company, setCompany] = useState({
    name: "InsurePulse Global Carrier Suite",
    taxId: "EIN-98-4029148",
    address: "742 Evergreen Terrace, Suite 400, NY 10001",
    supportEmail: "compliance@insurepulse.com",
    naicCode: "NAIC-49102",
  });

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Carrier company information updated!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Building2 className="w-5 h-5 text-[#2563EB]" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Insurance Carrier Entity</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Company Legal Name</label>
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleChange}
            className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Tax ID / EIN</label>
          <input
            type="text"
            name="taxId"
            value={company.taxId}
            onChange={handleChange}
            className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">NAIC Carrier Code</label>
          <input
            type="text"
            name="naicCode"
            value={company.naicCode}
            onChange={handleChange}
            className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Compliance Support Email</label>
          <input
            type="email"
            name="supportEmail"
            value={company.supportEmail}
            onChange={handleChange}
            className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Corporate HQ Address</label>
        <input
          type="text"
          name="address"
          value={company.address}
          onChange={handleChange}
          className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Company Info</span>
        </button>
      </div>
    </form>
  );
};

export default CompanySettings;
