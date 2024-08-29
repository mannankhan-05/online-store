import { Request, Response } from "express";
import user from "../models/user";
import logger from "../logger";
import bcrypt from "bcrypt";
const salt = 5;

// Get all users
export const getAllUsers = (req: Request, res: Response) => {
  user
    .findAll()
    .then((users) => {
      logger.info("All users were retrieved");
      res.json(users);
    })
    .catch((err) => {
      logger.error(`Error retrieving users: ${err}`);
      res.status(500).json({ error: "Error retrieving users" });
    });
};

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const {
    name,
    image,
    email,
    password,
  }: { name: string; image: string; email: string; password: string } =
    req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, salt);

  await user
    .create({
      name,
      image,
      email,
      password: hashedPassword,
    })
    .then((user) => {
      logger.info("New user is registered");
      res.json(user);
    })
    .catch((err) => {
      logger.error("Error registering new user");
      res.status(500).json({ error: "Error registering new user" });
    });
};
