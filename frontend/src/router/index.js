import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/components/RegisterPage/RegisterForm.vue"),
    },
  ],
});

export default router;
