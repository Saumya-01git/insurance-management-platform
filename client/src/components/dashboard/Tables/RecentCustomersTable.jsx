import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ArrowUpRight } from "lucide-react";
import { customerService } from "../../../services/customerService";

const RecentCustomersTable = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const list = await customerService.getCustomers();
      setCustomers(Array.isArray(list) ? list.slice(0, 5) : []);
    };
    load();
  }, []);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recent Onboarded Customers
          </h3>
        </div>
        <button
          onClick={() => navigate("/customers")}
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] dark:text-cyan-400 hover:underline cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pr-4">Customer Name</th>
              <th className="pb-3 px-4">Contact Email</th>
              <th className="pb-3 px-4">Policies</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 pl-4 text-right">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-semibold">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-400 text-xs font-medium">
                  No registered customers found.
                </td>
              </tr>
            ) : (
              customers.map((cust) => {
                const name = typeof cust.fullName === "string" ? cust.fullName : cust.name || "Carrier Customer";
                return (
                  <tr key={cust.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#2563EB] dark:text-cyan-400 font-extrabold flex items-center justify-center shrink-0 text-xs">
                          {name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white">{name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{cust.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                      {cust.email}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold">
                        {cust.policiesCount || cust.policies?.length || 1} Policies
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                          cust.status === "ACTIVE" || cust.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30"
                            : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            cust.status === "ACTIVE" || cust.status === "Active" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                          }`}
                        />
                        {cust.status || "Active"}
                      </span>
                    </td>
                    <td className="py-3.5 pl-4 text-right text-slate-500 dark:text-slate-400 font-medium">
                      {cust.createdDate || "Aug 01, 2026"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCustomersTable;
