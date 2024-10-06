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

// to check if the user has an address, if not, add one else update
export const checkUserInformation = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);
  const {
    address,
    city,
    phoneNumber,
  }: { address: string; city: string; phoneNumber: string } = req.body;

  await user_address
    .findOne({ where: { user_id: userId } })
    .then((userAddress: any) => {
      if (userAddress) {
        // If address is different, update it
        if (
          userAddress.address !== address ||
          userAddress.city !== city ||
          userAddress.phoneNumber !== phoneNumber
        ) {
          user_address
            .update(
              {
                address: address,
                city: city,
                phoneNumber: phoneNumber,
              },
              { where: { user_id: userId } }
            )
            .then(() => {
              logger.info(`Address for user with id ${userId} was updated`);
              res
                .status(200)
                .json({ message: "User  information updated successfully" }); // Return a response
            });
        } else {
          // No updates needed
          res.status(200).json(userAddress);
        }
      } else {
        // If no address exists, create a new one
        user_address
          .create({
            user_id: userId,
            address: address,
            city: city,
            phoneNumber: phoneNumber,
          })
          .then((newUserAddress) => {
            logger.info(`New address was added for user with id ${userId}`);
            res.status(201).json(newUserAddress);
          });
      }
    })
    .catch((err) => {
      logger.error(
        `Error checking user information for user with id ${userId}: ${err}`
      );
      res.status(500);
    });
};
