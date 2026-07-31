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

router.post(
    "/",
    protect,
    authorize("ADMIN"),
    customerValidation,
    validate,
    createCustomer
);

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