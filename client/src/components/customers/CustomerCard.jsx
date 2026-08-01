import { Mail, Phone, MapPin, Shield, Eye, Edit3, Trash2 } from "lucide-react";
import { formatCustomerId, formatCurrency, getInitials, getStatusBadgeStyle } from "../../utils/customerHelpers";

const CustomerCard = ({ customer, onView, onEdit, onDelete }) => {
  const badgeStyle = getStatusBadgeStyle(customer.status);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        {/* Header Avatar & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {customer.avatar ? (
              <img
                src={customer.avatar}
                alt={customer.fullName}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                {getInitials(customer.fullName)}
              </div>
            )}
            <div>
              <h4
                onClick={() => onView(customer)}
                className="text-sm font-extrabold text-slate-900 dark:text-white hover:text-[#2563EB] cursor-pointer tracking-tight"
              >
                {customer.fullName}
              </h4>
              <p className="text-[11px] font-mono text-[#2563EB] dark:text-cyan-400 font-extrabold">
                {formatCustomerId(customer.id)}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
            {customer.status || "ACTIVE"}
          </span>
        </div>

        {/* Contact Info */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{customer.phone}</span>
          </div>
          {customer.city && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{customer.city}, {customer.state}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Metrics & Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div className="space-y-0.5">
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total Portfolio</p>
          <p className="text-xs font-black text-slate-900 dark:text-white">
            {formatCurrency(customer.totalPremium)} • <span className="text-slate-400 font-semibold">{customer.policiesCount || customer.policies?.length || 0} Policies</span>
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(customer)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(customer)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
            title="Edit Customer"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(customer)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            title="Delete Customer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
