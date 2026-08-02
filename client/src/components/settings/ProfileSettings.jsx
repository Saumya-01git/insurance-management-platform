import { useState } from "react";
import { User, Mail, Phone, Briefcase, Save } from "lucide-react";
import { toast } from "react-hot-toast";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    fullName: "Agent Saumya",
    email: "saumya.underwriting@carrier.com",
    phone: "+1 (800) 555-0199",
    designation: "Senior Carrier Underwriter",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Profile settings saved successfully!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-cyan-400 font-black text-xl flex items-center justify-center border border-blue-200 dark:border-blue-900/30">
          AS
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{profile.fullName}</h3>
          <p className="text-xs text-slate-400 font-medium">{profile.designation}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full h-11 pl-10 pr-4 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
            Official Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full h-11 pl-10 pr-4 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
            Direct Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full h-11 pl-10 pr-4 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
            Job Designation
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="designation"
              value={profile.designation}
              onChange={handleChange}
              className="w-full h-11 pl-10 pr-4 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>
    </form>
  );
};

export default ProfileSettings;
