import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUserDetailsById,
  registerUser,
  loginUser,
  editUser,
  forgetPassword,
  resetPassword,
  updateUserEmail,
  updateUserStatus,
} from "../controllers/user";
import {
  getAllProducts,
  getProductById,
  createProduct,
  getProductsByCategory,
  editProduct,
  deleteProduct,
} from "../controllers/product";
import {
  getAllUsersProducts,
  getUserProducts,
  addUserProduct,
  deleteProductsFromCart,
  removeProductFromCart,
} from "../controllers/user_product";
import {
  getAllUserAddresses,
  getUserAdressById,
  addUserAddress,
  checkUserInformation,
} from "../controllers/user_address";
import { createNewOrder, getAllOrders } from "../controllers/order";

// user routes :
router.get("/users", getAllUsers);

router.get("/user/:userId", getUserDetailsById);

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.put("/editUser/:userId", editUser);

router.post("/forgetPassword", forgetPassword);

router.put("/resetPassword/:userId", resetPassword);

router.put("/updateUserEmail/:userId", updateUserEmail);

router.put("/updateUserStatus/:userId", updateUserStatus);

// product routes :
router.get("/products", getAllProducts);

router.get("/product/:productId", getProductById);

router.post("/addProduct", createProduct);

router.post("/productsByCategory", getProductsByCategory);

router.put("/editProduct/:productId", editProduct);

router.delete("/deleteProduct/:productId", deleteProduct);

// user_product routes :
router.get("/userProducts", getAllUsersProducts);

router.get("/userProducts/:userId", getUserProducts);

router.post("/addUserProduct", addUserProduct);

router.delete("/deleteProductsFromCart/:userId", deleteProductsFromCart);

router.delete("/removeProductFromCart", removeProductFromCart);

// user_address routes :
router.get("/userAddresses", getAllUserAddresses);

router.get("/userAddress/:userId", getUserAdressById);

router.post("/addUserAddress", addUserAddress);

router.put("/checkUserInformation/:userId", checkUserInformation);

// order routes :
router.get("/orders", getAllOrders);

router.post("/createNewOrder", createNewOrder);

export default router;
