const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

// Create Customer
const createCustomer = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            dob,
            phone,
            address
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !dob ||
            !phone ||
            !address
        ) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Customer already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "CUSTOMER"
            }
        });

        const customer = await prisma.customer.create({
            data: {
                userId: user.id,
                dob: new Date(dob),
                phone,
                address
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        res.status(201).json({
            message: "Customer created successfully",
            customer
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Get All Customers
const getAllCustomers = async (req, res) => {
    try {

        const customers = await prisma.customer.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        res.json(customers);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Get Customer By ID
const getCustomerById = async (req, res) => {

    try {

        const { id } = req.params;

        const customer = await prisma.customer.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        });


        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }


        res.json(customer);


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Update Customer
const updateCustomer = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email, dob, phone, address } = req.body;

        const customer = await prisma.customer.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                user: true
            }
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        await prisma.user.update({
            where: {
                id: customer.userId
            },
            data: {
                name,
                email
            }
        });

        const updatedCustomer = await prisma.customer.update({
            where: {
                id: Number(id)
            },
            data: {
                dob: new Date(dob),
                phone,
                address
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        res.json({
            message: "Customer updated successfully",
            customer: updatedCustomer
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Delete Customer
const deleteCustomer = async (req, res) => {

    try {

        const { id } = req.params;

        const customer = await prisma.customer.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        await prisma.customer.delete({
            where: {
                id: Number(id)
            }
        });

        await prisma.user.delete({
            where: {
                id: customer.userId
            }
        });

        res.json({
            message: "Customer deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Search Customers
const searchCustomers = async (req, res) => {

    try {

        const { keyword } = req.query;

        const customers = await prisma.customer.findMany({

            where: {

                user: {

                    OR: [

                        {
                            name: {
                                contains: keyword,
                                mode: "insensitive"
                            }
                        },

                        {
                            email: {
                                contains: keyword,
                                mode: "insensitive"
                            }
                        }

                    ]

                }

            },

            include: {

                user: {

                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }

                }

            }

        });

        res.json(customers);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    searchCustomers
};