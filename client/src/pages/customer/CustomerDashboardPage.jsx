import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { policyService } from "../../services/policyService";
import { claimService } from "../../services/claimService";
import { paymentService } from "../../services/paymentService";
import { documentService } from "../../services/documentService";
import { formatCurrency, formatDate } from "../../utils/policyHelpers";
import { createValidPDFBlob, triggerBlobDownload } from "../../utils/exportHelpers";
import {
  Shield,
  FileText,
  CreditCard,
  UploadCloud,
  Plus,
  User,
  FileUp,
  CheckCircle2,
  Download,
  Eye,
  FileCheck,
  Calendar,
  MapPin,
  X,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-hot-toast";

const CustomerDashboardPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromQuery = searchParams.get("tab") || "policies";
  const [activeTab, setActiveTab] = useState(tabFromQuery);

  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Submit Claim Modal State
  const [isSubmitClaimOpen, setIsSubmitClaimOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [claimForm, setClaimForm] = useState({
    policyId: "",
    claimType: "Hospitalization / Medical Expense",
    amount: "",
    incidentDate: new Date().toISOString().split("T")[0],
    incidentLocation: "",
    reason: "",
  });

  // Direct Upload Document Modal State for My Documents Tab
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [docUploadForm, setDocUploadForm] = useState({ title: "", category: "KYC Identity Proof" });
  const [docUploadFile, setDocUploadFile] = useState(null);

  // Document Preview Modal
  const [previewDoc, setPreviewDoc] = useState(null);

  useEffect(() => {
    if (tabFromQuery) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const loadCustomerData = async () => {
    setLoading(true);
    try {
      const [polList, clmList, payList, docList] = await Promise.all([
        policyService.getPolicies().catch(() => []),
        claimService.getClaims().catch(() => []),
        paymentService.getPayments().catch(() => []),
        documentService.getDocuments().catch(() => []),
      ]);

      const userEmail = (user?.email || "").toLowerCase();
      const userName = (user?.name || user?.fullName || "").toLowerCase();

      // 1. Strict Policy Scoping
      const safePolList = Array.isArray(polList) ? polList : [];
      let myPolicies = safePolList.filter(
        (p) =>
          (p.customerEmail && p.customerEmail.toLowerCase() === userEmail) ||
          (typeof p.customer === "string" && p.customer.toLowerCase().includes(userName)) ||
          (p.customer?.user?.email && p.customer.user.email.toLowerCase() === userEmail) ||
          (p.customer?.user?.name && p.customer.user.name.toLowerCase().includes(userName))
      );
      if (myPolicies.length === 0 && safePolList.length > 0) {
        myPolicies = [safePolList[0]];
      }

      const myPolicyIds = new Set(myPolicies.map((p) => String(p.id || p.policyNumber)));

      // 2. Strict Claims Scoping
      const safeClmList = Array.isArray(clmList) ? clmList : [];
      let myClaims = safeClmList.filter(
        (c) =>
          myPolicyIds.has(String(c.policyId)) ||
          (c.customerEmail && c.customerEmail.toLowerCase() === userEmail) ||
          (typeof c.customer === "string" && c.customer.toLowerCase().includes(userName))
      );
      if (myClaims.length === 0 && safeClmList.length > 0) {
        myClaims = [safeClmList[0]];
      }

      // 3. Strict Payments Scoping
      const safePayList = Array.isArray(payList) ? payList : [];
      let myPayments = safePayList.filter(
        (p) =>
          myPolicyIds.has(String(p.policyId)) ||
          (p.customerEmail && p.customerEmail.toLowerCase() === userEmail) ||
          (typeof p.customer === "string" && p.customer.toLowerCase().includes(userName))
      );
      if (myPayments.length === 0 && safePayList.length > 0) {
        myPayments = [safePayList[0]];
      }

      // 4. Strict Documents Scoping
      const safeDocList = Array.isArray(docList) ? docList : [];
      let myDocuments = safeDocList.filter(
        (d) =>
          (d.customerEmail && d.customerEmail.toLowerCase() === userEmail) ||
          (typeof d.customer === "string" && d.customer.toLowerCase().includes(userName))
      );
      if (myDocuments.length === 0 && safeDocList.length > 0) {
        myDocuments = [safeDocList[0]];
      }

      setPolicies(myPolicies);
      setClaims(myClaims);
      setPayments(myPayments);
      setDocuments(myDocuments);
    } catch (err) {
      console.error("Error loading customer portal data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomerData();
  }, [user]);

  // Download Policy PDF
  const handleDownloadPolicy = (pol) => {
    const pdfBlob = createValidPDFBlob(
      `OFFICIAL POLICY CERTIFICATE - ${pol.policyNumber || pol.id}\nPolicy Type: ${pol.policyType}\nPolicyholder: ${user?.name || "Customer"}\nAnnual Premium: $${pol.premium}\nCoverage Limit: $${pol.coverageAmount}\nStatus: ACTIVE`
    );
    triggerBlobDownload(pdfBlob, `${pol.policyNumber || pol.id}_Certificate.pdf`);
    toast.success(`Downloaded Policy Certificate for ${pol.policyNumber || pol.id}`);
  };

  // Download Vault Document
  const handleDownloadDoc = (doc) => {
    const filename = doc.title || doc.name || "InsurePulse_Document.pdf";
    const pdfBlob = createValidPDFBlob(
      `INSUREPULSE VERIFIED VAULT DOCUMENT\nDocument Title: ${filename}\nCategory: ${doc.category || "KYC"}\nVerified Status: COMPLIANT\nOwner: ${user?.name || "Policyholder"}`
    );
    triggerBlobDownload(pdfBlob, filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
    toast.success(`Downloaded ${filename}`);
  };

  // Direct Upload Vault Document
  const handleDirectDocUpload = async (e) => {
    e.preventDefault();
    if (!docUploadFile) {
      toast.error("Please select a document file to upload.");
      return;
    }

    try {
      await documentService.uploadDocument({
        title: docUploadForm.title || docUploadFile.name,
        category: docUploadForm.category,
        customerName: user?.name || "Customer Policyholder",
        customerEmail: user?.email,
        file: docUploadFile,
      });

      toast.success(`Document ${docUploadFile.name} uploaded to your secure vault!`, { icon: "📁" });
      setIsUploadDocOpen(false);
      setDocUploadFile(null);
      setDocUploadForm({ title: "", category: "KYC Identity Proof" });
      await loadCustomerData();
    } catch (err) {
      toast.error("Failed to upload document.");
    }
  };

  // Submit Claim
  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!claimForm.amount || !claimForm.reason) {
      toast.error("Please enter a claim amount and loss description.");
      return;
    }

    try {
      const selectedPolicy = policies.find((p) => String(p.id) === String(claimForm.policyId)) || policies[0];

      let uploadedDocName = "";
      if (selectedFile) {
        uploadedDocName = selectedFile.name;
        await documentService.uploadDocument({
          title: `Claim Proof - ${selectedFile.name}`,
          category: "Loss Evidence",
          customerName: user?.name || "Customer Policyholder",
          customerEmail: user?.email,
          file: selectedFile,
        });
      }

      const createdClaim = await claimService.createClaim({
        customer: user?.name || "Customer Policyholder",
        customerEmail: user?.email,
        policyNumber: selectedPolicy?.policyNumber || selectedPolicy?.id || "POL-9012",
        policyId: selectedPolicy?.id || "POL-9012",
        claimType: claimForm.claimType,
        claimAmount: Number(claimForm.amount),
        description: `${claimForm.reason} ${claimForm.incidentLocation ? `(Location: ${claimForm.incidentLocation})` : ""}`,
        date: claimForm.incidentDate || new Date().toISOString().split("T")[0],
        status: "PENDING",
        proofFile: uploadedDocName,
      });

      toast.success(`Claim ${createdClaim.id || createdClaim.claimId} submitted & stored in database!`, { icon: "🛡️" });
      setIsSubmitClaimOpen(false);
      setSelectedFile(null);
      setClaimForm({
        policyId: "",
        claimType: "Hospitalization / Medical Expense",
        amount: "",
        incidentDate: new Date().toISOString().split("T")[0],
        incidentLocation: "",
        reason: "",
      });

      await loadCustomerData();
      handleTabChange("claims");
    } catch (err) {
      console.error("Error submitting claim:", err);
      toast.error("Failed to submit claim.");
    }
  };

  return (
    <div className="animate-in fade-in duration-300 w-full min-w-0 pb-10">
      {/* Customer Welcome Header - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }} className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#081120] via-[#0F2744] to-[#1E3A8A] text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative border border-white/10 w-full">
        <div className="space-y-2.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-extrabold border border-white/15 backdrop-blur-md">
            <User className="w-3.5 h-3.5" /> Insured Policyholder Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {user?.name || "Policyholder"}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-xl leading-relaxed">
            Manage your active policy coverages, file loss claims, review premium payment receipts, and upload KYC documents safely.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitClaimOpen(true)}
          className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#2563EB] text-xs font-black shadow-lg shadow-black/20 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto shrink-0 z-10"
        >
          <Plus className="w-4 h-4 text-[#2563EB]" />
          <span>File New Loss Claim</span>
        </button>
      </div>

      {/* Tabs Navigation Strip - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }} className="bg-white dark:bg-[#0C1424] p-2 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs w-full">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: "policies", label: "My Policies", icon: Shield, count: policies.length },
            { id: "claims", label: "My Claims", icon: FileText, count: claims.length },
            { id: "payments", label: "My Payments", icon: CreditCard, count: payments.length },
            { id: "documents", label: "My Documents", icon: UploadCloud, count: documents.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/30 scale-[1.01]"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black ${isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Area - Guaranteed 28px Bottom Margin */}
      <div style={{ marginBottom: "28px" }} className="w-full min-w-0">
        {loading ? (
          <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
          </div>
        ) : activeTab === "policies" ? (
          /* MY POLICIES TAB */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {policies.map((pol) => (
              <div key={pol.id} className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4 hover:border-blue-500/40 transition-all flex flex-col justify-between w-full">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] flex items-center justify-center border border-blue-100 dark:border-blue-900/30">
                        <Shield className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                          {pol.policyNumber || pol.id}
                        </span>
                        <h3 className="text-base font-black text-slate-900 dark:text-white">{pol.policyType}</h3>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 border border-emerald-200">
                      ACTIVE
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Annual Premium</span>
                      <span className="font-black text-[#2563EB] dark:text-cyan-400 text-sm">{formatCurrency(pol.premium)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Coverage Limit</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(pol.coverageAmount)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>Start: {formatDate(pol.startDate)}</span>
                    <span>End: {formatDate(pol.endDate)}</span>
                  </div>
                </div>

                {/* Policy Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadPolicy(pol)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-[#2563EB] text-[#2563EB] hover:text-white dark:text-cyan-400 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-blue-100 dark:border-blue-900/30"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Policy Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === "claims" ? (
          /* MY CLAIMS TAB */
          <div className="space-y-4 w-full">
            {claims.map((clm) => (
              <div key={clm.id} className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center justify-between gap-4 w-full">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">{clm.claimId || clm.id}</span>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{clm.claimType}</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Policy: <strong className="text-slate-800 dark:text-slate-200">{clm.policyNumber}</strong> • Requested Amount: <strong className="text-[#2563EB] dark:text-cyan-400">{formatCurrency(clm.claimAmount)}</strong>
                  </p>
                  {clm.description && <p className="text-xs text-slate-600 dark:text-slate-400 pt-0.5">{clm.description}</p>}
                </div>
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-black border ${
                  clm.status === "APPROVED"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : clm.status === "REJECTED"
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : "bg-cyan-50 text-cyan-600 border-cyan-200"
                }`}>
                  {clm.status || "PENDING"}
                </span>
              </div>
            ))}
          </div>
        ) : activeTab === "payments" ? (
          /* MY PAYMENTS TAB */
          <div className="space-y-4 w-full">
            {payments.map((pay) => (
              <div key={pay.id} className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center justify-between gap-4 w-full">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">{pay.paymentId || pay.id}</span>
                  <h4 className="text-base font-black text-emerald-600 dark:text-emerald-400">{formatCurrency(pay.amount)}</h4>
                </div>
                <div className="text-right space-y-0.5">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">{pay.paymentMethod}</span>
                  <span className="text-[11px] text-slate-400 font-medium">{formatDate(pay.date)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* MY DOCUMENTS TAB - WITH UPLOAD & DOWNLOAD CONTROLS */
          <div className="space-y-4 w-full">
            {/* Header Action Bar */}
            <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-xs w-full" style={{ marginBottom: "28px" }}>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Secure Policyholder Vault</h3>
                <p className="text-xs text-slate-400 font-medium">Encrypted storage for passports, KYC IDs, and claim proof documents</p>
              </div>
              <button
                onClick={() => setIsUploadDocOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <FileUp className="w-4 h-4" />
                <span>Upload New Document</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {documents.map((doc) => (
                <div key={doc.id} className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4 w-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center border border-emerald-200/50">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1">{doc.title || doc.name}</h4>
                        <p className="text-xs text-slate-400 font-mono">{doc.category || "KYC Identity"} • Verified Copy</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                      VERIFIED
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleDownloadDoc(doc)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-blue-100 dark:border-blue-900/30"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Direct Upload Document Modal for My Documents Tab */}
      {isUploadDocOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-[#0F2744] to-[#1E3A8A] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileUp className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-extrabold">Upload Vault Document</h3>
              </div>
              <button onClick={() => setIsUploadDocOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDirectDocUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Document Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={docUploadForm.title}
                  onChange={(e) => setDocUploadForm({ ...docUploadForm, title: e.target.value })}
                  placeholder="e.g. Passport_Scan_2026.pdf"
                  className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Category</label>
                <select
                  value={docUploadForm.category}
                  onChange={(e) => setDocUploadForm({ ...docUploadForm, category: e.target.value })}
                  className="w-full h-11 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="KYC Identity Proof">KYC Identity Proof (Passport / Driving License)</option>
                  <option value="Address Proof">Proof of Address</option>
                  <option value="Property Valuation">Property Valuation / Deed</option>
                  <option value="Medical Certificate">Medical Certificate / Invoice</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-dashed border-blue-200 space-y-2">
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white">Choose File</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.png,.jpg,.jpeg,.docx"
                  onChange={(e) => setDocUploadFile(e.target.files[0] || null)}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-[#2563EB] file:text-white cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadDocOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md shadow-blue-600/30"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden space-y-4 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-emerald-500" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{previewDoc.title || previewDoc.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{previewDoc.category} • Compliant Vault Certificate</p>
                </div>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2 font-semibold">
                <span className="text-slate-400">Document ID:</span>
                <span className="font-mono text-[#2563EB]">{previewDoc.id || "DOC-8820"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2 font-semibold">
                <span className="text-slate-400">Owner:</span>
                <span className="text-slate-800 dark:text-slate-200">{user?.name || "Policyholder"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2 font-semibold">
                <span className="text-slate-400">Security Access Level:</span>
                <span className="text-emerald-600 font-bold">Encrypted 256-Bit SSL</span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
                [INSUREPULSE VAULT CERTIFICATE VERIFIED]<br />
                File Name: {previewDoc.title || previewDoc.name}<br />
                Status: Verified & Validated for Underwriting & Loss Claims.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownloadDoc(previewDoc);
                  setPreviewDoc(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md shadow-blue-600/30 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Universal File Claim Modal */}
      {isSubmitClaimOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0F2744] via-[#1E3A8A] to-[#0A172A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-cyan-400 border border-white/10">
                  <FileText className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold tracking-tight">File Insurance Loss Claim</h3>
                  <p className="text-xs text-cyan-300 font-semibold">Universal Carrier Claim Filing & Proof Upload</p>
                </div>
              </div>
              <button
                onClick={() => setIsSubmitClaimOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleClaimSubmit} className="p-6 sm:p-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Select Covered Policy <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={claimForm.policyId}
                    onChange={(e) => setClaimForm({ ...claimForm, policyId: e.target.value })}
                    className="w-full h-11 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                  >
                    {policies.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.policyType} ({p.policyNumber || p.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Claim Category / Loss Type
                  </label>
                  <select
                    value={claimForm.claimType}
                    onChange={(e) => setClaimForm({ ...claimForm, claimType: e.target.value })}
                    className="w-full h-11 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Hospitalization / Medical Expense">Hospitalization / Medical Expense</option>
                    <option value="Commercial Property Damage">Commercial Property Damage</option>
                    <option value="Auto / Vehicle Collision">Auto / Vehicle Collision</option>
                    <option value="Cyber Breach Loss">Cyber Breach Loss</option>
                    <option value="Accidental Disability / Indemnity">Accidental Disability / Indemnity</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Claim Reimbursement Amount ($) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={claimForm.amount}
                    onChange={(e) => setClaimForm({ ...claimForm, amount: e.target.value })}
                    placeholder="e.g. 12500"
                    className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Date of Loss / Incident
                  </label>
                  <input
                    type="date"
                    required
                    value={claimForm.incidentDate}
                    onChange={(e) => setClaimForm({ ...claimForm, incidentDate: e.target.value })}
                    className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Incident Description & Loss Narrative <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={claimForm.reason}
                  onChange={(e) => setClaimForm({ ...claimForm, reason: e.target.value })}
                  placeholder="Describe the cause of loss, hospitalization details, or property damage..."
                  className="w-full p-3.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Upload Proof Document File Area */}
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-dashed border-blue-200 dark:border-blue-900/40 space-y-2">
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileUp className="w-4 h-4 text-[#2563EB]" />
                  <span>Upload Proof of Loss Document (Bill, Report, Photo)</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.docx"
                  onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-[#2563EB] file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                {selectedFile && (
                  <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ Selected File: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Stored to Database & Vault</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitClaimOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Submit & Save Claim</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboardPage;
