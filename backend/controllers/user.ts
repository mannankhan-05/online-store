import { Request, Response } from "express";
import user from "../models/user";
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
      res.json(user);
    })
    .catch((err) => {
      logger.error("Error registering new user");
      res.status(500).json({ error: "Error registering new user" });
    });
};

// Login an existing user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  // // Find the user by email
  // await user
  //   .findOne({ where: { email: email } })
  //   .then(async (user: User | null) => {
  //     // Compare the passwords
  //     if (await bcrypt.compare(password, user.password)) {
  //       logger.info(`User ${user.name} is logged in`);
  //       res.sendStatus(200);
  //     } else {
  //       logger.error("Invalid password");
  //       res.sendStatus(500);
  //     }
  //   })
  //   .catch((err) => {
  //     logger.error("Email not found");
  //     res.status(500).json({ error: "Error logging in user" });
  //   });
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
