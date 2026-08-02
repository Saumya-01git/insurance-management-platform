import axiosInstance from "../api/axiosInstance";

// Initial real tickets fallback if backend endpoint unavailable
const initialMockTickets = [
  {
    id: "TKT-901249",
    ticketId: "TKT-901249",
    subject: "Question about Comprehensive Health Coverage limits & Add-ons",
    category: "POLICY_HELP",
    urgency: "NORMAL",
    status: "IN_PROGRESS",
    raisedBy: {
      name: "Naira",
      email: "naira@gmail.com",
      role: "CUSTOMER",
    },
    assignedAgent: {
      name: "Saumya",
      email: "saumya@insurepulse.io",
      role: "AGENT",
    },
    message: "Hi Agent Saumya, I wanted to verify if my Commercial Property #POL-9025 policy includes flood endorsement coverages.",
    createdAt: "2026-08-02T08:15:00.000Z",
    responses: [
      {
        id: "RESP-1",
        senderName: "Saumya",
        senderRole: "AGENT",
        message: "Hi Naira! Yes, your Commercial Property policy #POL-9025 includes Tier 1 Natural Hazard endorsement coverages up to $150,000.",
        timestamp: "2026-08-02T08:45:00.000Z",
      },
    ],
  },
  {
    id: "TKT-901248",
    ticketId: "TKT-901248",
    subject: "Underwriting Limit Increase Request from $1.5M to $2.0M",
    category: "POLICY_HELP",
    urgency: "HIGH",
    status: "IN_PROGRESS",
    raisedBy: {
      name: "David Vance",
      email: "david.vance@company.com",
      role: "CUSTOMER",
    },
    assignedAgent: {
      name: "Saumya",
      email: "saumya@insurepulse.io",
      role: "AGENT",
    },
    message: "Hi Saumya, I would like to increase my commercial property coverage limit from $1.5M to $2.0M before Q3.",
    createdAt: "2026-08-01T09:30:00.000Z",
    responses: [
      {
        id: "RESP-2",
        senderName: "Saumya",
        senderRole: "AGENT",
        message: "Hi David! I have submitted an underwriting endorsement request to increase your limit to $2.0M. Please upload your updated property valuation certificate to the vault.",
        timestamp: "2026-08-01T10:15:00.000Z",
      },
    ],
  },
  {
    id: "TKT-482019",
    ticketId: "TKT-482019",
    subject: "Fleet Expansion Underwriting Risk Override Clearance",
    category: "UNDERWRITING_OVERRIDE",
    urgency: "URGENT",
    status: "OPEN",
    raisedBy: {
      name: "Apex Logistics Corp",
      email: "claims@apexlogistics.com",
      role: "CUSTOMER",
    },
    assignedAgent: {
      name: "Sarah Jenkins",
      email: "sarah.j@acme.org",
      role: "AGENT",
    },
    message: "Requesting underwriting clearance for Apex Logistics Corp fleet expansion policy (#POL-7712).",
    createdAt: "2026-08-01T14:20:00.000Z",
    responses: [],
  },
  {
    id: "TKT-110482",
    ticketId: "TKT-110482",
    subject: "Disability Indemnity Audit Review for Executive Policy",
    category: "POLICY_HELP",
    urgency: "NORMAL",
    status: "RESOLVED",
    raisedBy: {
      name: "Marcus Aurelius",
      email: "m.aurelius@rome.org",
      role: "CUSTOMER",
    },
    assignedAgent: {
      name: "Michael Sterling",
      email: "m.sterling@gmail.com",
      role: "AGENT",
    },
    message: "Audit report on disability indemnity policy #POL-3329 clearance.",
    createdAt: "2026-07-30T11:00:00.000Z",
    responses: [
      {
        id: "RESP-3",
        senderName: "Michael Sterling",
        senderRole: "AGENT",
        message: "Executive disability policy verified operational with $2M coverage limit.",
        timestamp: "2026-07-30T11:45:00.000Z",
      },
    ],
  },
];

let localTickets = [...initialMockTickets];

export const ticketService = {
  getTickets: async (role) => {
    try {
      const response = await axiosInstance.get("/tickets", { params: { role } });
      if (Array.isArray(response.data) && response.data.length > 0) {
        localTickets = response.data;
        return response.data;
      }
      return localTickets;
    } catch (err) {
      console.warn("Backend tickets API offline, serving local carrier ticket store.");
      return localTickets;
    }
  },

  createTicket: async (ticketData) => {
    try {
      const response = await axiosInstance.post("/tickets", ticketData);
      if (response.data && response.data.ticket) {
        localTickets.unshift(response.data.ticket);
        return response.data.ticket;
      }
    } catch (err) {
      console.warn("Backend API offline, persisting ticket in carrier local store.");
    }

    const generatedId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTicket = {
      id: generatedId,
      ticketId: generatedId,
      subject: ticketData.subject,
      category: ticketData.category || "GENERAL",
      urgency: ticketData.urgency || "NORMAL",
      status: "OPEN",
      raisedBy: {
        name: ticketData.user?.name || "Naira",
        email: ticketData.user?.email || "naira@gmail.com",
        role: (ticketData.user?.role || "CUSTOMER").toUpperCase(),
      },
      assignedAgent: ticketData.assignedAgent || {
        name: "Saumya",
        email: "saumya@insurepulse.io",
        role: "AGENT",
      },
      message: ticketData.message,
      createdAt: new Date().toISOString(),
      responses: [],
    };

    localTickets.unshift(newTicket);
    return newTicket;
  },

  replyToTicket: async (ticketId, replyData) => {
    try {
      const response = await axiosInstance.post(`/tickets/${ticketId}/reply`, replyData);
      if (response.data && response.data.ticket) {
        const idx = localTickets.findIndex((t) => t.id === ticketId);
        if (idx !== -1) localTickets[idx] = response.data.ticket;
        return response.data.ticket;
      }
    } catch (err) {
      console.warn("Backend API offline, persisting reply locally.");
    }

    const idx = localTickets.findIndex((t) => t.id === ticketId || t.ticketId === ticketId);
    if (idx !== -1) {
      localTickets[idx].responses.push({
        id: `RESP-${Date.now()}`,
        senderName: replyData.senderName || "Saumya",
        senderRole: (replyData.senderRole || "AGENT").toUpperCase(),
        message: replyData.message,
        timestamp: new Date().toISOString(),
      });
      localTickets[idx].status = replyData.status || "IN_PROGRESS";
      return localTickets[idx];
    }
    throw new Error("Ticket not found");
  },
};
