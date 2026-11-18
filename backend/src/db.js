// Task 02 - PostgreSQL connection
// Author: Katlego (Learner 3) | SD-WM03
// Settings are read from environment variables (see .env.example). No credentials are stored in code.
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'productivity_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD
});

module.exports = pool;
