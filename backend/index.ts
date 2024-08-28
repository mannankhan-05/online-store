import express from "express";
import logger from "./logger";
import db from "./config/database";
const app = express();

const PORT = process.env.PORT || 4000;

db.authenticate()
  .then(() => {
    logger.info("Connected to Database (postgresql)");
  })
  .catch((err) => {
    logger.error("Error connecting to database : ", err);
  });

app.get("/", (req, res) => {
  logger.info("Request received");
  res.send("Hello World!");
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
