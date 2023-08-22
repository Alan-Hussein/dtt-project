import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import Home from "./views/Home/Home.vue";
import About from "./views/About.vue";
import HouseDetails from "./views/HouseDetails/HouseDetails.vue";
import CreateHouse from "./views/CreateHouse/CreateHouse.vue";
import EditHouse from "./views/EditHouse/EditHouse.vue";
import MobileNavBar from "./components/MobileNavBar.vue";
const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", component: About },
  {
    path: "/house/:id", // Dynamic route parameter
    name: "house-details",
    component: HouseDetails,
    props: true, // Automatically pass route params as props
  },
  { path: "/create-house", name: "create-house", component: CreateHouse },
  {
    path: "/houses/:id/edit",
    name: "edit-house",
    component: EditHouse,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.component("AppHeader", AppHeader);
app.component("MobileNavBar", MobileNavBar);
app.use(router);
app.mount("#app");
