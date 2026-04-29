const { Pool } = require("pg");

const pool = new Pool({
  // This ignores everything else and ONLY uses the Render dashboard link
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log("✅ Successfully connected to Neon Cloud DB"))
  .catch((err) => console.error("❌ Still failing to connect:", err));

module.exports = pool;