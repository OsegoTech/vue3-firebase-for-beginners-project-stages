import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Menu from "../views/MenuView.vue";
import Admin from "../views/AdminView.vue";
import About from "../views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/menu",
      name: "menuLink",
      component: Menu,
    },
    {
      path: "/admin",
      name: "adminLink",
      component: Admin,
    },
    {
      path: "/about",
      name: "aboutLink",
      component: About,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
