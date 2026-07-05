require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;
// const dashboardRoutes = require("./routes/dashboardRoutes");
// app.use("/api/dashboard", dashboardRoutes);

pool.connect()
  .then(() => {
    console.log("PostgreSQL Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });