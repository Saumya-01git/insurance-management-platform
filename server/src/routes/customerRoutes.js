const express = require("express");

const router = express.Router();

const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    searchCustomers
} = require("../controllers/customerController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    customerValidation
} = require("../validators/customerValidator");

const validate = require("../middleware/validationMiddleware");

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - dob
 *               - phone
 *               - address
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               dob:
 *                 type: string
 *                 example: "2002-09-18"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Chennai
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Invalid input
 */

router.post(
    "/",
    protect,
    authorize("ADMIN"),
    customerValidation,
    validate,
    createCustomer
);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *       401:
 *         description: Unauthorized
 */

router.get(
    "/",
    protect,
    authorize("ADMIN", "AGENT"),
    getAllCustomers
);

router.get(
    "/search",
    protect,
    authorize("ADMIN", "AGENT"),
    searchCustomers
);

router.get(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    getCustomerById
);

router.put(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    updateCustomer
);

router.delete(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    deleteCustomer
);

module.exports = router;