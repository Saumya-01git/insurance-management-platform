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

router.post(
    "/register",
    registerValidation,
    validate,
    register
);

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