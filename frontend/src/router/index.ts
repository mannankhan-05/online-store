import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "../store";
import productsPage from "@/components/productsPage.vue";
import userLogin from "@/components/userLogin.vue";
import userSignUp from "@/components/userSignUp.vue";
import singleProduct from "@/components/singleProduct.vue";
import userCart from "@/components/userCart.vue";
import forgetPassword from "@/components/forgetPassword.vue";
import resetPassword from "@/components/resetPassword.vue";
import editProfile from "@/components/editProfile.vue";
import beAdmin from "@/components/beAdmin.vue";
import adminPanel from "@/components/adminPanel.vue";
import addProduct from "@/components/addProduct.vue";
import adminProducts from "@/components/adminProducts.vue";
import allUsers from "@/components/allUsers.vue";
import allOrders from "@/components/allOrders.vue";
import userAllOrders from "@/components/userAllOrders.vue";
import orderDetailsPage from "@/components/orderDetailsPage.vue";
import landingPage from "@/components/landingPage.vue";

// function to check login status
function isLoggedIn(): boolean {
  return store.state.isUserLoggedIn;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: landingPage,
  },
  {
    path: "/products",
    name: "products",
    component: productsPage,
  },
  {
    path: "/login",
    name: "login",
    component: userLogin,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: userSignUp,
  },
  {
    path: "/edit-profile/:userId",
    name: "editProfile",
    component: editProfile,
  },
  {
    path: "/forget-password",
    name: "forgetPassword",
    component: forgetPassword,
  },
  {
    path: "/reset-password/:userId",
    name: "resetPassword",
    component: resetPassword,
  },
  {
    path: "/beAdmin/:userId",
    name: "beAdmin",
    component: beAdmin,
  },
  {
    path: "/admin-panel/:userId",
    name: "adminPanel",
    component: adminPanel,
  },
  {
    path: "/user/:userId/product/:productId",
    name: "fullProduct",
    component: singleProduct,
  },
  {
    path: "/user/:userId",
    name: "user",
    component: productsPage,
  },
  {
    path: "/user/:userId/cart",
    name: "cart",
    component: userCart,
  },
  {
    path: "/admin/:userId/addProduct",
    name: "addProduct",
    component: addProduct,
  },
  {
    path: "/admin/:userId/products",
    name: "adminProducts",
    component: adminProducts,
  },
  {
    path: "/admin/:userId/allUsers",
    name: "allUsers",
    component: allUsers,
  },
  {
    path: "/admin/:userId/allOrders",
    name: "allOrders",
    component: allOrders,
  },
  {
    path: "/user/:userId/allOrders",
    name: "userAllOrders",
    component: userAllOrders,
  },
  {
    path: "/user/:userId/order/:orderId",
    name: "orderDetails",
    component: orderDetailsPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/",
    "/login",
    "/signUp",
    "/forget-password",
    "/reset-password",
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = isLoggedIn();

  if (authRequired && !loggedIn) {
    return next("/");
  }

  if (to.path == "/" && loggedIn) {
    return next(`/user/${store.state.userId}`);
  }

  next();
});

export default router;
