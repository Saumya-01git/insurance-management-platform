const express = require("express");

const router = express.Router();

const {
    createPolicy,
    getAllPolicies,
    getPolicyById,
    updatePolicy,
    deletePolicy,
    getActivePolicies,
    renewPolicy,
    cancelPolicy,
    getExpiringPolicies
} = require("../controllers/policyController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    policyValidation
} = require("../validators/policyValidator");

const validate = require("../middleware/validationMiddleware");

router.post(
    "/",
    protect,
    authorize("ADMIN"),
    policyValidation,
    validate,
    createPolicy
);

router.get(
    "/",
    protect,
    authorize("ADMIN", "AGENT"),
    getAllPolicies
);

router.get(
    "/active",
    protect,
    authorize("ADMIN", "AGENT"),
    getActivePolicies
);

router.put(
    "/renew/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    renewPolicy
);

router.put(
    "/cancel/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    cancelPolicy
);

router.get(
    "/expiring",
    protect,
    authorize("ADMIN", "AGENT"),
    getExpiringPolicies
);

router.get(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    getPolicyById
);

router.put(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    updatePolicy
);

router.delete(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    deletePolicy
);

module.exports = router;