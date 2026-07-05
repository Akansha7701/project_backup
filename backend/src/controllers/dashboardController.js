// const pool = require("../config/db");

// const getDashboardStats = async (req, res) => {

    
//   try {
//     console.log("Dashboard API called");
//     const totalUsers = await pool.query(`
//       SELECT COUNT(*)
//       FROM users
//       WHERE role = 'user'
//     `);

//     const totalDocuments = await pool.query(`
//       SELECT COUNT(*)
//       FROM documents
//     `);

//     const totalQueries = await pool.query(`
//       SELECT COUNT(*)
//       FROM chat_history
//     `);

//     res.json({
//       totalUsers: Number(totalUsers.rows[0].count),
//       totalDocuments: Number(totalDocuments.rows[0].count),
//       totalQueries: Number(totalQueries.rows[0].count),
//     });

//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to load dashboard",
//     });
//   }
// };

// module.exports = {
//   getDashboardStats,
// };








const pool = require("../config/db");

// const getDashboardStats = async (req, res) => {
//   try {
//     // Dashboard Counts
//     const totalUsers = await pool.query(`
//       SELECT COUNT(*)
//       FROM users
//       WHERE role = 'user'
//     `);

//     const totalDocuments = await pool.query(`
//       SELECT COUNT(*)
//       FROM documents
//     `);

//     const totalQueries = await pool.query(`
//       SELECT COUNT(*)
//       FROM chat_history
//     `);


const getDashboardStats = async (req, res) => {
  try {
    console.log("===== DASHBOARD =====");
    console.log("User ID:", req.user.id);
    console.log("Role:", req.user.role);

    const totalUsers = await pool.query(`
      SELECT COUNT(*)
      FROM users
      WHERE role = 'user'
    `);

    const totalDocuments = await pool.query(`
      SELECT COUNT(*)
      FROM documents
    `);

    // const totalQueries = await pool.query(`
    //   SELECT COUNT(*)
    //   FROM chat_history
    // `);

    let totalQueries;

if (req.user.role === "admin") {
  totalQueries = await pool.query(`
    SELECT COUNT(*)
    FROM chat_history
  `);
} else {
  totalQueries = await pool.query(
    `
    SELECT COUNT(*)
    FROM chat_history
    WHERE user_id = $1
    `,
    [req.user.id]
  );
}

    console.log("Documents:", totalDocuments.rows[0].count);
    console.log("Queries:", totalQueries.rows[0].count);

    // ... keep the rest of your code unchanged

    // Recent Activity
    const recentDocuments = await pool.query(`
      SELECT
        title,
        upload_date
      FROM documents
      ORDER BY upload_date DESC
      LIMIT 5
    `);

    // const recentQueries = await pool.query(`
    //   SELECT
    //     query,
    //     created_at
    //   FROM chat_history
    //   ORDER BY created_at DESC
    //   LIMIT 5
    // `);

    let recentQueries;

if (req.user.role === "admin") {
  recentQueries = await pool.query(`
    SELECT
      query,
      created_at
    FROM chat_history
    ORDER BY created_at DESC
    LIMIT 5
  `);
} else {
  recentQueries = await pool.query(
    `
    SELECT
      query,
      created_at
    FROM chat_history
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 5
    `,
    [req.user.id]
  );
}

    // Merge Activities
    const activities = [];

    recentDocuments.rows.forEach((doc) => {
      activities.push({
        type: "document",
        text: doc.title,
        time: doc.upload_date,
      });
    });

    recentQueries.rows.forEach((query) => {
      activities.push({
        type: "query",
        text: query.query,
        time: query.created_at,
      });
    });

    // Sort latest first
    activities.sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );

    res.json({
      totalUsers: Number(totalUsers.rows[0].count),
      totalDocuments: Number(totalDocuments.rows[0].count),
      totalQueries: Number(totalQueries.rows[0].count),

      recentActivity: activities.slice(0, 5),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};

module.exports = {
  getDashboardStats,
};