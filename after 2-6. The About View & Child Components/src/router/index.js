import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Menu from "../views/MenuView.vue";
import Admin from "../views/AdminView.vue";
import About from "../views/AboutView.vue";
import Delivery from "../components/Delivery.vue";
import History from "../components/History.vue";
import Locations from "../components/Locations.vue";

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
      children: [
        { path: "history", name: "historyLink", component: History },
        { path: "delivery", name: "deliveryLink", component: Delivery },
        { path: "locations", name: "locationsLink", component: Locations },
      ],
    },
  ],
});

export default router;
