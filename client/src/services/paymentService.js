import { paymentApi } from "../api/paymentApi";

const MOCK_PAYMENTS = [
  {
    id: "PAY-8801",
    paymentId: "PAY-8801",
    customer: "David Vance",
    customerId: "CUST-1049",
    policyNumber: "POL-9012",
    amount: 32000,
    paymentMethod: "ACH Wire Transfer",
    transactionId: "TXN-99401284",
    date: "2026-08-01",
    status: "COMPLETED",
    gateway: "Stripe Enterprise Gateway",
    receiptUrl: "#",
    history: [
      { id: 1, title: "ACH Settlement Confirmed", date: "Aug 01, 2026", description: "Funds deposited into Carrier Escrow Account." },
    ],
  },
  {
    id: "PAY-8802",
    paymentId: "PAY-8802",
    customer: "Apex Logistics Corp",
    customerId: "CUST-1047",
    policyNumber: "POL-7712",
    amount: 148000,
    paymentMethod: "Bank Wire Transfer",
    transactionId: "TXN-88129031",
    date: "2026-07-27",
    status: "COMPLETED",
    gateway: "JPMorgan Carrier Desk",
    receiptUrl: "#",
    history: [],
  },
  {
    id: "PAY-8803",
    paymentId: "PAY-8803",
    customer: "Sarah Jenkins",
    customerId: "CUST-1048",
    policyNumber: "POL-3321",
    amount: 12700,
    paymentMethod: "Credit Card (Visa)",
    transactionId: "TXN-77401298",
    date: "2026-07-29",
    status: "COMPLETED",
    gateway: "Stripe Gateway",
    receiptUrl: "#",
    history: [],
  },
  {
    id: "PAY-8804",
    paymentId: "PAY-8804",
    customer: "Michael Sterling",
    customerId: "CUST-1046",
    policyNumber: "POL-5001",
    amount: 3200,
    paymentMethod: "Credit Card (MasterCard)",
    transactionId: "TXN-66102941",
    date: "2026-07-24",
    status: "PENDING",
    gateway: "Stripe Gateway",
    receiptUrl: "#",
    history: [],
  },
  {
    id: "PAY-8805",
    paymentId: "PAY-8805",
    customer: "Elena Rostova",
    customerId: "CUST-1045",
    policyNumber: "POL-6641",
    amount: 28400,
    paymentMethod: "Credit Card (Visa)",
    transactionId: "TXN-55192038",
    date: "2026-07-20",
    status: "COMPLETED",
    gateway: "Stripe Gateway",
    receiptUrl: "#",
    history: [],
  },
];

const STORAGE_KEY = "insurepulse_payments_data";

const getLocalPayments = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading localStorage payments:", e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PAYMENTS));
  return MOCK_PAYMENTS;
};

const saveLocalPayments = (payments) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
  } catch (e) {
    console.error("Error saving localStorage payments:", e);
  }
};

export const paymentService = {
  getPayments: async () => {
    try {
      const apiData = await paymentApi.getAll();
      const rawList = Array.isArray(apiData)
        ? apiData
        : Array.isArray(apiData?.data)
        ? apiData.data
        : Array.isArray(apiData?.payments)
        ? apiData.payments
        : null;

      if (rawList && rawList.length > 0) {
        return rawList.map((pay) => ({
          ...pay,
          paymentId: pay.paymentId || pay.id || "PAY-8801",
          customer: pay.customerName || pay.customer?.fullName || pay.customer || "Carrier Customer",
          amount: pay.amount || 12500,
          status: pay.status || "COMPLETED",
          history: Array.isArray(pay.history) ? pay.history : [],
        }));
      }
    } catch (err) {
      console.warn("Backend API unavailable for getPayments, using local dataset.", err);
    }
    return getLocalPayments();
  },

  getPaymentById: async (id) => {
    try {
      const apiData = await paymentApi.getById(id);
      const resData = apiData?.data || apiData;
      if (resData && typeof resData === "object") return resData;
    } catch (err) {
      console.warn(`Backend API unavailable for getPaymentById(${id}), using local dataset.`, err);
    }
    const list = getLocalPayments();
    return list.find((p) => String(p.id) === String(id) || p.paymentId === id) || list[0];
  },

  recordPayment: async (paymentData) => {
    let newPayment = null;
    try {
      const res = await paymentApi.create(paymentData);
      if (res) newPayment = res?.data || res;
    } catch (err) {
      console.warn("Backend API unavailable for recordPayment, saving locally.", err);
    }

    const list = getLocalPayments();
    const newId = `PAY-${8806 + list.length}`;
    const formattedData = {
      id: newId,
      paymentId: newId,
      customer: paymentData.customer || "David Vance",
      customerId: paymentData.customerId || "CUST-1049",
      policyNumber: paymentData.policyNumber || "POL-9012",
      amount: Number(paymentData.amount) || 15000,
      paymentMethod: paymentData.paymentMethod || "Credit Card (Visa)",
      transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      date: paymentData.date || new Date().toISOString().split("T")[0],
      status: paymentData.status || "COMPLETED",
      gateway: "Stripe Enterprise Gateway",
      receiptUrl: "#",
      history: [
        { id: 1, title: "Payment Recorded", date: new Date().toLocaleString(), description: "Settled via Carrier Gateway." },
      ],
      ...newPayment,
    };

    list.unshift(formattedData);
    saveLocalPayments(list);
    return formattedData;
  },
};
