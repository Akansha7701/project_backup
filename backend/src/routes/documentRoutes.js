const express = require("express");


const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  uploadDocument,
  getDocuments,
  deleteDocument,
  viewDocument,

} = require("../controllers/documentController");


router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  upload.single("document"),
  uploadDocument
);

router.get(
  "/",
  authMiddleware,
  getDocuments
);

router.delete(
  "/:id",
  authMiddleware,
  deleteDocument
);

router.get(
  "/view/:id",
  authMiddleware,
  viewDocument
);

module.exports = router;

