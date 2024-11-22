const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config()

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: "neondb",
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: true
});



module.exports = pool;
