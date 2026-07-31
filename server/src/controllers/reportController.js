const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Dashboard Summary
const getDashboardSummary = async (req, res) => {

    try {

        const totalCustomers = await prisma.customer.count();

        const totalPolicies = await prisma.policy.count();

        const activePolicies = await prisma.policy.count({
            where: {
                status: "ACTIVE"
            }
        });

        const cancelledPolicies = await prisma.policy.count({
            where: {
                status: "CANCELLED"
            }
        });

        const totalPayments = await prisma.premiumPayment.count();

        const pendingPayments = await prisma.premiumPayment.count({
            where: {
                paymentStatus: "PENDING"
            }
        });

        const overduePayments = await prisma.premiumPayment.count({
            where: {
                paymentStatus: "OVERDUE"
            }
        });

        const paidPayments = await prisma.premiumPayment.findMany({
            where: {
                paymentStatus: "PAID"
            }
        });

        const totalPremiumCollected = paidPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        const totalClaims = await prisma.claim.count();

        const pendingClaims = await prisma.claim.count({
            where: {
                status: "PENDING"
            }
        });

        const approvedClaims = await prisma.claim.count({
            where: {
                status: "APPROVED"
            }
        });

        const rejectedClaims = await prisma.claim.count({
            where: {
                status: "REJECTED"
            }
        });

        const totalDocuments = await prisma.document.count();

        res.json({
            totalCustomers,
            totalPolicies,
            activePolicies,
            cancelledPolicies,
            totalPayments,
            pendingPayments,
            overduePayments,
            totalPremiumCollected,
            totalClaims,
            pendingClaims,
            approvedClaims,
            rejectedClaims,
            totalDocuments
        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Customer Report
const getCustomerReport = async (req, res) => {

    try {

        const {
    search,
    page = 1,
    limit = 5
} = req.query;

const skip = (page - 1) * limit;

const totalCustomers = await prisma.customer.count({

    where: search
        ? {
            user: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        email: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        }
        : {}

});

const customers = await prisma.customer.findMany({

    where: search
        ? {
            user: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        email: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        }
        : {},
    
        skip: Number(skip),

        take: Number(limit),
    include: {

        user: true,

        policies: {
            include: {
                claims: true
            }
        },

        documents: true

    }

});

        const report = customers.map(customer => {

            const activePolicies = customer.policies.filter(
                policy => policy.status === "ACTIVE"
            ).length;

            const totalClaims = customer.policies.reduce(

                (total, policy) => total + policy.claims.length,

                0

            );

            return {

                customerId: customer.id,

                customerName: customer.user.name,

                email: customer.user.email,

                phone: customer.phone,

                address: customer.address,

                totalPolicies: customer.policies.length,

                activePolicies,

                totalClaims,

                totalDocuments: customer.documents.length

            };

        });

        res.json({

    currentPage: Number(page),

    pageSize: Number(limit),

    totalCustomers,

    totalPages: Math.ceil(totalCustomers / limit),

    customers: report

});

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Policy Report
const getPolicyReport = async (req, res) => {

    try {

        const policies = await prisma.policy.findMany({

            include: {

                customer: {
                    include: {
                        user: true
                    }
                },

                claims: true

            }

        });

        const report = policies.map(policy => {

            const approvedClaims = policy.claims.filter(
                claim => claim.status === "APPROVED"
            ).length;

            const pendingClaims = policy.claims.filter(
                claim => claim.status === "PENDING"
            ).length;

            const rejectedClaims = policy.claims.filter(
                claim => claim.status === "REJECTED"
            ).length;

            return {

                policyId: policy.id,

                policyNumber: policy.policyNumber,

                policyType: policy.policyType,

                customerName: policy.customer.user.name,

                premiumAmount: policy.premiumAmount,

                status: policy.status,

                totalClaims: policy.claims.length,

                approvedClaims,

                pendingClaims,

                rejectedClaims

            };

        });

        res.json(report);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Revenue Report
const getRevenueReport = async (req, res) => {

    try {

        const paidPayments = await prisma.premiumPayment.findMany({
            where: {
                paymentStatus: "PAID"
            }
        });

        const pendingPayments = await prisma.premiumPayment.count({
            where: {
                paymentStatus: "PENDING"
            }
        });

        const overduePayments = await prisma.premiumPayment.count({
            where: {
                paymentStatus: "OVERDUE"
            }
        });

        const totalRevenue = paidPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        const averagePremium =
            paidPayments.length > 0
                ? totalRevenue / paidPayments.length
                : 0;

        const highestPayment =
            paidPayments.length > 0
                ? Math.max(...paidPayments.map(payment => payment.amount))
                : 0;

        const lowestPayment =
            paidPayments.length > 0
                ? Math.min(...paidPayments.map(payment => payment.amount))
                : 0;

        res.json({

            totalRevenue,

            totalPaidPayments: paidPayments.length,

            pendingPayments,

            overduePayments,

            averagePremium,

            highestPayment,

            lowestPayment

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Business Insights
const getBusinessInsights = async (req, res) => {

    try {

        // Paid Payments
        const paidPayments = await prisma.premiumPayment.findMany({
            where: {
                paymentStatus: "PAID"
            }
        });

        const totalRevenue = paidPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        // Approved Claims
        const approvedClaims = await prisma.claim.findMany({
            where: {
                status: "APPROVED"
            }
        });

        const claimPayout = approvedClaims.reduce(
            (total, claim) => total + claim.claimAmount,
            0
        );

        // Estimated Profit
        const estimatedProfit = totalRevenue - claimPayout;

        // Claim Statistics
        const totalClaims = await prisma.claim.count();

        const approvedClaimCount = approvedClaims.length;

        const claimApprovalRate =
            totalClaims > 0
                ? Number(
                    ((approvedClaimCount / totalClaims) * 100).toFixed(2)
                )
                : 0;

        // Policy Statistics
        const totalPolicies = await prisma.policy.count();

        const activePolicies = await prisma.policy.count({
            where: {
                status: "ACTIVE"
            }
        });

        const activePolicyPercentage =
            totalPolicies > 0
                ? Number(
                    ((activePolicies / totalPolicies) * 100).toFixed(2)
                )
                : 0;

        // Most Popular Policy
        const policies = await prisma.policy.findMany();

        const policyCount = {};

        policies.forEach(policy => {

            policyCount[policy.policyType] =
                (policyCount[policy.policyType] || 0) + 1;

        });

        let max = Math.max(...Object.values(policyCount), 0);

const mostPopularPolicies = Object.keys(policyCount).filter(

    policyType => policyCount[policyType] === max

);

        // Average Claim Amount
        const claims = await prisma.claim.findMany();

        const averageClaimAmount =
            claims.length > 0
                ? Number(
                    (
                        claims.reduce(
                            (sum, claim) => sum + claim.claimAmount,
                            0
                        ) / claims.length
                    ).toFixed(2)
                )
                : 0;

        // Business Status
const profitStatus =
    estimatedProfit > 0 ? "Healthy" : "Loss";

const riskLevel =
    claimApprovalRate >= 70
        ? "Low"
        : claimApprovalRate >= 40
        ? "Medium"
        : "High";

const portfolioHealth =
    activePolicyPercentage >= 70
        ? "Excellent"
        : activePolicyPercentage >= 40
        ? "Good"
        : "Needs Improvement";

res.json({

    totalRevenue,

    claimPayout,

    estimatedProfit,

    profitStatus,

    claimApprovalRate,

    riskLevel,

    activePolicyPercentage,

    portfolioHealth,

    mostPopularPolicies,

    averageClaimAmount

});

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Monthly Revenue Report
const getMonthlyRevenueReport = async (req, res) => {

    try {

        const paidPayments = await prisma.premiumPayment.findMany({
            where: {
                paymentStatus: "PAID"
            }
        });

        const monthlyRevenue = {};

        paidPayments.forEach(payment => {

            const month = payment.paymentDate.toLocaleString("default", {
                month: "long",
                year: "numeric"
            });

            monthlyRevenue[month] =
                (monthlyRevenue[month] || 0) + payment.amount;

        });

        const report = Object.keys(monthlyRevenue).map(month => ({

            month,

            revenue: monthlyRevenue[month]

        }));

        res.json(report);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Recent Activities Report
const getRecentActivities = async (req, res) => {

    try {

        const latestCustomer = await prisma.customer.findFirst({

            orderBy: {
                id: "desc"
            },

            include: {
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    }
}

        });

        const latestPolicy = await prisma.policy.findFirst({

            orderBy: {
                id: "desc"
            },

            include: {

                customer: {

                    include: {
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    }
}

                }

            }

        });

        const latestPayment = await prisma.premiumPayment.findFirst({

            orderBy: {
                id: "desc"
            },

            include: {

                policy: {

                    include: {

                        customer: {

                            include: {
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    }
}

                        }

                    }

                }

            }

        });

        const latestClaim = await prisma.claim.findFirst({

            orderBy: {
                id: "desc"
            },

            include: {

                policy: {

                    include: {

                        customer: {

                            include: {
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    }
}

                        }

                    }

                }

            }

        });

        const latestDocument = await prisma.document.findFirst({

            orderBy: {
                id: "desc"
            },

            include: {

                customer: {

                    include: {
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    }
}

                }

            }

        });

        res.json({

            latestCustomer,

            latestPolicy,

            latestPayment,

            latestClaim,

            latestDocument

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    getDashboardSummary,
    getCustomerReport,
    getPolicyReport,
    getRevenueReport,
    getBusinessInsights,
    getMonthlyRevenueReport,
    getRecentActivities
};