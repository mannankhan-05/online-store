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
  getProductsBySearchQuery,
  createProduct,
  getProductsByCategory,
  editProduct,
  decrementStockByOne,
  deleteProduct,
} from "../controllers/product";
import {
  getAllUsersProducts,
  getUserProducts,
  addUserProduct,
  deleteProductsFromCart,
  removeProductFromCart,
  incrementProductQuantity,
} from "../controllers/user_product";
import {
  getAllUserAddresses,
  getUserAdressById,
  addUserAddress,
  checkUserInformation,
} from "../controllers/user_address";
import {
  createNewOrder,
  getAllOrders,
  getOrderByUserId,
  getTotalSales,
} from "../controllers/order";
import {
  getAllOrderItems,
  getOrderDetailsById,
  getOrderItemsById,
  createOrderItem,
} from "../controllers/order_item";
import { getAllFeedbacks, addFeedback } from "../controllers/feedback";
import {
  getAllProductCategories,
  getProductCategory,
  getAProductCategory,
  addProductCategory,
} from "../controllers/product_category";
import {
  getAllSearchHistory,
  getHistoryBySearch,
  addSearchHistory,
} from "../controllers/searchHistory";
import {
  getAllProductsSales,
  addProductSales,
} from "../controllers/product_sale";
import {
  getAllReviews,
  getReviewsByProductId,
  addReview,
} from "../controllers/product_review";

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

router.post("/searchProducts", getProductsBySearchQuery);

router.post("/addProduct", createProduct);

router.get("/productsByCategory/:categoryId", getProductsByCategory);

router.put("/editProduct/:productId", editProduct);

router.put("/decrementStock/:productId", decrementStockByOne);

router.delete("/deleteProduct/:productId", deleteProduct);

// user_product routes :
router.get("/userProducts", getAllUsersProducts);

router.get("/userProducts/:userId", getUserProducts);

router.post("/addUserProduct", addUserProduct);

router.delete("/deleteProductsFromCart/:userId", deleteProductsFromCart);

router.delete("/removeProductFromCart", removeProductFromCart);

router.put("/incrementProductQuantity/:productId", incrementProductQuantity);

// user_address routes :
router.get("/userAddresses", getAllUserAddresses);

router.get("/userAddress/:userId", getUserAdressById);

router.post("/addUserAddress", addUserAddress);

router.put("/checkUserInformation/:userId", checkUserInformation);

// order routes :
router.get("/orders", getAllOrders);

router.get("/orders/:userId", getOrderByUserId);

router.post("/createNewOrder", createNewOrder);

router.post("/totalSales", getTotalSales);

// order_item routes :
router.get("/orderItems", getAllOrderItems);

router.get("/orderDetails/:orderId", getOrderDetailsById);

router.get("/orderItems/:orderId", getOrderItemsById);

router.post("/createOrderItem", createOrderItem);

// feedback routes :
router.get("/feedbacks", getAllFeedbacks);

router.post("/addFeedback", addFeedback);

// product_category routes :
router.get("/allCategories", getAllProductCategories);

router.post("/AllProductsByCategories", getProductCategory);

router.get("/getByCategory", getAProductCategory);

router.post("/addProductCategory", addProductCategory);

// search history routes :
router.get("/searchHistory", getAllSearchHistory);

router.post("/searchHistoriesBySearch", getHistoryBySearch);

router.post("/addSearchHistory", addSearchHistory);

// product_sale routes :
router.get("/productSales", getAllProductsSales);

router.post("/addProductSales", addProductSales);

// product_review routes :
router.get("/allReviews", getAllReviews);

router.get("/reviews/:productId", getReviewsByProductId);

router.post("/addReview", addReview);

export default router;
