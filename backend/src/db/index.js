const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'shopdb',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(255) NOT NULL,
      price     NUMERIC(10, 2) NOT NULL,
      stock     INTEGER NOT NULL DEFAULT 0,
      image_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log('✅ Database initialized');
};

module.exports = { pool, initDB };
