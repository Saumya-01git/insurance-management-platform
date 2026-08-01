import { useState, useEffect } from "react";
import CustomerProfile from "../../components/customers/CustomerProfile";
import CustomerPolicies from "../../components/customers/CustomerPolicies";
import CustomerClaims from "../../components/customers/CustomerClaims";
import CustomerDocuments from "../../components/customers/CustomerDocuments";
import CustomerTimeline from "../../components/customers/CustomerTimeline";
import { ArrowLeft, Edit3, Shield, FileText, FolderOpen, Clock } from "lucide-react";
import { customerService } from "../../services/customerService";

const CustomerDetailsPage = ({ customerId, customerData, onBack, onEdit }) => {
  const [customer, setCustomer] = useState(customerData || null);
  const [activeTab, setActiveTab] = useState("overview"); // "overview", "policies", "claims", "documents", "timeline"
  const [loading, setLoading] = useState(!customerData);

  useEffect(() => {
    if (!customerData && customerId) {
      const load = async () => {
        setLoading(true);
        const data = await customerService.getCustomerById(customerId);
        setCustomer(data);
        setLoading(false);
      };
      load();
    }
  }, [customerId, customerData]);

  if (loading) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Customer Record Not Found</h4>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold"
        >
          Return to Customer Directory
        </button>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Profile & Identity", icon: Shield },
    { id: "policies", label: `Policies (${customer.policies?.length || 0})`, icon: Shield },
    { id: "claims", label: `Claims (${customer.claims?.length || 0})`, icon: FileText },
    { id: "documents", label: `Documents Vault (${customer.documents?.length || 0})`, icon: FolderOpen },
    { id: "timeline", label: "Audit Timeline", icon: Clock },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Back to Directory"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="hover:text-[#2563EB] cursor-pointer" onClick={onBack}>
                Customers
              </span>
              <span>/</span>
              <span className="font-bold text-slate-900 dark:text-white">{customer.fullName}</span>
            </nav>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
              Carrier Customer Overview
            </h1>
          </div>
        </div>

        {onEdit && (
          <button
            onClick={() => onEdit(customer)}
            className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Customer Details</span>
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200/60 dark:border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/20"
                  : "bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <CustomerProfile customer={customer} onEdit={onEdit} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomerPolicies policies={customer.policies} />
            <CustomerClaims claims={customer.claims} />
          </div>
        </div>
      )}

      {activeTab === "policies" && <CustomerPolicies policies={customer.policies} />}
      {activeTab === "claims" && <CustomerClaims claims={customer.claims} />}
      {activeTab === "documents" && <CustomerDocuments documents={customer.documents} />}
      {activeTab === "timeline" && <CustomerTimeline timeline={customer.timeline} />}
    </div>
  );
};

export default CustomerDetailsPage;
