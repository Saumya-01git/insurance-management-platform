import { User, Mail, Phone, MapPin, Calendar, ShieldCheck, Briefcase, HeartHandshake, PhoneCall } from "lucide-react";
import { formatCustomerId, formatCurrency, formatDate, getInitials, getStatusBadgeStyle } from "../../utils/customerHelpers";

const CustomerProfile = ({ customer, onEdit }) => {
  if (!customer) return null;
  const badgeStyle = getStatusBadgeStyle(customer.status);

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          {customer.avatar ? (
            <img
              src={customer.avatar}
              alt={customer.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white font-black text-xl flex items-center justify-center shadow-md">
              {getInitials(customer.fullName)}
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {customer.fullName}
              </h2>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
                {customer.status || "ACTIVE"}
              </span>
            </div>
            <p className="text-xs font-mono text-[#2563EB] dark:text-cyan-400 font-extrabold">
              {formatCustomerId(customer.id)} • <span className="text-slate-400 font-normal">Onboarded {formatDate(customer.createdDate)}</span>
            </p>
          </div>
        </div>

        {onEdit && (
          <button
            onClick={() => onEdit(customer)}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Grid Information Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-[#2563EB]" /> Contact Info
          </h4>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">Email Address</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{customer.email}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">Phone Number</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{customer.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">Occupation</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{customer.occupation || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-500" /> Personal Identity
          </h4>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">Date of Birth</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{formatDate(customer.dateOfBirth)}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">Gender</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{customer.gender || "Not specified"}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">Identity Proof Document</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{customer.identityProof || "Verified KYC"}</span>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" /> Primary Address
          </h4>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">Street Address</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{customer.address || "N/A"}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">City, State & PIN Code</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {customer.city ? `${customer.city}, ${customer.state} ${customer.pinCode}` : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Nominee & Emergency Contacts */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-2">
                <HeartHandshake className="w-4 h-4 text-rose-500" /> Nominee Information
              </h4>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{customer.nominee || "No nominee designated"}</p>
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-2">
                <PhoneCall className="w-4 h-4 text-amber-500" /> Emergency Contact
              </h4>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{customer.emergencyContact || "No emergency contact provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
