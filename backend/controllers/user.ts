import { Request, Response } from "express";
import user from "../models/user";
import { sendMail } from "../mails/mail";
import { verificationCode } from "../mails/verificationCodeMail";
import { adminCode } from "../mails/adminCodeMail";
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
    .findAll({ where: { isAdmin: false } })
    .then((users: any) => {
      logger.info("All users were retrieved");

      if (users) {
        // Modify image URLs for all users
        users.forEach((user: any) => {
          if (user.image) {
            user.image = `http://localhost:4000/userImages/${user.image}`;
          }
        });

        res.json(users);
      } else {
        logger.error("Error retrieving users");
        res.status(404).json({ error: "No users found" });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving users: ${err}`);
      res.status(500).json({ error: "Error retrieving users" });
    });
};

// Get a user by id
export const getUserDetailsById = (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);

  user
    .findOne({ where: { id: userId } })
    .then((user: any) => {
      if (user) {
        logger.info(`Details of user with id ${userId} is retrieved`);
        if (user.image) {
          user.image = `http://localhost:4000/userImages/${user.image}`;
        }
        res.json(user);
      } else {
        logger.error(`No user found with id ${userId}`);
        res.status(404).json({ error: "No user found" });
      }
    })
    .catch((err) => {
      logger.error(`Error retreiving user with id ${userId} : ` + err);
      res
        .status(500)
        .json({ error: `Error retreiving user with id ${userId}` });
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
  upload.single("userImage")(req, res, async (err) => {
    if (err) {
      logger.error("Error uploading user image: " + err);
      return res.status(500).json({ error: "Error uploading user image" });
    }

    const userId: number = parseInt(req.params.userId);
    const image: string = req.file ? req.file.filename : "";
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;

    if (!password) {
      try {
        const [affectedRows, updatedUsers] = await user.update(
          { name, image, email },
          { where: { id: userId }, returning: true }
        );

        if (affectedRows === 0) {
          logger.warn(`No user found with id ${userId}`);
          return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = updatedUsers[0];
        logger.info(`User with id ${userId} updated without password`);
        console.log("Updated user: ", updatedUser);
        return res.json(updatedUser);
      } catch (err) {
        logger.error(`Error updating user with id ${userId} without password`);
        return res.status(500).json({
          error: `Error updating user with id ${userId} without password`,
        });
      }
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [affectedRows, updatedUsers] = await user.update(
          { name, image, email, password: hashedPassword },
          { where: { id: userId }, returning: true }
        );

        if (affectedRows === 0) {
          logger.warn(`No user found with id ${userId}`);
          return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = updatedUsers[0];
        logger.info(`User with id ${userId} updated`);
        console.log("Updated user: ", updatedUser);
        return res.json(updatedUser);
      } catch (err) {
        logger.error(`Error updating user with id ${userId}`);
        return res
          .status(500)
          .json({ error: `Error updating user with id ${userId}` });
      }
    }
  });
};

// Forget password
export const forgetPassword = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;

  try {
    let myUser = await user.findOne({ where: { email: email } });

    if (!myUser) {
      logger.error(`No user found with email ${email}`);
      return res.status(404).json({ error: "User not found" });
    }

    logger.info(`User with email ${email} is found`);

    // Convert Sequelize Model to plain JavaScript object
    const userData = myUser.toJSON() as User;

    const code = await verificationCode(email);
    res.json({ userId: userData.id, code }); // Send the code and userId in response to frontend
  } catch (err) {
    logger.error(`Error finding user with email ${email}: `, err);
    res.status(500).json({ error: "Error finding user" });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);
  const { password }: { password: string } = req.body;

  const hashedPassword: string = await bcrypt.hashSync(password, saltRounds);

  user
    .update(
      {
        password: hashedPassword,
      },
      { where: { id: userId } }
    )
    .then(() => {
      logger.info(`Password is reseted for the user with id ${userId}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(
        `Error resseting password for the user with id ${userId} : ` + err
      );
      res.sendStatus(500);
    });
};

// Update only user's email if user wanted to when becoming the admin
export const updateUserEmail = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);
  const { email }: { email: string } = req.body;

  await user
    .findOne({ where: { id: userId } })
    .then(async (existingUser: any) => {
      if (existingUser.email == email) {
        logger.info(
          "User does not want to update the email before becoming the admin"
        );

        const code = await adminCode(email);
        console.log("code: ", code);
        res.json({ email, code });
      } else {
        user
          .update({ email }, { where: { id: userId } })
          .then(async () => {
            logger.info(
              `Email is updated for the user with id ${userId} before becoming the admin`
            );
            const code = await adminCode(email);
            console.log("code: ", code);
            res.json({ email, code });
          })
          .catch((err) => {
            logger.error(
              `Error updating email for the user with id ${userId} : ` + err
            );
            res.sendStatus(500);
          });
      }
    });
};

// To update the isAdmin status of the user from false to true
export const updateUserStatus = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);

  user
    .update(
      {
        isAdmin: true,
      },
      {
        where: { id: userId },
      }
    )
    .then((affectedRows) => {
      if (affectedRows[0] === 0) {
        res.status(404).send("User not found");
      } else {
        return user.findByPk(userId); // Fetch updated user
      }
    })
    .then((updatedUser) => {
      if (updatedUser) {
        logger.info(`User with id ${userId} is now an admin`);
        res.json(updatedUser);
      }
    })
    .catch((err) => {
      logger.error(
        `Error updating user to admin where user id is ${userId} : ` + err
      );
      res.sendStatus(500);
    });
};
