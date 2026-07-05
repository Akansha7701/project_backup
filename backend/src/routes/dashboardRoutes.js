const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const authenticateToken = require("../middleware/authMiddleware");

const authorizeAdmin = require("../middleware/adminMiddleware");

router.get(
  "/stats",
  authenticateToken,
  authorizeAdmin,
  getDashboardStats
);

module.exports = router;