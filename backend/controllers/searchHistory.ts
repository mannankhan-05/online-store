import { Request, Response } from "express";
import { Op } from "sequelize";
import searchHistory from "../models/searchHistory";
import logger from "../logger";

// get all search history
export const getAllSearchHistory = (req: Request, res: Response) => {
  searchHistory
    .findAll()
    .then((searchHistory) => {
      logger.info("All search history retrieved");
      res.json(searchHistory);
    })
    .catch((err) => {
      logger.error("Error retrieving search history");
      res.sendStatus(500);
    });
};

//get search history be relevant to search
export const getHistoryBySearch = async (req: Request, res: Response) => {
  const { search }: { search: string } = req.body;
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const { count, rows: searches } = await searchHistory.findAndCountAll({
      limit,
      where: {
        search: {
          // [Op.like] is a Sequelize operator that performs a SQL LIKE query.
          [Op.like]: `%${search}%`,
        },
      },
    });

    logger.info(`Search history retrieved successfully for query: "${search}"`);
    res.json({ searches, total: count });
  } catch (err) {
    logger.error("Error retrieving search history");
    res.sendStatus(500);
  }
};

// add a new search history
export const addSearchHistory = async (req: Request, res: Response) => {
  const { search }: { search: string } = req.body;

  let searchExists = await searchHistory.findOne({ where: { search: search } });

  if (!searchExists) {
    searchHistory
      .create({
        search: search,
      })
      .then((newSearch) => {
        logger.info("New search history added");
        res.json(newSearch);
      })
      .catch((err) => {
        logger.error("Error adding search history");
        res.sendStatus(500);
      });
  } else {
    logger.info("Search already exists");
    res.sendStatus(200);
  }
};
