import express from "express";
const router = express.Router();
import {
  getAllUsers,
  registerUser,
  loginUser,
  editUser,
  forgetPassword,
  resetPassword,
} from "../controllers/user";
import {
  getAllProducts,
  getProductById,
  createProduct,
} from "../controllers/product";
import {
  getAllUsersProducts,
  getUserProducts,
  addUserProduct,
  deleteProductsFromCart,
} from "../controllers/user_product";

router.get("/users", getAllUsers);

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.put("/editUser/:userId", editUser);

router.post("/forgetPassword", forgetPassword);

router.put("/resetPassword/:userId", resetPassword);

router.get("/products", getAllProducts);

router.get("/product/:productId", getProductById);

router.post("/addProduct", createProduct);

router.get("/userProducts", getAllUsersProducts);

router.get("/userProducts/:userId", getUserProducts);

router.post("/addUserProduct", addUserProduct);

router.delete("/deleteProductsFromCart/:userId", deleteProductsFromCart);

export default router;
