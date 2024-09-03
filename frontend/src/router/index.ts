import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import productsPage from "../components/productsPage.vue";
import userLogin from "../components/userLogin.vue";
import userSignUp from "../components/userSignUp.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
