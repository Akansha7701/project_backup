const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

// Upload Document

const uploadDocument = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("TITLE:", req.body.title);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const { title } = req.body;

    const result = await pool.query(
      `
      INSERT INTO documents
      (
        title,
        filename,
        filetype,
        filepath,
        uploaded_by
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        title,
        req.file.originalname,
        req.file.mimetype,
        req.file.path,
        req.user.id,
      ],
    );

    res.status(201).json({
      message: "Document uploaded successfully",
      document: result.rows[0],
    });
  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};

// Get All Documents

const getDocuments = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        title,
        filename,
        filetype,
        filepath,
        uploaded_by,
        upload_date
      FROM documents
      ORDER BY upload_date DESC
      `,
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Fetch Error:", error);

    res.status(500).json({
      message: "Failed to fetch documents",
    });
  }
};

// Delete Document

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await pool.query(
      `
      SELECT *
      FROM documents
      WHERE id = $1
      AND uploaded_by = $2
      `,
      [id, req.user.id],
    );

    if (document.rows.length === 0) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const filePath = path.resolve(document.rows[0].filepath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await pool.query(
      `
      DELETE FROM documents
      WHERE id = $1
      `,
      [id],
    );

    res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};

// View Document

const viewDocument = async (req, res) => {
  try {
    console.log("===== VIEW DOCUMENT =====");

    const { id } = req.params;

    console.log("Document ID:", id);

    const result = await pool.query("SELECT * FROM documents WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      console.log("Document not found in database");
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const filePath = path.resolve(result.rows[0].filepath);

    console.log("Database Path:", result.rows[0].filepath);
    console.log("Resolved Path:", filePath);
    console.log("File Exists:", fs.existsSync(filePath));

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File does not exist on server",
      });
    }

    res.sendFile(filePath);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to open document",
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  deleteDocument,
  viewDocument,
};
