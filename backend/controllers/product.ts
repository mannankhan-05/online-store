import { Request, Response } from "express";
import { Model } from "sequelize";
import product from "../models/product";
import logger from "../logger";
import { Mode } from "fs";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

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

// Get a product by id
export const getProductById = (req: Request, res: Response) => {
  // 10 is the radix parameter which specifies the base of the number in below line
  const productId: number = parseInt(req.params.productId, 10);
  product
    .findByPk(productId)
    .then((product: Model<Product> | null) => {
      if (product) {
        logger.info(`Product with id ${productId} was retrieved`);
        res.json(product);
      } else {
        logger.warn(`Product with id ${productId} not found`);
        res
          .status(404)
          .json({ error: `Product with id ${productId} not found` });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving product with id ${productId} : ${err}`);
      res
        .status(500)
        .json({ error: `Error retrieving product with id ${productId}` });
    });
};

// Create a new product
export const createProduct = (req: Request, res: Response) => {
  const {
    name,
    price,
    description,
    image,
    category,
  }: {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  } = req.body;
  product
    .create({
      name,
      price,
      description,
      image,
      category,
    })
    .then((product) => {
      logger.info(`A new product is created`);
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(`Error creating a new product: ${err}`);
      res.status(500).json({ error: "Error creating a new product" });
    });
};
