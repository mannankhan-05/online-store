import express from "express";
const router = express.Router();
import { getAllUsers, registerUser } from "../controllers/user";
import {
  getAllProducts,
  getProductById,
  createProduct,
} from "../controllers/product";
import { getAllUsersProducts } from "../controllers/user_product";

router.get("/users", getAllUsers);

router.post("/registerUser", registerUser);

router.get("/products", getAllProducts);

router.get("/product/:productId", getProductById);

router.post("/addProduct", createProduct);

router.get("/userProducts", getAllUsersProducts);

export default router;
