import { Request, Response } from "express";
import product_sale from "../models/product_sale";
import product from "../models/product";
import product_category from "../models/product_category";
import logger from "../logger";

interface ProductSales {
  id: number;
  product_id: number;
  total_sales: number;
}

// to get sales of all products
export const getAllProductsSales = (req: Request, res: Response) => {
  product_sale
    .findAll({
      include: [
        {
          model: product,
          include: [
            {
              model: product_category,
            },
          ],
        },
      ],
    })
    .then((productSales) => {
      logger.info("Fetched all products sales record.");
      res.json(productSales);
    })
    .catch((err) => {
      logger.error("Error fetching all products sales record : " + err);
      res.sendStatus(500);
    });
};

// to add new sales of a product
export const addProductSales = async (req: Request, res: Response) => {
  const { productId, totalSales }: { productId: number; totalSales: number } =
    req.body;

  const productExists = await product_sale.findOne({
    where: { product_id: productId },
  });

  if (!productExists) {
    await product_sale
      .create({
        product_id: productId,
        total_sales: totalSales,
        include: [
          {
            model: product,
            include: [
              {
                model: product_category,
              },
            ],
          },
        ],
      })
      .then((addedProductSales) => {
        logger.info("Added the sales of a product");
        res.json(addedProductSales);
      })
      .catch((err) => {
        logger.error("Error adding the sales of a product : " + err);
        res.sendStatus(500);
      });
  } else {
    const currentSales = (productExists as any).total_sales || 0;

    await product_sale
      .update(
        {
          total_sales: currentSales + totalSales,
        },
        { where: { product_id: productId } }
      )
      .then((updatedProductSales) => {
        logger.info(
          `Updated the sales of product where productId is : ${productId}`
        );
        res.json(updatedProductSales);
      })
      .catch((err) => {
        logger.error(
          `Error updating the sales where productId is : ${productId}`
        );
        res.sendStatus(500);
      });
  }
};
