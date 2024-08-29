import express from "express";
const router = express.Router();
import { getAllUsers } from "../controllers/user";
import { getAllProducts } from "../controllers/product";

router.get("/users", getAllUsers);

router.get("/products", getAllProducts);

export default router;
