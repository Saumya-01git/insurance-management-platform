const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const {
  getDashboardSummary,
  getDashboardAnalytics,
  getDashboardActivity,
  getDashboardNotifications,
  getDashboardRenewals,
  getRecentCustomers,
  getRecentClaims,
} = require("../controllers/dashboardController");

router.get("/summary", protect, authorize("ADMIN", "AGENT"), getDashboardSummary);
router.get("/analytics", protect, authorize("ADMIN", "AGENT"), getDashboardAnalytics);
router.get("/activity", protect, authorize("ADMIN", "AGENT"), getDashboardActivity);
router.get("/notifications", protect, authorize("ADMIN", "AGENT"), getDashboardNotifications);
router.get("/renewals", protect, authorize("ADMIN", "AGENT"), getDashboardRenewals);
router.get("/recent-customers", protect, authorize("ADMIN", "AGENT"), getRecentCustomers);
router.get("/recent-claims", protect, authorize("ADMIN", "AGENT"), getRecentClaims);

module.exports = router;
