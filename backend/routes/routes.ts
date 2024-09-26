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
  getProductsByCategory,
} from "../controllers/product";
import {
  getAllUsersProducts,
  getUserProducts,
  addUserProduct,
  deleteProductsFromCart,
} from "../controllers/user_product";
import {
  getAllUserAddresses,
  getUserAdressById,
  addUserAddress,
} from "../controllers/user_address";

// user routes :
router.get("/users", getAllUsers);

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.put("/editUser/:userId", editUser);

router.post("/forgetPassword", forgetPassword);

router.put("/resetPassword/:userId", resetPassword);

// product routes :
router.get("/products", getAllProducts);

router.get("/product/:productId", getProductById);

router.post("/addProduct", createProduct);

router.post("/productsByCategory", getProductsByCategory);

// user_product routes :
router.get("/userProducts", getAllUsersProducts);

router.get("/userProducts/:userId", getUserProducts);

router.post("/addUserProduct", addUserProduct);

router.delete("/deleteProductsFromCart/:userId", deleteProductsFromCart);

// user_address routes :
router.get("/userAddresses", getAllUserAddresses);

router.get("/userAddress/:userId", getUserAdressById);

router.post("/addUserAddress", addUserAddress);

export default router;
