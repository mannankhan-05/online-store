import express from "express";
import logger from "./logger";
import cors from "cors";
import db from "./config/database";
import router from "./routes/routes";
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());

app.use(router);

// to serve static files from the productImages directory
app.use("/productImages", express.static("productImages"));

// to serve static files from the userImages directory
app.use("/userImages", express.static("userImages"));

db.authenticate()
  .then(() => {
    logger.info("Connected to Database (postgresql)");
  })
  .catch((err) => {
    logger.error("Error connecting to database : ", err);
  });

db.sync()
  .then(() => {
    logger.info("Database Synced");
  })
  .catch((err) => {
    logger.error("Error syncing database : ", err);
  });

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
