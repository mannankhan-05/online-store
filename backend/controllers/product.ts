import { Request, Response } from "express";
import product from "../models/product";
import logger from "../logger";

// Get all products
export const getAllProducts = (req: Request, res: Response) => {
  product
    .findAll()
    .then((products) => {
      logger.info("All products were retrieved");
      res.json(products);
    })
    .catch((err) => {
      logger.error(`Error retrieving products: ${err}`);
      res.status(500).json({ error: "Error retrieving products" });
    });
};
