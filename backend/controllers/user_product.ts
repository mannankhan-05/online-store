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

// Get all the selected products of a user
export const getUserProducts = (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId, 10);
  user_product
    .findAll({ where: { user_id: userId }, include: [user, product] })
    .then((userProducts) => {
      logger.info(
        `All products of user with id ${userId} were retrieved successfully`
      );
      res.json(userProducts);
    })
    .catch((err) => {
      logger.error(`Error retrieving all products of user with id ${userId}`);
      res.status(500).json({ error: err });
    });
};

// Add the selected product to the user's list
export const addUserProduct = async (req: Request, res: Response) => {
  const { user_id, product_id }: { user_id: number; product_id: number } =
    req.body;

  await user_product
    .create({
      user_id,
      product_id,
    })
    .then((userProduct) => {
      logger.info(
        `Product with id ${product_id} was added to the user with id ${user_id}`
      );
      res.json(userProduct);
    })
    .catch((err) => {
      logger.error(
        `Error adding product with id ${product_id} to user with id ${user_id}`
      );
      res.status(500).json({ error: err });
    });
};
