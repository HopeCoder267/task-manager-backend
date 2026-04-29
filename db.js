//db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  // This tells the app to use the cloud URL provided by Render/Neon
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // This is mandatory for Neon cloud connections
  }
});

pool.connect()
  .then(() => console.log("✅ Connected to Cloud PostgreSQL (Neon)"))
  .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = pool;