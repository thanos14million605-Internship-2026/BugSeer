const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL_PROD
      : process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

module.exports = { pool };
