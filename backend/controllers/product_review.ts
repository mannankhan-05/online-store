import { Request, Response } from "express";
import product_review from "../models/product_review";
import product from "../models/product";
import user from "../models/user";
import logger from "../logger";

// to get all reviews
export const getAllReviews = (req: Request, res: Response) => {
  product_review
    .findAll({
      include: [
        {
          model: product,
        },
        {
          model: user,
        },
      ],
    })
    .then((reviews) => {
      logger.info("All Product reviews are retrieved");
      res.json(reviews);
    })
    .catch((err) => {
      logger.error(`Error retrieving product reviews: ${err}`);
      res.sendStatus(500);
    });
};

// to add a review
export const addReview = (req: Request, res: Response) => {
  const {
    product_id,
    user_id,
    review,
    rating,
  }: { product_id: number; user_id: number; review: string; rating: number } =
    req.body;

  product_review
    .create({
      product_id,
      user_id,
      review,
      rating,
    })
    .then((review) => {
      logger.info(`Review added successfully of product with id ${product_id}`);
      res.json(review);
    })
    .catch((err) => {
      logger.error(`Error adding review: ${err}`);
      res.sendStatus(500);
    });
};
