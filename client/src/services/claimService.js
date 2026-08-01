import { claimApi } from "../api/claimApi";

const MOCK_CLAIMS = [
  {
    id: "CLM-9021",
    claimId: "CLM-9021",
    customer: "David Vance",
    customerId: "CUST-1049",
    policyNumber: "POL-9012",
    claimType: "Property Loss",
    claimAmount: 45000,
    date: "2026-08-01",
    status: "UNDER_REVIEW",
    assignedAgent: "Agent Saumya",
    description: "Water pipe burst in East Wing storage facility causing inventory damage.",
    documents: [
      { id: "DOC-901", name: "Property_Damage_Photos.pdf", size: "4.8 MB", status: "VERIFIED" },
      { id: "DOC-902", name: "Plumbing_Inspector_Report.pdf", size: "2.1 MB", status: "VERIFIED" },
    ],
    timeline: [
      { id: 1, title: "Claim Under Review", date: "Aug 01, 2026 - 10:30 AM", user: "Claims Manager", description: "Assigned risk inspector to East Wing site." },
      { id: 2, title: "Claim Filed", date: "Aug 01, 2026 - 10:14 AM", user: "David Vance", description: "Submitted claim for $45,000 Property Loss." },
    ],
    comments: [
      { id: 1, author: "Agent Saumya", date: "Aug 01, 2026", text: "Inspector report received. Water line replacement confirmed." },
    ],
  },
  {
    id: "CLM-9020",
    claimId: "CLM-9020",
    customer: "Apex Logistics Corp",
    customerId: "CUST-1047",
    policyNumber: "POL-7712",
    claimType: "Auto Collision",
    claimAmount: 12400,
    date: "2026-07-31",
    status: "APPROVED",
    assignedAgent: "Fleet Claims Desk",
    description: "Collision damage to semi-trailer truck #14 during transit.",
    documents: [
      { id: "DOC-903", name: "Police_Accident_Report.pdf", size: "3.2 MB", status: "VERIFIED" },
    ],
    timeline: [
      { id: 1, title: "Payout Dispatched", date: "Jul 31, 2026", user: "Finance Settlement", description: "Approved payout of $12,400 via ACH Wire." },
    ],
    comments: [],
  },
  {
    id: "CLM-9019",
    claimId: "CLM-9019",
    customer: "Sarah Jenkins",
    customerId: "CUST-1048",
    policyNumber: "POL-3321",
    claimType: "Medical Expense",
    claimAmount: 3850,
    date: "2026-07-30",
    status: "APPROVED",
    assignedAgent: "Health Claims Auditor",
    description: "Outpatient surgery medical expense reimbursement.",
    documents: [
      { id: "DOC-904", name: "Hospital_Invoice_StJude.pdf", size: "1.5 MB", status: "VERIFIED" },
    ],
    timeline: [
      { id: 1, title: "Claim Approved", date: "Jul 30, 2026", user: "Health Desk", description: "Approved 100% covered reimbursement." },
    ],
    comments: [],
  },
  {
    id: "CLM-9018",
    claimId: "CLM-9018",
    customer: "Marcus Aurelius",
    customerId: "CUST-1044",
    policyNumber: "POL-3329",
    claimType: "Disability Indemnity",
    claimAmount: 250000,
    date: "2026-07-28",
    status: "PENDING",
    assignedAgent: "Executive Risk Desk",
    description: "Medical disability claim filed for executive leave.",
    documents: [],
    timeline: [
      { id: 1, title: "Disability Claim Submitted", date: "Jul 28, 2026", user: "Marcus Aurelius", description: "Submitted claim for medical disability indemnity." },
    ],
    comments: [],
  },
  {
    id: "CLM-9017",
    claimId: "CLM-9017",
    customer: "Apex Logistics Corp",
    customerId: "CUST-1047",
    policyNumber: "POL-7714",
    claimType: "Cyber Loss",
    claimAmount: 18200,
    date: "2026-07-25",
    status: "REJECTED",
    assignedAgent: "Cyber Risk Desk",
    description: "Phishing loss outside policy coverage exclusion boundaries.",
    documents: [],
    timeline: [
      { id: 1, title: "Claim Rejected", date: "Jul 26, 2026", user: "Cyber Auditor", description: "Loss excluded under Clause 14B." },
    ],
    comments: [],
  },
];

const STORAGE_KEY = "insurepulse_claims_data";

const getLocalClaims = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading localStorage claims:", e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_CLAIMS));
  return MOCK_CLAIMS;
};

const saveLocalClaims = (claims) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
  } catch (e) {
    console.error("Error saving localStorage claims:", e);
  }
};

export const claimService = {
  getClaims: async () => {
    try {
      const apiData = await claimApi.getAll();
      const rawList = Array.isArray(apiData)
        ? apiData
        : Array.isArray(apiData?.data)
        ? apiData.data
        : Array.isArray(apiData?.claims)
        ? apiData.claims
        : null;

      if (rawList && rawList.length > 0) {
        return rawList.map((clm) => ({
          ...clm,
          claimId: clm.claimId || clm.id || "CLM-9001",
          customer: clm.customerName || clm.customer?.fullName || clm.customer || "Carrier Customer",
          claimAmount: clm.claimAmount || clm.amount || 12500,
          status: clm.status || "PENDING",
          documents: Array.isArray(clm.documents) ? clm.documents : [],
          timeline: Array.isArray(clm.timeline) ? clm.timeline : [],
          comments: Array.isArray(clm.comments) ? clm.comments : [],
        }));
      }
    } catch (err) {
      console.warn("Backend API unavailable for getClaims, using local dataset.", err);
    }
    return getLocalClaims();
  },

  getClaimById: async (id) => {
    try {
      const apiData = await claimApi.getById(id);
      const resData = apiData?.data || apiData;
      if (resData && typeof resData === "object") return resData;
    } catch (err) {
      console.warn(`Backend API unavailable for getClaimById(${id}), using local dataset.`, err);
    }
    const list = getLocalClaims();
    return list.find((c) => String(c.id) === String(id) || c.claimId === id) || list[0];
  },

  createClaim: async (claimData) => {
    let newClaim = null;
    try {
      const res = await claimApi.create(claimData);
      if (res) newClaim = res?.data || res;
    } catch (err) {
      console.warn("Backend API unavailable for createClaim, saving locally.", err);
    }

    const list = getLocalClaims();
    const newId = `CLM-${9022 + list.length}`;
    const formattedData = {
      id: newId,
      claimId: newId,
      customer: claimData.customer || "David Vance",
      customerId: claimData.customerId || "CUST-1049",
      policyNumber: claimData.policyNumber || "POL-9012",
      claimType: claimData.claimType || "Property Loss",
      claimAmount: Number(claimData.claimAmount) || 15000,
      date: claimData.date || new Date().toISOString().split("T")[0],
      status: claimData.status || "PENDING",
      assignedAgent: claimData.assignedAgent || "Agent Saumya",
      description: claimData.description || "Filing entered into Carrier Suite.",
      documents: [],
      timeline: [
        { id: 1, title: "Claim Filed", date: new Date().toLocaleString(), user: "Agent Saumya", description: "Created claim filing." },
      ],
      comments: [],
      ...newClaim,
    };

    list.unshift(formattedData);
    saveLocalClaims(list);
    return formattedData;
  },

  updateClaim: async (id, updatedFields) => {
    try {
      await claimApi.update(id, updatedFields);
    } catch (err) {
      console.warn(`Backend API unavailable for updateClaim(${id}), updating locally.`, err);
    }

    const list = getLocalClaims();
    const index = list.findIndex((c) => String(c.id) === String(id));
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedFields };
      saveLocalClaims(list);
      return list[index];
    }
    return null;
  },

  approveClaim: async (id) => {
    try {
      await claimApi.approve(id);
    } catch (err) {
      console.warn(`Backend API unavailable for approveClaim(${id}), approving locally.`, err);
    }

    const list = getLocalClaims();
    const index = list.findIndex((c) => String(c.id) === String(id));
    if (index !== -1) {
      list[index].status = "APPROVED";
      if (!Array.isArray(list[index].timeline)) list[index].timeline = [];
      list[index].timeline.unshift({
        id: Date.now(),
        title: "Claim Approved",
        date: new Date().toLocaleString(),
        user: "Senior Claims Officer",
        description: "Approved for payout processing.",
      });
      saveLocalClaims(list);
      return list[index];
    }
    return null;
  },

  rejectClaim: async (id) => {
    try {
      await claimApi.reject(id);
    } catch (err) {
      console.warn(`Backend API unavailable for rejectClaim(${id}), rejecting locally.`, err);
    }

    const list = getLocalClaims();
    const index = list.findIndex((c) => String(c.id) === String(id));
    if (index !== -1) {
      list[index].status = "REJECTED";
      if (!Array.isArray(list[index].timeline)) list[index].timeline = [];
      list[index].timeline.unshift({
        id: Date.now(),
        title: "Claim Rejected",
        date: new Date().toLocaleString(),
        user: "Risk Auditor",
        description: "Claim filing denied.",
      });
      saveLocalClaims(list);
      return list[index];
    }
    return null;
  },

  deleteClaim: async (id) => {
    try {
      await claimApi.delete(id);
    } catch (err) {
      console.warn(`Backend API unavailable for deleteClaim(${id}), deleting locally.`, err);
    }

    const list = getLocalClaims();
    const filtered = list.filter((c) => String(c.id) !== String(id));
    saveLocalClaims(filtered);
    return true;
  },
};
