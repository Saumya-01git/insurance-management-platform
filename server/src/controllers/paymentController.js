const prisma = require("../config/prisma");

// Create Premium Payment
const createPayment = async (req, res) => {

    try {

        const {
            policyId,
            paymentDate,
            dueDate,
            amount,
            paymentStatus
        } = req.body;

        if (
            !policyId ||
            !paymentDate ||
            !dueDate ||
            !amount ||
            !paymentStatus
        ) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        const policy = await prisma.policy.findUnique({
            where: {
                id: Number(policyId)
            }
        });

        if (!policy) {
            return res.status(404).json({
                message: "Policy not found"
            });
        }

        const payment = await prisma.premiumPayment.create({

            data: {

                policyId: Number(policyId),

                paymentDate: new Date(paymentDate),

                dueDate: new Date(dueDate),

                amount: Number(amount),

                paymentStatus

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
                                        email: true
                                    }

                                }

                            }

                        }

                    }

                }

            }

        });

        res.status(201).json({

            message: "Payment created successfully",

            payment

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get All Payments
const getAllPayments = async (req, res) => {

    try {

        const payments = await prisma.premiumPayment.findMany({

            include: {

                policy: {

                    include: {

                        customer: {

                            include: {

                                user: {

                                    select: {
                                        id: true,
                                        name: true,
                                        email: true
                                    }

                                }

                            }

                        }

                    }

                }

            }

        });

        res.json(payments);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Payment By ID
const getPaymentById = async (req, res) => {

    try {

        const { id } = req.params;

        const payment = await prisma.premiumPayment.findUnique({

            where: {
                id: Number(id)
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
                                        email: true
                                    }

                                }

                            }

                        }

                    }

                }

            }

        });

        if (!payment) {

            return res.status(404).json({
                message: "Payment not found"
            });

        }

        res.json(payment);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Update Payment
const updatePayment = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            paymentDate,
            dueDate,
            amount,
            paymentStatus
        } = req.body;

        const payment = await prisma.premiumPayment.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        const updatedPayment = await prisma.premiumPayment.update({

            where: {
                id: Number(id)
            },

            data: {

                paymentDate: new Date(paymentDate),

                dueDate: new Date(dueDate),

                amount: Number(amount),

                paymentStatus

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
                                        email: true
                                    }

                                }

                            }

                        }

                    }

                }

            }

        });

        res.json({

            message: "Payment updated successfully",

            payment: updatedPayment

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Delete Payment
const deletePayment = async (req, res) => {

    try {

        const { id } = req.params;

        const payment = await prisma.premiumPayment.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        await prisma.premiumPayment.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            message: "Payment deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Paid Payments
const getPaidPayments = async (req, res) => {

    try {

        const payments = await prisma.premiumPayment.findMany({

            where: {
                paymentStatus: "PAID"
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
                                        email: true
                                    }

                                }

                            }

                        }

                    }

                }

            }

        });

        res.json(payments);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Pending Payments
const getPendingPayments = async (req, res) => {

    try {

        const payments = await prisma.premiumPayment.findMany({

            where: {
                paymentStatus: "PENDING"
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
                                        email: true
                                    }

                                }

                            }

                        }

                    }

                }

            }

        });

        res.json(payments);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Overdue Payments
const getOverduePayments = async (req, res) => {

    try {

        const payments = await prisma.premiumPayment.findMany({

            where: {
                paymentStatus: "OVERDUE"
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
                                        email: true
                                    }

                                }

                            }

                        }

                    }

                }

            }

        });

        res.json(payments);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Payment History By Policy
const getPaymentHistoryByPolicy = async (req, res) => {

    try {

        const { policyId } = req.params;

        const policy = await prisma.policy.findUnique({
            where: {
                id: Number(policyId)
            }
        });

        if (!policy) {
            return res.status(404).json({
                message: "Policy not found"
            });
        }

        const payments = await prisma.premiumPayment.findMany({

            where: {
                policyId: Number(policyId)
            },

            orderBy: {
                paymentDate: "desc"
            }

        });

        res.json(payments);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Payment Dashboard Statistics
const getPaymentDashboard = async (req, res) => {

    try {

        const totalPayments = await prisma.premiumPayment.count();

        const paidPayments = await prisma.premiumPayment.count({
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

        const totalCollection = await prisma.premiumPayment.aggregate({
            _sum: {
                amount: true
            },
            where: {
                paymentStatus: "PAID"
            }
        });

        res.json({

            totalPayments,

            paidPayments,

            pendingPayments,

            overduePayments,

            totalPremiumCollected: totalCollection._sum.amount || 0

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
    getPaidPayments,
    getPendingPayments,
    getOverduePayments,
    getPaymentHistoryByPolicy,
    getPaymentDashboard
};