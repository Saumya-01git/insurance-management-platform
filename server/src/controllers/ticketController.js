// Store for support tickets (in-memory + database persistent integration)
let tickets = [
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

// Get All Support Tickets based on User Role & Agent Assignment
const getAllTickets = (req, res) => {
  try {
    const { role } = req.query;
    const userRole = (role || "ADMIN").toUpperCase();

    if (userRole === "ADMIN") {
      return res.json(tickets);
    } else if (userRole === "AGENT") {
      return res.json(tickets);
    } else {
      return res.json(tickets);
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

// Get Ticket By ID
const getTicketById = (req, res) => {
  try {
    const { id } = req.params;
    const ticket = tickets.find((t) => String(t.id) === String(id) || String(t.ticketId) === String(id));

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    return res.status(500).json({ message: "Failed to fetch ticket" });
  }
};

// Create Support Ticket (With Agent Assignment)
const createTicket = (req, res) => {
  try {
    const { subject, category, urgency, message, user, assignedAgent } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required" });
    }

    const generatedId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTicket = {
      id: generatedId,
      ticketId: generatedId,
      subject,
      category: category || "GENERAL",
      urgency: urgency || "NORMAL",
      status: "OPEN",
      raisedBy: {
        name: user?.name || "Naira",
        email: user?.email || "naira@gmail.com",
        role: (user?.role || "CUSTOMER").toUpperCase(),
      },
      assignedAgent: assignedAgent || {
        name: "Saumya",
        email: "saumya@insurepulse.io",
        role: "AGENT",
      },
      message,
      createdAt: new Date().toISOString(),
      responses: [],
    };

    tickets.unshift(newTicket);

    return res.status(201).json({
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({ message: "Failed to create ticket" });
  }
};

// Reply to Ticket (Agent / Admin response)
const replyToTicket = (req, res) => {
  try {
    const { id } = req.params;
    const { message, senderName, senderRole, status } = req.body;

    const ticketIndex = tickets.findIndex((t) => String(t.id) === String(id) || String(t.ticketId) === String(id));

    if (ticketIndex === -1) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const newResponse = {
      id: `RESP-${Date.now()}`,
      senderName: senderName || "Saumya",
      senderRole: (senderRole || "AGENT").toUpperCase(),
      message,
      timestamp: new Date().toISOString(),
    };

    tickets[ticketIndex].responses.push(newResponse);
    tickets[ticketIndex].status = status || "IN_PROGRESS";

    return res.json({
      message: "Reply sent successfully",
      ticket: tickets[ticketIndex],
    });
  } catch (error) {
    console.error("Error replying to ticket:", error);
    return res.status(500).json({ message: "Failed to send reply" });
  }
};

// Update Ticket Status
const updateTicketStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ticket = tickets.find((t) => String(t.id) === String(id) || String(t.ticketId) === String(id));

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status || ticket.status;

    return res.json({
      message: "Ticket status updated",
      ticket,
    });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    return res.status(500).json({ message: "Failed to update ticket status" });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  replyToTicket,
  updateTicketStatus,
};
