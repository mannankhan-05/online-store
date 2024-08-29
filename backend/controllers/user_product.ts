import { Request, Response } from "express";
import user_product from "../models/user_product";
import user from "../models/user";
import product from "../models/product";
import logger from "../logger";

// Get all user_products
export const getAllUsersProducts = (req: Request, res: Response) => {
  user_product
    .findAll({
      include: [user, product],
    })
    .then((user_products) => {
      logger.info("All user_products were retrieved successfully");
      res.json(user_products);
    })
    .catch((err) => {
      logger.error("Error retrieving all user_products");
      res.status(500).json({ error: err });
    });
};
