import { Request, Response } from "express";
import { Model } from "sequelize";
import { Op } from "sequelize";
import db from "../config/database";
import product from "../models/product";
import product_category from "../models/product_category";
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
      include: [
        {
          model: product_category,
        },
      ],
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
    .findByPk(productId, {
      include: [
        {
          model: product_category,
        },
      ],
    })
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

// Get products by search query
export const getProductsBySearchQuery = async (req: Request, res: Response) => {
  try {
    const { searchQuery }: { searchQuery: string } = req.body;
    const limit = parseInt(req.query.limit as string) || 4;
    const offset = (parseInt(req.query.page as string) || 0) * limit;

    // Fetch products
    const { count, rows: products } = await product.findAndCountAll({
      limit,
      offset,
      where: {
        name: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
      include: [
        {
          model: product_category,
        },
      ],
    });

    const result = products.map((product: any) => {
      if (product.image) {
        product.image = `http://localhost:4000/productImages/${product.image}`;
      }
      return product;
    });

    // Respond with products and total count
    logger.info(`Products with search query "${searchQuery}" were retrieved`);
    res.json({ products: result, totalProducts: count });
  } catch (err) {
    logger.error(
      `Error retrieving products with search query "${req.body.searchQuery}": ${err}`
    );
    res.status(500).json({ error: "Failed to fetch products" });
  }
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
      stock,
    }: {
      name: string;
      price: number;
      description: string;
      category: number;
      stock: number;
    } = req.body;

    const image: string = req.file ? req.file.filename : "";

    product
      .create({
        name,
        price,
        description,
        image,
        category,
        stock,
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

// Get products by category
export const getProductsByCategory = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 4;
  const offset = (parseInt(req.query.page as string) || 0) * limit;
  const categoryId: number = parseInt(req.params.categoryId, 10);

  try {
    const { count, rows: products } = await product.findAndCountAll({
      where: { category: categoryId },
      limit,
      offset,
      include: [
        {
          model: product_category,
        },
      ],
    });

    const result = products.map((product: any) => {
      if (product.image) {
        product.image = `http://localhost:4000/productImages/${product.image}`;
      }
      return product;
    });

    res.json({ products: result, totalProducts: count });
  } catch (err) {
    logger.error(
      `Error retrieving products by category ${categoryId} : ${err}`
    );
    res
      .status(500)
      .json({ error: `Error retrieving products by category ${categoryId}` });
  }
};

// to decrement the stock of a product
// export const decrementStockByOne = (req: Request, res: Response) => {
//   const productId: number = parseInt(req.params.productId, 10);
//   const quantity: number = req.body.quantity;

//   product
//     .findByPk(productId)
//     .then((product: any) => {
//       if (product.stock > 0) {
//         product
//           .update(
//             { stock: product.stock - quantity },
//             { where: { id: productId } }
//           )
//           .then(() => {
//             logger.info(`Stock of product with id ${productId} is decremented`);
//             res.sendStatus(200);
//           })
//           .catch((err: unknown) => {
//             logger.error(
//               `Error decrementing stock of product with id ${productId} : ${err}`
//             );
//             res.sendStatus(500);
//           });
//       } else {
//         logger.warn(`Stock of product with id ${productId} is 0`);
//         res.sendStatus(400);
//       }
//     })
//     .catch((err) => {
//       logger.error(
//         `Error retrieving product with id ${productId} to decrement stock : ${err}`
//       );
//       res.sendStatus(500);
//     });
// };

export const decrementStockByOne = async (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.productId, 10);
  const quantity: number = req.body.quantity;

  // A transaction groups operations together to ensure atomicity—either all succeed, or none do.
  const transaction = await db.transaction();

  try {
    const productRow: any = await product.findOne({
      where: { id: productId },
      lock: transaction.LOCK.UPDATE, // Lock the row for update
      transaction,
    });

    if (!productRow) {
      logger.warn(`Product with id ${productId} not found`);
      await transaction.rollback();
      return res.sendStatus(404);
    }

    // check stock availability
    if (productRow.stock >= quantity) {
      productRow.stock -= quantity;
      await productRow.save({ transaction });

      logger.info(`Stock of product with id ${productId} is decremented`);
      await transaction.commit(); // commit the transaction
      return res.sendStatus(200);
    } else {
      logger.warn(`Insufficient Stock of product with id ${productId}`);
      await transaction.rollback();
      return res.sendStatus(400);
    }
  } catch (err) {
    logger.error(
      `Error decrementing stock of product with id ${productId} : ${err}`
    );
    await transaction.rollback();
    return res.sendStatus(500);
  }
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
      stock,
    }: { name: string; price: number; description: string; stock: number } =
      req.body;

    product
      .update(
        {
          name,
          price,
          description,
          image,
          stock,
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
