const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
    getDashboardSummary,
    getCustomerReport,
    getPolicyReport,
    getRevenueReport,
    getBusinessInsights,
    getMonthlyRevenueReport,
    getRecentActivities
} = require("../controllers/reportController");

router.get(
    "/dashboard",
    protect,
    authorize("ADMIN"),
    getDashboardSummary
);

router.get(
    "/customers",
    protect,
    authorize("ADMIN"),
    getCustomerReport
);

router.get(
    "/policies",
    protect,
    authorize("ADMIN"),
    getPolicyReport
);

router.get(
    "/revenue",
    protect,
    authorize("ADMIN"),
    getRevenueReport
);

router.get(
    "/business-insights",
    protect,
    authorize("ADMIN"),
    getBusinessInsights
);

router.get(
    "/revenue/monthly",
    protect,
    authorize("ADMIN"),
    getMonthlyRevenueReport
);

router.get(
    "/recent",
    protect,
    authorize("ADMIN"),
    getRecentActivities
);

module.exports = router;