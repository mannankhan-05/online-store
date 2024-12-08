import { Request, Response } from "express";
import { orderConfirmationMail } from "../mails/orderConfirmationMail";
import order from "../models/order";
import user from "../models/user";
import logger from "../logger";

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 6;
  const offset = (parseInt(req.query.page as string) || 0) * limit;

  try {
    const { count, rows: orders } = await order.findAndCountAll({
      limit,
      offset,
    });
    logger.info("All orders are fetched");
    res.json({ orders: orders, totalOrders: count });
  } catch (err) {
    logger.error(`Error fetching all orders: ${err}`);
    res.sendStatus(500);
  }
};

// Get order by user's id
export const getOrderByUserId = (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);

  order
    .findAll({ where: { user_id: userId } })
    .then((usersAllOrders) => {
      logger.info(`Fetched all the Orders of user with id : ${userId}`);
      res.json(usersAllOrders);
    })
    .catch((err) => {
      logger.error(
        `Error fetching all the Orders of user with id : ${userId} : ${err}`
      );
      res.sendStatus(500);
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
          // orderConfirmationMail(u.email, orderId, orderAmount);
          console.log("Order confirmation mail sent");
        });

      res.json(order);
    })
    .catch((err) => {
      logger.error("Error creating new order" + err);
      res.status(500);
    });
};
