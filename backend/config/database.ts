import { Sequelize } from "sequelize";
require("dotenv").config();

const db = new Sequelize(
  process.env.DATABASE_NAME || "default",
  process.env.DATABASE_USER || "default",
  process.env.DATABASE_PASSWORD || "default",
  {
    host: "localhost", // that part was generating error on the recipe-costManagement application
    dialect: "postgres",
  }
);

export default db;
