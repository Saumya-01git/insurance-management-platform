const prisma = require("../config/prisma");

// Create Claim
const createClaim = async (req, res) => {

    try {

        const {
            policyId,
            claimAmount,
            reason
        } = req.body;

        if (!policyId || !claimAmount || !reason) {

            return res.status(400).json({
                message: "Please fill all fields"
            });

        }

        // Check policy exists
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

        const claim = await prisma.claim.create({

            data: {

                policyId: Number(policyId),
                claimAmount: Number(claimAmount),
                reason,
                status: "PENDING"

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

            message: "Claim created successfully",

            claim

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get All Claims
const getAllClaims = async (req, res) => {

    try {

        const claims = await prisma.claim.findMany({

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

        res.json(claims);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Claim By ID
const getClaimById = async (req, res) => {

    try {

        const { id } = req.params;

        const claim = await prisma.claim.findUnique({

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

        if (!claim) {

            return res.status(404).json({
                message: "Claim not found"
            });

        }

        res.json(claim);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Update Claim
const updateClaim = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            claimAmount,
            reason,
            status
        } = req.body;

        const claim = await prisma.claim.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!claim) {
            return res.status(404).json({
                message: "Claim not found"
            });
        }

        const updatedClaim = await prisma.claim.update({

            where: {
                id: Number(id)
            },

            data: {
                claimAmount: Number(claimAmount),
                reason,
                status
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

            message: "Claim updated successfully",

            claim: updatedClaim

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Delete Claim
const deleteClaim = async (req, res) => {

    try {

        const { id } = req.params;

        const claim = await prisma.claim.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!claim) {
            return res.status(404).json({
                message: "Claim not found"
            });
        }

        await prisma.claim.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            message: "Claim deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Approve Claim
const approveClaim = async (req, res) => {

    try {

        const { id } = req.params;

        const claim = await prisma.claim.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!claim) {
            return res.status(404).json({
                message: "Claim not found"
            });
        }

        const updatedClaim = await prisma.claim.update({

            where: {
                id: Number(id)
            },

            data: {
                status: "APPROVED"
            }

        });

        res.json({

            message: "Claim approved successfully",

            claim: updatedClaim

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Reject Claim
const rejectClaim = async (req, res) => {

    try {

        const { id } = req.params;

        const claim = await prisma.claim.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!claim) {
            return res.status(404).json({
                message: "Claim not found"
            });
        }

        const updatedClaim = await prisma.claim.update({

            where: {
                id: Number(id)
            },

            data: {
                status: "REJECTED"
            }

        });

        res.json({

            message: "Claim rejected successfully",

            claim: updatedClaim

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Pending Claims
const getPendingClaims = async (req, res) => {

    try {

        const claims = await prisma.claim.findMany({

            where: {
                status: "PENDING"
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

        res.json(claims);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Claims by Policy
const getClaimsByPolicy = async (req, res) => {

    try {

        const { policyId } = req.params;

        const claims = await prisma.claim.findMany({

            where: {
                policyId: Number(policyId)
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

        res.json(claims);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Claims Dashboard Statistics
const getClaimDashboard = async (req, res) => {

    try {

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

        const totalClaimAmount = await prisma.claim.aggregate({

            _sum: {
                claimAmount: true
            }

        });

        res.json({

            totalClaims,
            pendingClaims,
            approvedClaims,
            rejectedClaims,
            totalClaimAmount: totalClaimAmount._sum.claimAmount || 0

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    createClaim,
    getAllClaims,
    getClaimById,
    updateClaim,
    deleteClaim,
    approveClaim,
    rejectClaim,
    getPendingClaims,
    getClaimsByPolicy,
    getClaimDashboard
};