const express = require("express");

const router = express.Router();

const {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
    getPaidPayments,
    getPendingPayments,
    getOverduePayments,
    getPaymentHistoryByPolicy,
    getPaymentDashboard
} = require("../controllers/paymentController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");


router.post(
    "/",
    protect,
    authorize("ADMIN", "AGENT"),
    createPayment
);

router.get(
    "/",
    protect,
    authorize("ADMIN", "AGENT"),
    getAllPayments
);


router.get(
    "/paid",
    protect,
    authorize("ADMIN", "AGENT"),
    getPaidPayments
);

router.get(
    "/pending",
    protect,
    authorize("ADMIN", "AGENT"),
    getPendingPayments
);

router.get(
    "/overdue",
    protect,
    authorize("ADMIN", "AGENT"),
    getOverduePayments
);

router.get(
    "/history/:policyId",
    protect,
    authorize("ADMIN", "AGENT"),
    getPaymentHistoryByPolicy
);

router.get(
    "/dashboard",
    protect,
    authorize("ADMIN", "AGENT"),
    getPaymentDashboard
);

router.get(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    getPaymentById
);

router.put(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    updatePayment
);

router.delete(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    deletePayment
);

module.exports = router;