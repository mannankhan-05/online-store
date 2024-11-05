import { Request, Response } from "express";
import product_category from "../models/product_category";
import logger from "../logger";

// get all product categories
export const getAllProductCategories = (req: Request, res: Response) => {
  product_category
    .findAll()
    .then((categories) => {
      logger.info("Retrieved all product categories.");
      res.json(categories);
    })
    .catch((err) => {
      logger.error("Error retrieving all product categories : " + err);
      res.sendStatus(500);
    });
};

// get a product by categories
export const getProductCategory = async (req: Request, res: Response) => {
  const { category }: { category: string } = req.body;

  product_category
    .findOne({ where: { category: category } })
    .then((productsByCategories) => {
      logger.info(`Retrieved all products by categories`);
      res.json(productsByCategories);
    })
    .catch((err) => {
      logger.error(`Error retrieving products by categories: ${err}`);
      res.status(500);
    });
};

// get a product categories
export const getAProductCategory = async (req: Request, res: Response) => {
  const category = req.query.category as string;

  product_category
    .findOne({ where: { category: category } })
    .then((categoryData) => {
      if (categoryData) {
        logger.info(`Retrieved all product categories`);
        res.json(categoryData);
      } else {
        logger.warn(`Product category not found`);
        res.status(404).json({ error: `Product category not found` });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving product categories: ${err}`);
      res.status(500);
    });
};

// add a product category
export const addProductCategory = async (req: Request, res: Response) => {
  const { category }: { category: string } = req.body;

  product_category
    .create({
      category: category,
    })
    .then((categoryData) => {
      logger.info(`Product category added successfully`);
      res.json(categoryData);
    })
    .catch((err) => {
      logger.error(`Error adding product category: ${err}`);
      res.status(500);
    });
};
