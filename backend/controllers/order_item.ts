import { Request, Response } from "express";
import logger from "../logger";
import order_item from "../models/order_item";
import order from "../models/order";
import product from "../models/product";
import product_category from "../models/product_category";

// Get all order items
export const getAllOrderItems = (req: Request, res: Response) => {
  order_item
    .findAll({
      include: [
        {
          model: order,
        },
        {
          model: product,
        },
      ],
    })
    .then((order_items) => {
      logger.info("Fetched all order items");
      res.json(order_items);
    })
    .catch((err) => {
      logger.error("Error fetching all order items");
      res.sendStatus(500);
    });
};

// Get order details by order_id
export const getOrderDetailsById = (req: Request, res: Response) => {
  const orderId: string = req.params.orderId;
  const limit = parseInt(req.query.limit as string) || 1;
  order_item
    .findAll({
      limit,
      where: { order_id: orderId },
      include: [
        {
          model: order,
        },
      ],
    })
    .then((orderDetails) => {
      logger.info("Fetched order details by order id");
      res.json(orderDetails);
    })
    .catch((err) => {
      logger.error("Error fetching order details by order id");
      res.sendStatus(500);
    });
};

// Get product details by order_item id
export const getOrderItemsById = (req: Request, res: Response) => {
  const orderId: string = req.params.orderId;

  order_item
    .findAll({
      where: { order_id: orderId },
      include: [
        {
          model: product,
          include: [
            {
              model: product_category,
            },
          ],
        },
      ],
    })
    .then((order_items: any) => {
      logger.info("Fetched order items by order id");
      order_items.forEach((item: any) => {
        if (item.product && item.product.image) {
          item.product.image = `http://localhost:4000/productImages/${item.product.image}`;
        }
      });

      res.json(order_items);
    })
    .catch((err) => {
      logger.error("Error fetching order items by order id" + err);
      res.sendStatus(500);
    });
};

// Create A new order item
export const createOrderItem = (req: Request, res: Response) => {
  const { orderId, productId } = req.body;

  order_item
    .create({
      order_id: orderId,
      product_id: productId,
    })
    .then((order_item) => {
      logger.info("Created a new order item");
      res.json(order_item);
    })
    .catch((err) => {
      logger.error("Error creating a new order item");
      res.sendStatus(500);
    });
};
