require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { pool } = require("../config/database");

async function runMigrations() {
  try {
    console.log("🔄 Running database migrations...");

    const migrationsDir = path.join(__dirname);
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of migrationFiles) {
      if (file === "migrate.js") continue;

      console.log(`📄 Running migration: ${file}`);
      const migrationSQL = fs.readFileSync(
        path.join(migrationsDir, file),
        "utf8"
      );

      await pool.query(migrationSQL);
      console.log(`✅ Migration ${file} completed successfully`);
    }

    console.log("🎉 All migrations completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
