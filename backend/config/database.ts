import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load .env file based on environment
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({ path: envFile });

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_HOST:", process.env.DATABASE_HOST);
console.log("DB_USER:", process.env.DATABASE_USER);
console.log("DB_NAME:", process.env.DATABASE_NAME);
console.log(
  "DB_PASSWORD:",
  process.env.DATABASE_PASSWORD ? "*****" : "Not set"
);
console.log("PORT:", process.env.PORT);

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
