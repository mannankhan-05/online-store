import { Request, Response } from "express";
import user_address from "../models/user_address";
import user from "../models/user";
import logger from "../logger";

// get all user's addresses
export const getAllUserAddresses = (req: Request, res: Response) => {
  user_address
    .findAll({
      include: [user],
    })
    .then((userAddresses) => {
      logger.info("All user addresses were retrieved successfully");
      res.json(userAddresses);
    })
    .catch((err) => {
      logger.error(`Error retrieving all user's addresses ${err}`);
      res.status(500);
    });
};

// get user's address by id
export const getUserAdressById = (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);

  user_address
    .findOne({
      include: [user],
      where: { user_id: userId },
    })
    .then((userAddress) => {
      logger.info(`User address with id ${userId} was retrieved successfully`);
      res.json(userAddress);
    })
    .catch((err) => {
      logger.error(`Error retrieving user address with id ${userId}` + err);
      res.status(500);
    });
};

// add user address
export const addUserAddress = (req: Request, res: Response) => {
  const {
    userId,
    address,
    city,
    phoneNumber,
  }: { userId: number; address: string; city: string; phoneNumber: string } =
    req.body;

  user_address
    .create({
      user_id: userId,
      address: address,
      city: city,
      phoneNumber: phoneNumber,
    })
    .then((userAddress) => {
      logger.info(`Address was added to the user with id ${userId}`);
      res.json(userAddress);
    })
    .catch((err) => {
      logger.error(`Error adding address to user with id ${userId}` + err);
      res.status(500);
    });
};
