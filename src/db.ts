/* import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "root",
  database: "rest_notes"
}); */

import { Pool } from "pg";

export const db = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "rest_notes"
});
