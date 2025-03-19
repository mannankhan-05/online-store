import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load .env file based on environment
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({ path: envFile });

const db = new Sequelize(
  process.env.DATABASE_NAME || "default",
  process.env.DATABASE_USER || "default",
  process.env.DATABASE_PASSWORD || "default",
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
  }
);

export default db;
