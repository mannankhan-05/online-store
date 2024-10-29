import { Request, Response } from "express";
import feedback from "../models/feedback";
import logger from "../logger";

// to get all feedbacks of users
export const getAllFeedbacks = (req: Request, res: Response) => {
  feedback
    .findAll()
    .then((feedbacks) => {
      logger.info("Fetched all feedbacks of users");
      res.json(feedbacks);
    })
    .catch((err) => {
      logger.error("Error fetching feedbacks of users" + err);
      res.sendStatus(500);
    });
};

// to add feedback of a user in the database
export const addFeedback = (req: Request, res: Response) => {
  const {
    name,
    email,
    subject,
    remarks,
  }: { name: string; email: string; subject: string; remarks: string } =
    req.body;

  feedback
    .create({
      user_name: name,
      user_email: email,
      subject: subject,
      remarks: remarks,
    })
    .then((feedback) => {
      logger.info("Feedback added successfully");
      res.json(feedback);
    })
    .catch((err) => {
      logger.error("Error adding a feedback" + err);
      res.sendStatus(500);
    });
};
