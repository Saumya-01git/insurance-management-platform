const prisma = require("../config/prisma");

// Upload Document
const uploadDocument = async (req, res) => {

    try {

        const { customerId } = req.body;

        if (!customerId) {
            return res.status(400).json({
                message: "Customer ID is required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a file"
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

        const document = await prisma.document.create({

            data: {

                customerId: Number(customerId),

                fileName: req.file.originalname,

                filePath: req.file.path.replace(/\\/g, "/")

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

            message: "Document uploaded successfully",

            document

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get All Documents
const getAllDocuments = async (req, res) => {

    try {

        const documents = await prisma.document.findMany({

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

        res.json(documents);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Document By ID
const getDocumentById = async (req, res) => {

    try {

        const { id } = req.params;

        const document = await prisma.document.findUnique({

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

        if (!document) {

            return res.status(404).json({
                message: "Document not found"
            });

        }

        res.json(document);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Update Document
const updateDocument = async (req, res) => {

    try {

        const { id } = req.params;
        const { customerId } = req.body;

        const existingDocument = await prisma.document.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!existingDocument) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a file"
            });
        }

        const updatedDocument = await prisma.document.update({

            where: {
                id: Number(id)
            },

            data: {

                customerId: Number(customerId),

                fileName: req.file.originalname,

                filePath: req.file.path.replace(/\\/g, "/")

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

            message: "Document updated successfully",

            document: updatedDocument

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Delete Document
const deleteDocument = async (req, res) => {

    try {

        const { id } = req.params;

        const document = await prisma.document.findUnique({

            where: {
                id: Number(id)
            }

        });

        if (!document) {

            return res.status(404).json({
                message: "Document not found"
            });

        }

        await prisma.document.delete({

            where: {
                id: Number(id)
            }

        });

        res.json({

            message: "Document deleted successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Documents By Customer
const getDocumentsByCustomer = async (req, res) => {

    try {

        const { customerId } = req.params;

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

        const documents = await prisma.document.findMany({

            where: {
                customerId: Number(customerId)
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

        res.json(documents);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Document Dashboard Statistics
const getDocumentStatistics = async (req, res) => {

    try {

        const totalDocuments = await prisma.document.count();

        const totalCustomers = await prisma.document.groupBy({

            by: ["customerId"]

        });

        res.json({

            totalDocuments,

            customersWithDocuments: totalCustomers.length

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    uploadDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentsByCustomer,
    getDocumentStatistics
};