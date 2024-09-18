import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import productsPage from "../components/productsPage.vue";
import userLogin from "../components/userLogin.vue";
import userSignUp from "../components/userSignUp.vue";
import singleProduct from "../components/singleProduct.vue";

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
    path: "/product/:productId",
    name: "fullProduct",
    component: singleProduct,
  },
  {
    path: "/user/:userId",
    name: "user",
    component: productsPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
