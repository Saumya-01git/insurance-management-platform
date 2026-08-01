const express = require("express");
const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

const validate = require("../middleware/validationMiddleware");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: Rahul@123
 *               role:
 *                 type: string
 *                 example: CUSTOMER
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */

router.post(
    "/register",
    registerValidation,
    validate,
    register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post(
    "/login",
    loginValidation,
    validate,
    login
);

router.get(
    "/admin",
    protect,
    authorize("ADMIN"),
    (req, res) => {

        res.json({
            message: "Welcome Admin",
            user: req.user
        });

    }
);

module.exports = router;