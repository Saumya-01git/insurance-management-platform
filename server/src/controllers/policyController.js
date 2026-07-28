const prisma = require("../config/prisma");

// Create Policy
const createPolicy = async (req, res) => {

    try {

        const {
            customerId,
            policyType,
            policyNumber,
            premiumAmount,
            startDate,
            endDate
        } = req.body;

        if (
            !customerId ||
            !policyType ||
            !policyNumber ||
            !premiumAmount ||
            !startDate ||
            !endDate
        ) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        // Check customer exists
        const customer = await prisma.customer.findUnique({
            where: {
                id: Number(customerId)
            }
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        // Check duplicate policy number
        const existingPolicy = await prisma.policy.findUnique({
            where: {
                policyNumber
            }
        });

        if (existingPolicy) {
            return res.status(400).json({
                message: "Policy number already exists"
            });
        }

        const policy = await prisma.policy.create({

            data: {

                customerId: Number(customerId),

                policyType,

                policyNumber,

                premiumAmount: Number(premiumAmount),

                startDate: new Date(startDate),

                endDate: new Date(endDate),

                status: "ACTIVE"

            },

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

        });

        res.status(201).json({

            message: "Policy created successfully",

            policy

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get All Policies
const getAllPolicies = async (req, res) => {

    try {

        const policies = await prisma.policy.findMany({

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

        });

        res.json(policies);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Policy By ID
const getPolicyById = async (req, res) => {

    try {

        const { id } = req.params;

        const policy = await prisma.policy.findUnique({

            where: {
                id: Number(id)
            },

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

        });

        if (!policy) {

            return res.status(404).json({
                message: "Policy not found"
            });

        }

        res.json(policy);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Update Policy
const updatePolicy = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            policyType,
            premiumAmount,
            startDate,
            endDate,
            status
        } = req.body;

        const policy = await prisma.policy.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!policy) {
            return res.status(404).json({
                message: "Policy not found"
            });
        }

        const updatedPolicy = await prisma.policy.update({

            where: {
                id: Number(id)
            },

            data: {

                policyType,
                premiumAmount: Number(premiumAmount),
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status

            },

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

        });

        res.json({

            message: "Policy updated successfully",

            policy: updatedPolicy

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Delete Policy
const deletePolicy = async (req, res) => {

    try {

        const { id } = req.params;

        const policy = await prisma.policy.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!policy) {
            return res.status(404).json({
                message: "Policy not found"
            });
        }

        await prisma.policy.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            message: "Policy deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Active Policies
const getActivePolicies = async (req, res) => {

    try {

        const policies = await prisma.policy.findMany({

            where: {
                status: "ACTIVE"
            },

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

        });

        res.json(policies);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Renew Policy
const renewPolicy = async (req, res) => {

    try {

        const { id } = req.params;

        const { endDate } = req.body;

        const policy = await prisma.policy.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!policy) {
            return res.status(404).json({
                message: "Policy not found"
            });
        }

        const renewedPolicy = await prisma.policy.update({

            where: {
                id: Number(id)
            },

            data: {
                endDate: new Date(endDate),
                status: "ACTIVE"
            }

        });

        res.json({
            message: "Policy renewed successfully",
            policy: renewedPolicy
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Cancel Policy
const cancelPolicy = async (req, res) => {

    try {

        const { id } = req.params;

        const policy = await prisma.policy.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!policy) {
            return res.status(404).json({
                message: "Policy not found"
            });
        }

        const cancelledPolicy = await prisma.policy.update({

            where: {
                id: Number(id)
            },

            data: {
                status: "CANCELLED"
            }

        });

        res.json({
            message: "Policy cancelled successfully",
            policy: cancelledPolicy
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Expiring Policies
const getExpiringPolicies = async (req, res) => {

    try {

        const today = new Date();

        const nextMonth = new Date();

        nextMonth.setDate(today.getDate() + 30);


        const policies = await prisma.policy.findMany({

            where: {

                status: "ACTIVE",

                endDate: {
                    gte: today,
                    lte: nextMonth
                }

            },

            include: {

                customer: {

                    include: {

                        user: {

                            select: {
                                name: true,
                                email: true
                            }

                        }

                    }

                }

            }

        });


        res.json(policies);


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    createPolicy,
    getAllPolicies,
    getPolicyById,
    updatePolicy,
    deletePolicy,
    getActivePolicies,
    renewPolicy,
    cancelPolicy,
    getExpiringPolicies
};