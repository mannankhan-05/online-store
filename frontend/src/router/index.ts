import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import productsPage from "@/components/productsPage.vue";
import userLogin from "@/components/userLogin.vue";
import userSignUp from "@/components/userSignUp.vue";
import singleProduct from "@/components/singleProduct.vue";
import userCart from "@/components/userCart.vue";
import forgetPassword from "@/components/forgetPassword.vue";
import resetPassword from "@/components/resetPassword.vue";
import editProfile from "@/components/editProfile.vue";
import beAdmin from "@/components/beAdmin.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
