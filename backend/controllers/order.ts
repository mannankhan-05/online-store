import { Request, Response } from "express";
import { orderConfirmationMail } from "../mails/orderConfirmationMail";
import order from "../models/order";
import user from "../models/user";
import logger from "../logger";

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  await order
    .findAll()
    .then((orders) => {
      logger.info("All orders are fetched");
      res.json(orders);
    })
    .catch((err) => {
      logger.error("Error fetching all orders" + err);
      res.status(500);
    });
};

// Create a new order
export const createNewOrder = async (req: Request, res: Response) => {
  const {
    orderId,
    orderItems,
    orderAmount,
    userId,
  }: {
    orderId: string;
    orderItems: number;
    orderAmount: number;
    userId: number;
  } = req.body;

  await order
    .create({
      order_id: orderId,
      order_items: orderItems,
      order_amount: orderAmount,
      user_id: userId,
    })
    .then((order) => {
      logger.info("New order is created");

      // get user email
      const usersOrder = user
        .findOne({ where: { id: userId } })
        .then((u: any) => {
          orderConfirmationMail(u.email, orderId, orderAmount);
        });

      res.json(order);
    })
    .catch((err) => {
      logger.error("Error creating new order" + err);
      res.status(500);
    });
};
