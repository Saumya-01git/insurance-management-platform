import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  ShieldCheck,
  FileText,
  CreditCard,
  FolderOpen,
  ArrowRight,
  X,
} from "lucide-react";
import { customerService } from "../../services/customerService";
import { policyService } from "../../services/policyService";
import { claimService } from "../../services/claimService";
import { paymentService } from "../../services/paymentService";
import { documentService } from "../../services/documentService";

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    customers: [],
    policies: [],
    claims: [],
    payments: [],
    documents: [],
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults({ customers: [], policies: [], claims: [], payments: [], documents: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ customers: [], policies: [], claims: [], payments: [], documents: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const q = query.toLowerCase();
        const [custs, pols, clms, pays, docs] = await Promise.all([
          customerService.getCustomers().catch(() => []),
          policyService.getPolicies().catch(() => []),
          claimService.getClaims().catch(() => []),
          paymentService.getPayments().catch(() => []),
          documentService.getDocuments().catch(() => []),
        ]);

        const filteredCusts = (Array.isArray(custs) ? custs : []).filter(
          (c) =>
            c.name?.toLowerCase().includes(q) ||
            c.email?.toLowerCase().includes(q) ||
            c.customerId?.toLowerCase().includes(q)
        ).slice(0, 3);

        const filteredPols = (Array.isArray(pols) ? pols : []).filter(
          (p) =>
            p.policyNumber?.toLowerCase().includes(q) ||
            p.type?.toLowerCase().includes(q) ||
            p.customerName?.toLowerCase().includes(q)
        ).slice(0, 3);

        const filteredClms = (Array.isArray(clms) ? clms : []).filter(
          (c) =>
            c.claimNumber?.toLowerCase().includes(q) ||
            c.type?.toLowerCase().includes(q) ||
            c.policyNumber?.toLowerCase().includes(q)
        ).slice(0, 3);

        const filteredPays = (Array.isArray(pays) ? pays : []).filter(
          (p) =>
            p.paymentId?.toLowerCase().includes(q) ||
            p.customerName?.toLowerCase().includes(q) ||
            p.policyNumber?.toLowerCase().includes(q)
        ).slice(0, 3);

        const filteredDocs = (Array.isArray(docs) ? docs : []).filter(
          (d) =>
            d.title?.toLowerCase().includes(q) ||
            d.category?.toLowerCase().includes(q) ||
            d.customerName?.toLowerCase().includes(q)
        ).slice(0, 3);

        setResults({
          customers: filteredCusts,
          policies: filteredPols,
          claims: filteredClms,
          payments: filteredPays,
          documents: filteredDocs,
        });
      } catch (err) {
        console.error("Global search error:", err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  const hasResults =
    results.customers.length > 0 ||
    results.policies.length > 0 ||
    results.claims.length > 0 ||
    results.payments.length > 0 ||
    results.documents.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0C1424] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden space-y-0">
        {/* Search Header */}
        <div className="relative flex items-center px-5 py-4 border-b border-slate-200/80 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Global Search: Type a name, policy #, claim #, invoice..."
            className="w-full pl-3 pr-10 bg-transparent text-sm sm:text-base font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="py-8 text-center text-xs font-bold text-slate-400 animate-pulse">
              Searching across entire platform database...
            </div>
          )}

          {!loading && !query && (
            <div className="py-8 text-center space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Navigation Shortcuts</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button onClick={() => handleSelect("/customers")} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 cursor-pointer">Customers</button>
                <button onClick={() => handleSelect("/policies")} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 cursor-pointer">Policies</button>
                <button onClick={() => handleSelect("/claims")} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 cursor-pointer">Claims</button>
                <button onClick={() => handleSelect("/payments")} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 cursor-pointer">Payments</button>
                <button onClick={() => handleSelect("/documents")} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 cursor-pointer">Vault Documents</button>
              </div>
            </div>
          )}

          {!loading && query && !hasResults && (
            <div className="py-8 text-center text-sm font-semibold text-slate-500">
              No platform records matching &quot;{query}&quot; found.
            </div>
          )}

          {!loading && hasResults && (
            <div className="space-y-4">
              {results.customers.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-500" /> Customers
                  </span>
                  {results.customers.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleSelect("/customers")}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-700/50 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">{c.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{c.email} • ID: {c.customerId}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {results.policies.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> Policies
                  </span>
                  {results.policies.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelect("/policies")}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border border-slate-200/60 dark:border-slate-700/50 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">{p.policyNumber} — {p.type}</p>
                        <p className="text-[11px] text-slate-400 font-medium">Customer: {p.customerName || "Acme Policyholder"}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {results.claims.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-500" /> Claims
                  </span>
                  {results.claims.map((clm) => (
                    <div
                      key={clm.id}
                      onClick={() => handleSelect("/claims")}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200/60 dark:border-slate-700/50 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">{clm.claimNumber} — {clm.type}</p>
                        <p className="text-[11px] text-slate-400 font-medium">Policy: {clm.policyNumber} • Status: {clm.status}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {results.payments.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-500" /> Payments
                  </span>
                  {results.payments.map((pay) => (
                    <div
                      key={pay.id}
                      onClick={() => handleSelect("/payments")}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/60 dark:border-slate-700/50 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">{pay.paymentId} — ${pay.amount}</p>
                        <p className="text-[11px] text-slate-400 font-medium">Policy: {pay.policyNumber}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {results.documents.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FolderOpen className="w-3.5 h-3.5 text-purple-500" /> Vault Documents
                  </span>
                  {results.documents.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => handleSelect("/documents")}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200/60 dark:border-slate-700/50 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">{doc.title}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{doc.category}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
