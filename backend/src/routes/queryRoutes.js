const express = require("express");

const router = express.Router();



const authMiddleware =
  require("../middleware/authMiddleware");

  const {
  askQuery,
  getQueryHistory,
  clearChatHistory,
} = require("../controllers/queryController");

router.post(
  "/",
  authMiddleware,
  askQuery
);

router.get(
  "/history",
  authMiddleware,
  getQueryHistory
);

router.delete(
  "/history",
  authMiddleware,
  clearChatHistory
);

module.exports = router;