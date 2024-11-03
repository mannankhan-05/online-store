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
export const getAllProducts = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 4;
  const offset = (parseInt(req.query.page as string) || 0) * limit;

  try {
    const { count, rows: products } = await product.findAndCountAll({
      limit,
      offset,
    });

    const result = products.map((product: any) => {
      if (product.image) {
        product.image = `http://localhost:4000/productImages/${product.image}`;
      }
      return product;
    });

    res.json({ products: result, totalProducts: count }); // Send total products for pagination
  } catch (err) {
    logger.error(`Error retrieving products: ${err}`);
    res.status(500).json({ error: "Error retrieving products" });
  }
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

// to get products by category
export const getProductsByCategory = (req: Request, res: Response) => {
  const { category }: { category: string } = req.body;

  product
    .findAll({ where: { category: category } })
    .then((productsByCategories) => {
      logger.info(`Products by category : ${category} were retrieved`);
      const result = productsByCategories.map((product: any) => {
        if (product.image) {
          product.image = `http://localhost:4000/productImages/${product.image}`;
        }
        return product;
      });
      res.json(result);
    })
    .catch((err) => {
      logger.error(`Error retrieving products by category : ${err}`);
      res.status(500);
    });
};

// to edit a product
export const editProduct = (req: Request, res: Response) => {
  upload.single("productImage")(req, res, (err) => {
    if (err) {
      logger.error("Error updating the productImage");
      res.sendStatus(500);
    }

    const productId: number = parseInt(req.params.productId, 10);
    const image: string = req.file ? req.file.filename : "";

    const {
      name,
      price,
      description,
    }: { name: string; price: number; description: string } = req.body;

    product
      .update(
        {
          name,
          price,
          description,
          image,
        },
        { where: { id: productId } }
      )
      .then(() => {
        logger.info(`Product with id ${productId} is updated`);
        res.sendStatus(200);
      })
      .catch((err) => {
        logger.error(`Error updating product with id ${productId} : ${err}`);
        res.sendStatus(500);
      });
  });
};

// to delete a product
export const deleteProduct = (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.productId, 10);

  product
    .destroy({ where: { id: productId } })
    .then(() => {
      logger.info(`Product with id ${productId} is deleted`);
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(`Error deleting product with id ${productId} : ${err}`);
      res.sendStatus(500);
    });
};
