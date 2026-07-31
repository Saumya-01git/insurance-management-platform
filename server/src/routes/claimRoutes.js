const express = require("express");

const router = express.Router();

const {
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
} = require("../controllers/claimController");

const { protect, authorize } = require("../middleware/authMiddleware");

const {
    claimValidation
} = require("../validators/claimValidator");

const validate = require("../middleware/validationMiddleware");

router.post(
    "/",
    protect,
    authorize("ADMIN"),
    claimValidation,
    validate,
    createClaim
);

router.get(
    "/",
    protect,
    authorize("ADMIN", "AGENT"),
    getAllClaims
);

router.get(
    "/pending",
    protect,
    authorize("ADMIN", "AGENT"),
    getPendingClaims
);

router.get(
    "/policy/:policyId",
    protect,
    authorize("ADMIN", "AGENT"),
    getClaimsByPolicy
);

router.get(
    "/dashboard/stats",
    protect,
    authorize("ADMIN", "AGENT"),
    getClaimDashboard
);

router.get(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    getClaimById
);

router.put(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    updateClaim
);

router.delete(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    deleteClaim
);

router.put(
    "/approve/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    approveClaim
);

router.put(
    "/reject/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    rejectClaim
);

module.exports = router;