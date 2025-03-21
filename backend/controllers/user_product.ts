import { Request, Response } from "express";
import user_product from "../models/user_product";
import sequelize from "../config/database";
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
  const {
    user_id,
    product_id,
    quantity,
  }: { user_id: number; product_id: number; quantity: number } = req.body;

  await user_product
    .create({
      user_id,
      product_id,
      quantity,
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

// Delete the selected product from the user's cart
export const deleteProductsFromCart = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId, 10);

  await user_product
    .destroy({ where: { user_id: userId } })
    .then(() => {
      logger.info(
        `All products of user with id ${userId} were deleted from the cart`
      );
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(`Error deleting all products of user with id ${userId}`);
      res.status(500).json({ error: err });
    });
};

// Remove the product from the user's cart
export const removeProductFromCart = (req: Request, res: Response) => {
  const { userId, productId }: { userId: number; productId: number } = req.body;

  user_product
    .destroy({ where: { user_id: userId, product_id: productId } })
    .then(() => {
      logger.info(
        `Product with id ${productId} was removed from the cart of user with id ${userId}`
      );
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(
        `Error removing product with id ${productId} from the cart of user with id ${userId}`,
        err
      );
      res.status(500);
    });
};

// Update the quantity of the product in the user's cart by 1
export const incrementProductQuantity = (req: Request, res: Response) => {
  const productId = req.params.productId;

  user_product
    .update(
      { quantity: sequelize.literal("quantity + 1") }, // Increment quantity
      { where: { product_id: productId } } // Condition
    )
    .then(() => {
      logger.info("Product quantity was incremented successfully");
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error("Error incrementing product quantity", err);
      res.status(500);
    });
};
