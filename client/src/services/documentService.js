import { documentApi } from "../api/documentApi";

const MOCK_DOCUMENTS = [
  {
    id: "DOC-901",
    documentId: "DOC-901",
    title: "Passport_KYC_Verification.pdf",
    category: "Identity / KYC",
    customer: "David Vance",
    customerId: "CUST-1049",
    policyNumber: "POL-9012",
    fileSize: "4.2 MB",
    fileType: "application/pdf",
    uploadDate: "2026-08-01",
    status: "VERIFIED",
    uploadedBy: "David Vance",
    notes: "Encrypted AES-256 vault storage verified.",
  },
  {
    id: "DOC-902",
    documentId: "DOC-902",
    title: "Property_Safety_Inspection.pdf",
    category: "Underwriting Loss Proof",
    customer: "Apex Logistics Corp",
    customerId: "CUST-1047",
    policyNumber: "POL-7712",
    fileSize: "8.5 MB",
    fileType: "application/pdf",
    uploadDate: "2026-07-28",
    status: "VERIFIED",
    uploadedBy: "Risk Auditor",
    notes: "Fire Marshall safety clearance score 98%.",
  },
  {
    id: "DOC-903",
    documentId: "DOC-903",
    title: "Hospital_Invoice_StJude.png",
    category: "Claim Evidence",
    customer: "Sarah Jenkins",
    customerId: "CUST-1048",
    policyNumber: "POL-3321",
    fileSize: "2.1 MB",
    fileType: "image/png",
    uploadDate: "2026-07-29",
    status: "VERIFIED",
    uploadedBy: "Sarah Jenkins",
    notes: "Outpatient surgery medical receipt.",
  },
  {
    id: "DOC-904",
    documentId: "DOC-904",
    title: "Fleet_Vehicle_Registration.pdf",
    category: "Policy Certificate",
    customer: "Apex Logistics Corp",
    customerId: "CUST-1047",
    policyNumber: "POL-7712",
    fileSize: "1.8 MB",
    fileType: "application/pdf",
    uploadDate: "2026-07-25",
    status: "PENDING_VERIFICATION",
    uploadedBy: "Agent Saumya",
    notes: "Awaiting transport department stamp verification.",
  },
];

const STORAGE_KEY = "insurepulse_documents_data";

const getLocalDocuments = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading localStorage documents:", e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DOCUMENTS));
  return MOCK_DOCUMENTS;
};

const saveLocalDocuments = (docs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch (e) {
    console.error("Error saving localStorage documents:", e);
  }
};

export const documentService = {
  getDocuments: async () => {
    try {
      const apiData = await documentApi.getAll();
      const rawList = Array.isArray(apiData)
        ? apiData
        : Array.isArray(apiData?.data)
        ? apiData.data
        : Array.isArray(apiData?.documents)
        ? apiData.documents
        : null;

      if (rawList && rawList.length > 0) {
        return rawList.map((doc) => ({
          ...doc,
          documentId: doc.documentId || doc.id || "DOC-901",
          title: doc.title || doc.name || doc.filename || "Carrier_Document.pdf",
          customer: typeof doc.customer === "object" ? (doc.customer?.fullName || "Carrier Customer") : (doc.customer || "Carrier Customer"),
          category: doc.category || "Identity / KYC",
          fileSize: doc.fileSize || "2.4 MB",
          status: doc.status || "VERIFIED",
        }));
      }
    } catch (err) {
      console.warn("Backend API unavailable for getDocuments, using local dataset.", err);
    }
    return getLocalDocuments();
  },

  getDocumentById: async (id) => {
    try {
      const apiData = await documentApi.getById(id);
      const resData = apiData?.data || apiData;
      if (resData && typeof resData === "object") return resData;
    } catch (err) {
      console.warn(`Backend API unavailable for getDocumentById(${id}), using local dataset.`, err);
    }
    const list = getLocalDocuments();
    return list.find((d) => String(d.id) === String(id) || d.documentId === id) || list[0];
  },

  uploadDocument: async (formData) => {
    let newDoc = null;
    try {
      const res = await documentApi.upload(formData);
      if (res) newDoc = res?.data || res;
    } catch (err) {
      console.warn("Backend API unavailable for uploadDocument, saving locally.", err);
    }

    const list = getLocalDocuments();
    const newId = `DOC-${905 + list.length}`;
    const formattedData = {
      id: newId,
      documentId: newId,
      title: formData.title || formData.file?.name || "Uploaded_Document.pdf",
      category: formData.category || "Identity / KYC",
      customer: formData.customer || "David Vance",
      customerId: formData.customerId || "CUST-1049",
      policyNumber: formData.policyNumber || "POL-9012",
      fileSize: formData.fileSize || "3.5 MB",
      fileType: formData.fileType || "application/pdf",
      uploadDate: new Date().toISOString().split("T")[0],
      status: "VERIFIED",
      uploadedBy: "Agent Saumya",
      notes: formData.notes || "Encrypted vault upload.",
      ...newDoc,
    };

    list.unshift(formattedData);
    saveLocalDocuments(list);
    return formattedData;
  },

  deleteDocument: async (id) => {
    try {
      await documentApi.delete(id);
    } catch (err) {
      console.warn(`Backend API unavailable for deleteDocument(${id}), deleting locally.`, err);
    }

    const list = getLocalDocuments();
    const filtered = list.filter((d) => String(d.id) !== String(id));
    saveLocalDocuments(filtered);
    return true;
  },
};
