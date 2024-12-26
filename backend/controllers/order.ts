import { Request, Response } from "express";
import { orderConfirmationMail } from "../mails/orderConfirmationMail";
import { Op } from "sequelize";
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

// Get total sales 1 day, 7 days, 30 days
export const getTotalSales = async (req: Request, res: Response) => {
  const { days }: { days: number } = req.body;
  console.log(`Days parameter: ${days}`);
  const today = new Date();
  const lastDate = new Date(today);

  lastDate.setDate(today.getDate() - days);

  console.log(
    `Date range: ${lastDate.toISOString()} to ${today.toISOString()}`
  );

  try {
    const totalSales = await order.sum("order_amount", {
      where: {
        createdAt: {
          // The date range using Sequelize's Op.gte (greater than or equal to) and Op.lte (less than or equal to) operators.
          [Op.gte]: lastDate,
          [Op.lte]: today,
        },
      },
    });
    console.log(`Total sales: ${totalSales}`);
    logger.info(`Total sales for ${days} days fetched`);
    res.json(totalSales);
  } catch (err) {
    logger.error(`Error fetching total sales for ${days} days: ${err}`);
    res.sendStatus(500);
  }
};
