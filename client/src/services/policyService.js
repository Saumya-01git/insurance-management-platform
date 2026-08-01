import { policyApi } from "../api/policyApi";

const MOCK_POLICIES = [
  {
    id: "POL-9012",
    policyNumber: "POL-9012",
    customer: "David Vance",
    customerId: "CUST-1049",
    customerEmail: "david.vance@company.com",
    policyType: "Commercial Property",
    coverageAmount: 1500000,
    premium: 32000,
    startDate: "2026-08-01",
    endDate: "2027-08-01",
    status: "ACTIVE",
    notes: "Covers East Wing industrial facility & automated inventory warehouse.",
    underwriter: "Saumya (Lead Underwriter)",
    timeline: [
      { id: 1, title: "Policy Renewed", date: "Aug 01, 2026", user: "Underwriting Bot", description: "Annual premium set to $32,000." },
      { id: 2, title: "Risk Assessment Approved", date: "Jul 28, 2026", user: "Risk Inspector", description: "Fire safety audit passed with 98% score." },
    ],
  },
  {
    id: "POL-7712",
    policyNumber: "POL-7712",
    customer: "Apex Logistics Corp",
    customerId: "CUST-1047",
    customerEmail: "admin@apexlogistics.com",
    policyType: "Fleet Transport Liability",
    coverageAmount: 10000000,
    premium: 85000,
    startDate: "2025-08-05",
    endDate: "2026-08-05",
    status: "EXPIRING_SOON",
    notes: "Comprehensive liability coverage for 140 heavy commercial trucks.",
    underwriter: "Senior Carrier Desk",
    timeline: [
      { id: 1, title: "Renewal Notice Issued", date: "Jul 28, 2026", user: "System Auditor", description: "Renewal notice dispatched for $85,000 premium." },
    ],
  },
  {
    id: "POL-3321",
    policyNumber: "POL-3321",
    customer: "Sarah Jenkins",
    customerId: "CUST-1048",
    customerEmail: "sarah.j@acme.org",
    policyType: "Comprehensive Health",
    coverageAmount: 250000,
    premium: 8200,
    startDate: "2026-07-29",
    endDate: "2027-07-29",
    status: "ACTIVE",
    notes: "Executive health plan including dental, vision, and worldwide emergency medical.",
    underwriter: "Health Portfolio Manager",
    timeline: [
      { id: 1, title: "Policy Issued", date: "Jul 29, 2026", user: "Agent Saumya", description: "Policy activated upon initial premium settlement." },
    ],
  },
  {
    id: "POL-6641",
    policyNumber: "POL-6641",
    customer: "Elena Rostova",
    customerId: "CUST-1045",
    customerEmail: "elena.r@techcorp.io",
    policyType: "Executive Health",
    coverageAmount: 1000000,
    premium: 14200,
    startDate: "2025-08-10",
    endDate: "2026-08-10",
    status: "EXPIRING_SOON",
    notes: "Tier-1 executive health umbrella with zero deductible.",
    underwriter: "Carrier Suite Underwriting",
    timeline: [
      { id: 1, title: "Expiring Warning", date: "Jul 25, 2026", user: "System", description: "Expires in 9 days." },
    ],
  },
  {
    id: "POL-3329",
    policyNumber: "POL-3329",
    customer: "Marcus Aurelius",
    customerId: "CUST-1044",
    customerEmail: "marcus@rome.org",
    policyType: "Term Life Coverage",
    coverageAmount: 2000000,
    premium: 12500,
    startDate: "2025-08-22",
    endDate: "2026-08-22",
    status: "EXPIRING_SOON",
    notes: "Term life indemnity policy with nominated spouse beneficiary.",
    underwriter: "Life Desk",
    timeline: [],
  },
  {
    id: "POL-5001",
    policyNumber: "POL-5001",
    customer: "Michael Sterling",
    customerId: "CUST-1046",
    customerEmail: "m.sterling@gmail.com",
    policyType: "Cyber Defense Insurance",
    coverageAmount: 500000,
    premium: 3200,
    startDate: "2026-07-24",
    endDate: "2027-07-24",
    status: "PENDING_UNDERWRITING",
    notes: "Awaiting security compliance scan before final activation.",
    underwriter: "Cyber Risk Desk",
    timeline: [
      { id: 1, title: "Filing Received", date: "Jul 24, 2026", user: "Michael Sterling", description: "Application submitted for Cyber Defense." },
    ],
  },
];

const STORAGE_KEY = "insurepulse_policies_data";

const getLocalPolicies = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading localStorage policies:", e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_POLICIES));
  return MOCK_POLICIES;
};

const saveLocalPolicies = (policies) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(policies));
  } catch (e) {
    console.error("Error saving localStorage policies:", e);
  }
};

export const policyService = {
  getPolicies: async () => {
    try {
      const apiData = await policyApi.getAll();
      const rawList = Array.isArray(apiData)
        ? apiData
        : Array.isArray(apiData?.data)
        ? apiData.data
        : Array.isArray(apiData?.policies)
        ? apiData.policies
        : null;

      if (rawList && rawList.length > 0) {
        return rawList.map((pol) => ({
          ...pol,
          policyNumber: pol.policyNumber || pol.id || "POL-9012",
          customer: pol.customerName || pol.customer?.fullName || pol.customer || "Carrier Customer",
          premium: pol.premium || 12500,
          coverageAmount: pol.coverageAmount || pol.coverage || 500000,
          status: pol.status || "ACTIVE",
          timeline: Array.isArray(pol.timeline) ? pol.timeline : [],
        }));
      }
    } catch (err) {
      console.warn("Backend API unavailable for getPolicies, using local storage dataset.", err);
    }
    return getLocalPolicies();
  },

  getPolicyById: async (id) => {
    try {
      const apiData = await policyApi.getById(id);
      const resData = apiData?.data || apiData;
      if (resData && typeof resData === "object") return resData;
    } catch (err) {
      console.warn(`Backend API unavailable for getPolicyById(${id}), using local dataset.`, err);
    }
    const list = getLocalPolicies();
    return list.find((p) => String(p.id) === String(id) || p.policyNumber === id) || list[0];
  },

  createPolicy: async (policyData) => {
    let newPolicy = null;
    try {
      const res = await policyApi.create(policyData);
      if (res) newPolicy = res?.data || res;
    } catch (err) {
      console.warn("Backend API unavailable for createPolicy, saving locally.", err);
    }

    const list = getLocalPolicies();
    const newId = `POL-${9020 + list.length}`;
    const formattedData = {
      id: newId,
      policyNumber: newId,
      customer: policyData.customer || "David Vance",
      customerId: policyData.customerId || "CUST-1049",
      customerEmail: policyData.customerEmail || "customer@insurepulse.com",
      policyType: policyData.policyType || "Commercial Property",
      coverageAmount: Number(policyData.coverageAmount) || 1000000,
      premium: Number(policyData.premium) || 15000,
      startDate: policyData.startDate || new Date().toISOString().split("T")[0],
      endDate: policyData.endDate || "2027-08-01",
      status: policyData.status || "ACTIVE",
      notes: policyData.notes || "Underwritten by Carrier Suite.",
      underwriter: "Agent Saumya",
      timeline: [
        { id: 1, title: "Policy Created", date: new Date().toLocaleString(), user: "Agent Saumya", description: "Created underwritten policy." },
      ],
      ...newPolicy,
    };

    list.unshift(formattedData);
    saveLocalPolicies(list);
    return formattedData;
  },

  updatePolicy: async (id, updatedFields) => {
    try {
      await policyApi.update(id, updatedFields);
    } catch (err) {
      console.warn(`Backend API unavailable for updatePolicy(${id}), updating locally.`, err);
    }

    const list = getLocalPolicies();
    const index = list.findIndex((p) => String(p.id) === String(id));
    if (index !== -1) {
      list[index] = {
        ...list[index],
        ...updatedFields,
      };
      saveLocalPolicies(list);
      return list[index];
    }
    return null;
  },

  renewPolicy: async (id, newEndDate) => {
    try {
      await policyApi.renew(id, { endDate: newEndDate });
    } catch (err) {
      console.warn(`Backend API unavailable for renewPolicy(${id}), renewing locally.`, err);
    }

    const list = getLocalPolicies();
    const index = list.findIndex((p) => String(p.id) === String(id));
    if (index !== -1) {
      list[index].status = "ACTIVE";
      list[index].endDate = newEndDate || "2027-08-01";
      if (!Array.isArray(list[index].timeline)) list[index].timeline = [];
      list[index].timeline.unshift({
        id: Date.now(),
        title: "Policy Renewed",
        date: new Date().toLocaleString(),
        user: "Underwriting Bot",
        description: `Extended validity date to ${list[index].endDate}.`,
      });
      saveLocalPolicies(list);
      return list[index];
    }
    return null;
  },

  deletePolicy: async (id) => {
    try {
      await policyApi.delete(id);
    } catch (err) {
      console.warn(`Backend API unavailable for deletePolicy(${id}), deleting locally.`, err);
    }

    const list = getLocalPolicies();
    const filtered = list.filter((p) => String(p.id) !== String(id));
    saveLocalPolicies(filtered);
    return true;
  },
};
