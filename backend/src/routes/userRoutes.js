const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

router.post("/", authMiddleware, adminMiddleware, createUser);

router.get("/", authMiddleware, adminMiddleware, getUsers);

router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
