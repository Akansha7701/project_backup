const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const queryRoutes = require("./routes/queryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("DRDO Backend Running");
});

module.exports = app;