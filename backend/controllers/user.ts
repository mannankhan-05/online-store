import { Request, Response } from "express";
import user from "../models/user";
import { sendMail } from "../mail";
import logger from "../logger";
import bcrypt from "bcrypt";
const salt = 5;

interface User {
  id: number;
  name: string;
  image: string;
  email: string;
  password: string;
}

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
      sendMail(email, "You are registered using your email ...");
      res.json(user);
    })
    .catch((err) => {
      logger.error("Error registering new user");
      res.status(500).json({ error: "Error registering new user", err });
    });
};

// Login an existing user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    // Find the user by email
    const existingUser = (await user.findOne({
      where: { email: email },
    })) as User | null;

    if (!existingUser) {
      logger.error("Email is not found !.");
      return res.status(500).json({ error: "Error logging in user" });
    }
    // Compare the passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      logger.info(`User is logged In as ${existingUser.name}`);
      sendMail(email, "You are logged in using your email ...");
      res.sendStatus(200);
    } else {
      logger.error("Invalid Password !.");
      return res.status(401).json({ error: "Invalid Password" });
    }
  } catch (err) {
    logger.error("Error logging in user");
    res.status(500).json({ error: "Error logging in user" });
  }
};

// Edit a user by id
export const editUser = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);
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
    .update(
      {
        name,
        image,
        email,
        password: hashedPassword,
      },
      { where: { id: userId } }
    )
    .then((user) => {
      logger.info(`User with id ${userId} is updated`);
      res.json(user);
    })
    .catch((err) => {
      logger.error(`Error updating user with id ${userId}`);
      res.status(500).json({ error: `Error updating user with id ${userId}` });
    });
};