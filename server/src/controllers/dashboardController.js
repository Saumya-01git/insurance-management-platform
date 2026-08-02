const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * GET /api/dashboard/summary
 */
const getDashboardSummary = async (req, res) => {
  try {
    const totalCustomers = await prisma.customer.count();
    const totalPolicies = await prisma.policy.count();
    const activePolicies = await prisma.policy.count({ where: { status: "ACTIVE" } });
    const pendingClaims = await prisma.claim.count({ where: { status: "PENDING" } });

    const paidPayments = await prisma.premiumPayment.findMany({
      where: { paymentStatus: "PAID" },
    });
    const totalRevenue = paidPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

    res.json({
      success: true,
      data: {
        totalCustomers,
        totalPolicies,
        activePolicies,
        pendingClaims,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Dashboard Summary Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * GET /api/dashboard/analytics
 */
const getDashboardAnalytics = async (req, res) => {
  try {
    const policies = await prisma.policy.findMany();
    const claims = await prisma.claim.findMany();
    const payments = await prisma.premiumPayment.findMany({ where: { paymentStatus: "PAID" } });

    // Policies by type
    const policyTypes = {};
    policies.forEach((p) => {
      policyTypes[p.policyType] = (policyTypes[p.policyType] || 0) + 1;
    });
    const policiesByType = Object.keys(policyTypes).map((type) => ({
      type,
      count: policyTypes[type],
    }));

    // Claims status breakdown
    const claimsByStatus = [
      { name: "Approved", value: claims.filter((c) => c.status === "APPROVED").length },
      { name: "Pending", value: claims.filter((c) => c.status === "PENDING").length },
      { name: "Rejected", value: claims.filter((c) => c.status === "REJECTED").length },
    ];

    res.json({
      success: true,
      data: {
        policiesByType,
        claimsByStatus,
        totalPaidPayments: payments.length,
      },
    });
  } catch (error) {
    console.error("Dashboard Analytics Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * GET /api/dashboard/activity
 */
const getDashboardActivity = async (req, res) => {
  try {
    const latestPolicy = await prisma.policy.findFirst({
      orderBy: { createdAt: "desc" },
      include: { customer: { include: { user: true } } },
    });
    const latestClaim = await prisma.claim.findFirst({
      orderBy: { id: "desc" },
      include: { policy: { include: { customer: { include: { user: true } } } } },
    });
    const latestPayment = await prisma.premiumPayment.findFirst({
      orderBy: { id: "desc" },
      include: { policy: true },
    });
    const latestCustomer = await prisma.customer.findFirst({
      orderBy: { id: "desc" },
      include: { user: true },
    });

    const activities = [];
    if (latestPolicy) {
      activities.push({
        user: latestPolicy.customer?.user?.name || "Agent Saumya",
        action: `Underwrote ${latestPolicy.policyType} Policy #${latestPolicy.policyNumber}.`,
        time: "Recent",
      });
    }
    if (latestClaim) {
      activities.push({
        user: latestClaim.policy?.customer?.user?.name || "Claimant",
        action: `Submitted claim for ${latestClaim.reason} ($${latestClaim.claimAmount}).`,
        time: "Recent",
      });
    }
    if (latestPayment) {
      activities.push({
        user: "System Auditor",
        action: `Processed premium payment of $${latestPayment.amount}.`,
        time: "Recent",
      });
    }
    if (latestCustomer) {
      activities.push({
        user: "Admin System",
        action: `Registered new customer profile for ${latestCustomer.user?.name}.`,
        time: "Recent",
      });
    }

    res.json({ success: true, data: activities });
  } catch (error) {
    console.error("Dashboard Activity Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * GET /api/dashboard/notifications
 */
const getDashboardNotifications = async (req, res) => {
  try {
    const pendingClaims = await prisma.claim.findMany({
      where: { status: "PENDING" },
      take: 2,
      include: { policy: { include: { customer: { include: { user: true } } } } },
    });

    const notifications = pendingClaims.map((c) => ({
      id: c.id,
      title: "Claim Pending Review",
      message: `Claim #${c.id} ($${c.claimAmount}) for ${c.reason} awaits underwriter approval.`,
      time: "Pending Action",
      type: "warning",
    }));

    res.json({ success: true, data: notifications });
  } catch (error) {
    console.error("Dashboard Notifications Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * GET /api/dashboard/renewals
 */
const getDashboardRenewals = async (req, res) => {
  try {
    const expiring = await prisma.policy.findMany({
      take: 5,
      orderBy: { endDate: "asc" },
      include: { customer: { include: { user: true } } },
    });

    const formatted = expiring.map((p) => {
      const now = new Date();
      const end = new Date(p.endDate);
      const daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

      return {
        id: p.id,
        policyNumber: p.policyNumber,
        policyType: p.policyType,
        customerName: p.customer?.user?.name || "Policyholder",
        premium: p.premiumAmount,
        daysRemaining: daysRemaining || 14,
        endDate: p.endDate,
      };
    });

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Dashboard Renewals Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * GET /api/dashboard/recent-customers
 */
const getRecentCustomers = async (req, res) => {
  try {
    const recent = await prisma.customer.findMany({
      take: 5,
      orderBy: { id: "desc" },
      include: { user: true, policies: true },
    });

    const formatted = recent.map((c) => ({
      id: c.id,
      name: c.user?.name || "Customer",
      email: c.user?.email || "customer@carrier.com",
      policiesCount: c.policies?.length || 0,
      phone: c.phone,
      address: c.address,
      joinedDate: c.user?.createdAt ? new Date(c.user.createdAt).toISOString().split("T")[0] : "Recent",
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Recent Customers Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * GET /api/dashboard/recent-claims
 */
const getRecentClaims = async (req, res) => {
  try {
    const recent = await prisma.claim.findMany({
      take: 5,
      orderBy: { id: "desc" },
      include: { policy: { include: { customer: { include: { user: true } } } } },
    });

    const formatted = recent.map((c) => ({
      id: c.id,
      claimId: `CLM-${c.id}`,
      customer: c.policy?.customer?.user?.name || "Policyholder",
      claimType: c.policy?.policyType || "Insurance",
      amount: c.claimAmount,
      reason: c.reason,
      status: c.status,
      date: c.submissionDate ? new Date(c.submissionDate).toISOString().split("T")[0] : "Recent",
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Recent Claims Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getDashboardSummary,
  getDashboardAnalytics,
  getDashboardActivity,
  getDashboardNotifications,
  getDashboardRenewals,
  getRecentCustomers,
  getRecentClaims,
};
