import { Request, Response } from "express";
import user from "../models/user";
import { sendMail } from "../mail";
import { verificationCode } from "../verificationCodeMail";
import logger from "../logger";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
const saltRounds = 5;

interface User {
  id: number;
  name: string;
  image: string;
  email: string;
  password: string;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "userImages/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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
export const registerUser = (req: Request, res: Response) => {
  upload.single("userImage")(req, res, async (err) => {
    if (err) {
      logger.error("Error uploading user image" + err);
      res.status(500).json({ error: "Error uploading user image" });
    }

    const image: string = req.file ? req.file.filename : "";

    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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
        logger.error("Error registering new user" + err);
        res.status(500).json({ error: "Error registering new user", err });
      });
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
      res.json(existingUser);
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
  const hashedPassword = await bcrypt.hash(password, saltRounds);

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

// Forget password
export const forgetPassword = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;

  try {
    await user.findOne({ where: { email: email } });

    logger.info(`User with email ${email} is found`);

    const code = await verificationCode(email);
    console.log("code : " + code);
    res.json(code); // Send the code in response to frontend
  } catch (err) {
    logger.error(`Error finding user with email ${email}: `, err);
    res.status(500).json({ error: "Error finding user" });
  }
};
