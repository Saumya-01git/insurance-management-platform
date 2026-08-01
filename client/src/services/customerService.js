import { customerApi } from "../api/customerApi";

// Initial mock dataset for enterprise carrier platform
const MOCK_CUSTOMERS = [
  {
    id: "CUST-1049",
    fullName: "David Vance",
    email: "david.vance@company.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    dateOfBirth: "1985-06-14",
    gender: "Male",
    address: "742 Evergreen Terrace",
    city: "Springfield",
    state: "Illinois",
    pinCode: "62704",
    identityProof: "Passport #P8820194",
    occupation: "Senior Logistics Director",
    nominee: "Laura Vance (Spouse)",
    emergencyContact: "+1 (555) 987-6543",
    status: "ACTIVE",
    policiesCount: 3,
    totalPremium: 45000,
    createdDate: "2026-08-01",
    policies: [
      { id: "POL-9012", type: "Commercial Property", coverage: "$1,500,000", premium: 32000, status: "ACTIVE", renewalDate: "2027-08-01" },
      { id: "POL-4410", type: "Executive Health", coverage: "$500,000", premium: 8500, status: "ACTIVE", renewalDate: "2027-03-15" },
      { id: "POL-2201", type: "Fleet Vehicle", coverage: "$250,000", premium: 4500, status: "ACTIVE", renewalDate: "2026-11-20" },
    ],
    claims: [
      { id: "CLM-9021", type: "Property Loss", amount: "$45,000", status: "UNDER_REVIEW", date: "2026-08-01", description: "Water pipe burst in East Wing facility." },
    ],
    documents: [
      { id: "DOC-101", name: "David_Vance_Passport.pdf", type: "Identity Proof", size: "2.4 MB", date: "2026-08-01", status: "VERIFIED" },
      { id: "DOC-102", name: "Commercial_Facility_Deed.pdf", type: "Address Proof", size: "4.1 MB", date: "2026-08-01", status: "VERIFIED" },
      { id: "DOC-103", name: "Policy_Contract_POL9012.pdf", type: "Policy Contract", size: "1.8 MB", date: "2026-08-01", status: "SIGNED" },
    ],
    payments: [
      { id: "PAY-8801", date: "2026-08-01", amount: "$45,000", method: "ACH Transfer", status: "COMPLETED" },
      { id: "PAY-7740", date: "2025-08-01", amount: "$42,000", method: "Wire Transfer", status: "COMPLETED" },
    ],
    timeline: [
      { id: 1, title: "Claim Filed", date: "Aug 01, 2026 - 10:14 AM", user: "David Vance", description: "Submitted claim #CLM-9021 for $45,000 Property Loss." },
      { id: 2, title: "Policy Underwritten", date: "Aug 01, 2026 - 09:00 AM", user: "Underwriting Bot", description: "Approved Commercial Property policy #POL-9012." },
      { id: 3, title: "Account Created", date: "Aug 01, 2026 - 08:30 AM", user: "Agent Saumya", description: "Customer account provisioned in Carrier Suite." },
    ],
  },
  {
    id: "CUST-1048",
    fullName: "Sarah Jenkins",
    email: "sarah.j@acme.org",
    phone: "+1 (555) 876-5432",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    dateOfBirth: "1992-11-23",
    gender: "Female",
    address: "100 Innovation Way",
    city: "Austin",
    state: "Texas",
    pinCode: "78701",
    identityProof: "DL #TX-904128",
    occupation: "VP of Engineering",
    nominee: "Mark Jenkins (Brother)",
    emergencyContact: "+1 (555) 345-6789",
    status: "ACTIVE",
    policiesCount: 2,
    totalPremium: 12700,
    createdDate: "2026-07-29",
    policies: [
      { id: "POL-3321", type: "Comprehensive Health", coverage: "$250,000", premium: 8200, status: "ACTIVE", renewalDate: "2027-07-29" },
      { id: "POL-1190", type: "Personal Auto", coverage: "$100,000", premium: 4500, status: "ACTIVE", renewalDate: "2027-01-15" },
    ],
    claims: [
      { id: "CLM-9019", type: "Medical Expense", amount: "$3,850", status: "APPROVED", date: "2026-07-30", description: "Outpatient surgery reimbursement." },
    ],
    documents: [
      { id: "DOC-201", name: "Sarah_Jenkins_Drivers_License.pdf", type: "Identity Proof", size: "1.9 MB", date: "2026-07-29", status: "VERIFIED" },
    ],
    payments: [
      { id: "PAY-8210", date: "2026-07-29", amount: "$12,700", method: "Credit Card (Visa)", status: "COMPLETED" },
    ],
    timeline: [
      { id: 1, title: "Claim Approved", date: "Jul 30, 2026 - 02:45 PM", user: "Claims Manager", description: "Claim #CLM-9019 approved for $3,850 payout." },
      { id: 2, title: "KYC Verified", date: "Jul 29, 2026 - 11:20 AM", user: "Compliance Engine", description: "Identity proof DL #TX-904128 verified." },
    ],
  },
  {
    id: "CUST-1047",
    fullName: "Apex Logistics Corp",
    email: "admin@apexlogistics.com",
    phone: "+1 (555) 432-1098",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    dateOfBirth: "2010-04-12",
    gender: "Other",
    address: "450 Corporate Boulevard",
    city: "Chicago",
    state: "Illinois",
    pinCode: "60601",
    identityProof: "EIN #36-992014",
    occupation: "Enterprise Logistics",
    nominee: "Board of Directors",
    emergencyContact: "+1 (555) 111-2222",
    status: "ACTIVE",
    policiesCount: 5,
    totalPremium: 148000,
    createdDate: "2026-07-27",
    policies: [
      { id: "POL-7712", type: "Fleet Transport Liability", coverage: "$10,000,000", premium: 85000, status: "ACTIVE", renewalDate: "2026-08-05" },
      { id: "POL-7713", type: "Cargo Transit Risk", coverage: "$5,000,000", premium: 42000, status: "ACTIVE", renewalDate: "2027-07-27" },
      { id: "POL-7714", type: "Cyber Defense Insurance", coverage: "$2,000,000", premium: 21000, status: "ACTIVE", renewalDate: "2027-07-27" },
    ],
    claims: [
      { id: "CLM-9017", type: "Cyber Incident", amount: "$18,200", status: "REJECTED", date: "2026-07-25", description: "Phishing remediation outside covered scope." },
    ],
    documents: [
      { id: "DOC-301", name: "Apex_Corporate_Registration.pdf", type: "Business License", size: "5.6 MB", date: "2026-07-27", status: "VERIFIED" },
    ],
    payments: [
      { id: "PAY-7001", date: "2026-07-27", amount: "$148,000", method: "Bank Wire", status: "COMPLETED" },
    ],
    timeline: [
      { id: 1, title: "Policy Renewal Notice", date: "Jul 28, 2026", user: "System", description: "Renewal alert dispatched for Policy #POL-7712." },
    ],
  },
  {
    id: "CUST-1046",
    fullName: "Michael Sterling",
    email: "m.sterling@gmail.com",
    phone: "+1 (555) 654-3210",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    dateOfBirth: "1978-09-05",
    gender: "Male",
    address: "128 Beacon Street",
    city: "Boston",
    state: "Massachusetts",
    pinCode: "02116",
    identityProof: "State ID #MA-00129",
    occupation: "Financial Analyst",
    nominee: "Jessica Sterling (Spouse)",
    emergencyContact: "+1 (555) 777-8888",
    status: "PENDING_KYC",
    policiesCount: 1,
    totalPremium: 3200,
    createdDate: "2026-07-24",
    policies: [
      { id: "POL-5001", type: "Term Life Coverage", coverage: "$500,000", premium: 3200, status: "PENDING_UNDERWRITING", renewalDate: "2027-07-24" },
    ],
    claims: [],
    documents: [
      { id: "DOC-401", name: "Sterling_ID_Proof_Pending.pdf", type: "Identity Proof", size: "1.2 MB", date: "2026-07-24", status: "PENDING_REVIEW" },
    ],
    payments: [],
    timeline: [
      { id: 1, title: "KYC Uploaded", date: "Jul 24, 2026", user: "Michael Sterling", description: "Identity proof submitted for underwriting." },
    ],
  },
  {
    id: "CUST-1045",
    fullName: "Elena Rostova",
    email: "elena.r@techcorp.io",
    phone: "+1 (555) 987-1234",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    dateOfBirth: "1988-12-01",
    gender: "Female",
    address: "888 Silicon Way",
    city: "San Jose",
    state: "California",
    pinCode: "95110",
    identityProof: "Passport #P990142",
    occupation: "Tech Co-Founder",
    nominee: "Alexander Rostova (Father)",
    emergencyContact: "+1 (555) 444-3333",
    status: "ACTIVE",
    policiesCount: 4,
    totalPremium: 28400,
    createdDate: "2026-07-20",
    policies: [
      { id: "POL-6641", type: "Comprehensive Health", coverage: "$1,000,000", premium: 14200, status: "ACTIVE", renewalDate: "2026-08-10" },
      { id: "POL-6642", type: "Homeowners Specialty", coverage: "$850,000", premium: 8200, status: "ACTIVE", renewalDate: "2027-07-20" },
      { id: "POL-6643", type: "Luxury Auto", coverage: "$150,000", premium: 6000, status: "ACTIVE", renewalDate: "2027-07-20" },
    ],
    claims: [],
    documents: [
      { id: "DOC-501", name: "Elena_Rostova_Passport.pdf", type: "Identity Proof", size: "3.1 MB", date: "2026-07-20", status: "VERIFIED" },
    ],
    payments: [
      { id: "PAY-6601", date: "2026-07-20", amount: "$28,400", method: "Credit Card", status: "COMPLETED" },
    ],
    timeline: [
      { id: 1, title: "Policy Issued", date: "Jul 20, 2026", user: "System", description: "Issued Homeowners & Luxury Auto policies." },
    ],
  },
  {
    id: "CUST-1044",
    fullName: "Marcus Aurelius",
    email: "marcus@rome.org",
    phone: "+1 (555) 321-7654",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    dateOfBirth: "1972-04-26",
    gender: "Male",
    address: "500 Empire Way",
    city: "Philadelphia",
    state: "Pennsylvania",
    pinCode: "19104",
    identityProof: "DL #PA-882109",
    occupation: "Chief Executive Officer",
    nominee: "Faustina Aurelius (Spouse)",
    emergencyContact: "+1 (555) 999-0000",
    status: "ACTIVE",
    policiesCount: 2,
    totalPremium: 18500,
    createdDate: "2026-07-15",
    policies: [
      { id: "POL-3329", type: "Term Life Coverage", coverage: "$2,000,000", premium: 12500, status: "ACTIVE", renewalDate: "2026-08-22" },
      { id: "POL-3330", type: "Executive Disability", coverage: "$500,000", premium: 6000, status: "ACTIVE", renewalDate: "2027-07-15" },
    ],
    claims: [
      { id: "CLM-9018", type: "Life Indemnity", amount: "$250,000", status: "PENDING", date: "2026-07-28", description: "Disability claim filed for medical leave." },
    ],
    documents: [],
    payments: [
      { id: "PAY-5501", date: "2026-07-15", amount: "$18,500", method: "ACH Transfer", status: "COMPLETED" },
    ],
    timeline: [
      { id: 1, title: "Disability Claim Filed", date: "Jul 28, 2026", user: "Marcus Aurelius", description: "Claim #CLM-9018 submitted." },
    ],
  },
];

// Local storage helper for persistence across reloads
const STORAGE_KEY = "insurepulse_customers_data";

const getLocalCustomers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Error reading localStorage customers:", e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_CUSTOMERS));
  return MOCK_CUSTOMERS;
};

const saveLocalCustomers = (customers) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch (e) {
    console.error("Error saving localStorage customers:", e);
  }
};

export const customerService = {
  // Get all customers (with backend API fallback)
  getCustomers: async () => {
    try {
      const apiData = await customerApi.getAll();
      if (Array.isArray(apiData) && apiData.length > 0) {
        return apiData.map((cust) => ({
          ...cust,
          fullName: cust.name || cust.fullName || "Carrier Customer",
          policiesCount: cust.policiesCount || cust.policies?.length || 1,
          totalPremium: cust.totalPremium || 12500,
          status: cust.status || "ACTIVE",
        }));
      }
    } catch (err) {
      console.warn("Backend API unavailable for getCustomers, using local storage dataset.", err);
    }
    return getLocalCustomers();
  },

  // Get single customer by ID
  getCustomerById: async (id) => {
    try {
      const apiData = await customerApi.getById(id);
      if (apiData) return apiData;
    } catch (err) {
      console.warn(`Backend API unavailable for getCustomerById(${id}), using local storage dataset.`, err);
    }
    const list = getLocalCustomers();
    return list.find((c) => String(c.id) === String(id) || c.id === id) || list[0];
  },

  // Create new customer
  createCustomer: async (customerData) => {
    let newCustomer = null;
    try {
      const res = await customerApi.create(customerData);
      if (res) newCustomer = res;
    } catch (err) {
      console.warn("Backend API unavailable for createCustomer, saving locally.", err);
    }

    const list = getLocalCustomers();
    const newId = `CUST-${1050 + list.length}`;
    const formattedData = {
      id: newId,
      fullName: customerData.fullName || customerData.name || "New Customer",
      email: customerData.email,
      phone: customerData.phone,
      avatar: customerData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      dateOfBirth: customerData.dateOfBirth || "1990-01-01",
      gender: customerData.gender || "Male",
      address: customerData.address || "123 Carrier Way",
      city: customerData.city || "New York",
      state: customerData.state || "NY",
      pinCode: customerData.pinCode || "10001",
      identityProof: customerData.identityProof || "Passport #P10099",
      occupation: customerData.occupation || "Enterprise Executive",
      nominee: customerData.nominee || "Family Nominee",
      emergencyContact: customerData.emergencyContact || "+1 (555) 000-1111",
      status: customerData.status || "ACTIVE",
      policiesCount: 0,
      totalPremium: 0,
      createdDate: new Date().toISOString().split("T")[0],
      policies: [],
      claims: [],
      documents: customerData.identityProof
        ? [{ id: `DOC-${Date.now()}`, name: "Identity_Proof.pdf", type: "Identity Proof", size: "2.1 MB", date: new Date().toISOString().split("T")[0], status: "VERIFIED" }]
        : [],
      payments: [],
      timeline: [
        { id: 1, title: "Customer Account Created", date: new Date().toLocaleString(), user: "Current Agent", description: "Added to Carrier Suite platform." },
      ],
      ...newCustomer,
    };

    list.unshift(formattedData);
    saveLocalCustomers(list);
    return formattedData;
  },

  // Update existing customer
  updateCustomer: async (id, updatedFields) => {
    try {
      await customerApi.update(id, updatedFields);
    } catch (err) {
      console.warn(`Backend API unavailable for updateCustomer(${id}), updating locally.`, err);
    }

    const list = getLocalCustomers();
    const index = list.findIndex((c) => String(c.id) === String(id));
    if (index !== -1) {
      list[index] = {
        ...list[index],
        ...updatedFields,
        fullName: updatedFields.fullName || updatedFields.name || list[index].fullName,
      };
      saveLocalCustomers(list);
      return list[index];
    }
    return null;
  },

  // Delete customer
  deleteCustomer: async (id) => {
    try {
      await customerApi.delete(id);
    } catch (err) {
      console.warn(`Backend API unavailable for deleteCustomer(${id}), deleting locally.`, err);
    }

    const list = getLocalCustomers();
    const filtered = list.filter((c) => String(c.id) !== String(id));
    saveLocalCustomers(filtered);
    return true;
  },
};
