import { Request, Response } from "express";
import { Model } from "sequelize";
import product from "../models/product";
import logger from "../logger";
import multer from "multer";
import path from "path";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "productImages/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get all products
export const getAllProducts = (req: Request, res: Response) => {
  product
    .findAll()
    .then((products) => {
      logger.info("All products were retrieved");
      const result = products.map((product: any) => {
        if (product.image) {
          product.image = `http://localhost:4000/productImages/${product.image}`;
        }
        return product;
      });
      res.json(result);
    })
    .catch((err) => {
      logger.error(`Error retrieving products: ${err}`);
      res.status(500).json({ error: "Error retrieving products" });
    });
};

// Get a product by id
export const getProductById = (req: Request, res: Response) => {
  // 10 is the radix parameter which specifies the base of the number in below line
  const productId: number = parseInt(req.params.productId, 10);
  product
    .findByPk(productId)
    .then((product) => {
      if (product) {
        logger.info(`Product with id ${productId} was retrieved`);

        const productData = { ...product.get() }; // .get() converts Sequelize model instance to plain object

        if (productData.image) {
          productData.image = `http://localhost:4000/productImages/${productData.image}`;
        }

        res.json(productData);
      } else {
        logger.warn(`Product with id ${productId} not found`);
        res
          .status(404)
          .json({ error: `Product with id ${productId} not found` });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving product with id ${productId} : ${err}`);
      res
        .status(500)
        .json({ error: `Error retrieving product with id ${productId}` });
    });
};

// Create a new product
export const createProduct = (req: Request, res: Response) => {
  upload.single("productImage")(req, res, (err) => {
    if (err) {
      logger.error("Error uploading productImage");
    }

    const {
      name,
      price,
      description,
      category,
    }: {
      name: string;
      price: number;
      description: string;
      category: string;
    } = req.body;

    const image: string = req.file ? req.file.filename : "";

    product
      .create({
        name,
        price,
        description,
        image,
        category,
      })
      .then((product) => {
        logger.info(`A new product is created`);
        res.sendStatus(200);
      })
      .catch((err) => {
        logger.error(`Error creating a new product: ${err}`);
        res.status(500).json({ error: "Error creating a new product" });
      });
  });
};
