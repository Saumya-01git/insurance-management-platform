import { useState, useEffect } from "react";
import ClaimStatusBadge from "../../components/claims/ClaimStatusBadge";
import ClaimTimeline from "../../components/claims/ClaimTimeline";
import ClaimDocuments from "../../components/claims/ClaimDocuments";
import ClaimHistory from "../../components/claims/ClaimHistory";
import { ArrowLeft, Edit3, CheckCircle, XCircle, User, Shield, Calendar, DollarSign, FileText } from "lucide-react";
import { claimService } from "../../services/claimService";
import { formatClaimId, formatDate, formatCurrency } from "../../utils/claimHelpers";

const ClaimDetailsPage = ({ claimId, claimData, onBack, onEdit, onApprove, onReject }) => {
  const [claim, setClaim] = useState(claimData || null);
  const [loading, setLoading] = useState(!claimData);

  useEffect(() => {
    if (!claimData && claimId) {
      const load = async () => {
        setLoading(true);
        const data = await claimService.getClaimById(claimId);
        setClaim(data);
        setLoading(false);
      };
      load();
    }
  }, [claimId, claimData]);

  if (loading) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto" />
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#0C1424] rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Claim Record Not Found</h4>
        <button onClick={onBack} className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold">
          Return to Claims Processing
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0C1424] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="hover:text-[#2563EB] cursor-pointer" onClick={onBack}>
                Claims
              </span>
              <span>/</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {formatClaimId(claim.claimId || claim.id)}
              </span>
            </nav>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
              Claim Assessment File
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {claim.status !== "APPROVED" && onApprove && (
            <button
              onClick={() => onApprove(claim.id)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Approve Payout</span>
            </button>
          )}

          {claim.status !== "REJECTED" && onReject && (
            <button
              onClick={() => onReject(claim.id)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject Claim</span>
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(claim)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4" />
              <span>Update Claim</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Main Information */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {claim.claimType}
                  </h2>
                  <p className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                    {formatClaimId(claim.claimId || claim.id)}
                  </p>
                </div>
              </div>

              <ClaimStatusBadge status={claim.status} />
            </div>

            {/* Financial & Filing Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Claimed Loss Amount</span>
                <span className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  {typeof claim.claimAmount === "number" ? formatCurrency(claim.claimAmount) : claim.claimAmount}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Date of Loss Filing</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(claim.date)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[11px] font-medium text-slate-400 block">Assigned Adjuster</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                  {claim.assignedAgent || "Agent Saumya"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Loss Incident Description
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {claim.description || "No detailed loss narrative entered."}
              </p>
            </div>
          </div>

          <ClaimDocuments documents={claim.documents} />
          <ClaimHistory comments={claim.comments} />
        </div>

        {/* Right Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#2563EB]" /> Claimant Profile
            </h4>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">
              {claim.customer || "Carrier Customer"}
            </p>
            <p className="text-xs font-mono text-[#2563EB] dark:text-cyan-400 font-extrabold">
              {claim.customerId || "CUST-1049"}
            </p>
          </div>

          {/* Policy Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-500" /> Associated Policy
            </h4>
            <p className="text-sm font-mono font-extrabold text-slate-900 dark:text-white">
              {claim.policyNumber || "POL-9012"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified active policy underwriter coverage.
            </p>
          </div>

          <ClaimTimeline timeline={claim.timeline} />
        </div>
      </div>
    </div>
  );
};

export default ClaimDetailsPage;
