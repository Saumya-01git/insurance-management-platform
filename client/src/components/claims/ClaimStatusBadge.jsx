import { getClaimStatusBadge } from "../../utils/claimHelpers";

const ClaimStatusBadge = ({ status }) => {
  const badge = getClaimStatusBadge(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
      {badge.label}
    </span>
  );
};

export default ClaimStatusBadge;
