import { Sequelize } from "sequelize";
require("dotenv").config();

const db = new Sequelize(
  process.env.DATABASE_NAME || "default",
  process.env.DATABASE_USER || "default",
  process.env.DATABASE_PASSWORD || "default",
  {
    host: process.env.DATABASE_HOST, // that part was generating error on the recipe-costManagement application
    port: Number(process.env.DATABASE_PORT) || 5432, // Explicitly define the port
    dialect: "postgres",
  }
);

export default db;
