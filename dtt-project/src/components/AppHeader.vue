<template>
  <div class="app-header">
    <Logo></Logo>
    <nav class="navbar">
      <RouterLink
        to="/"
        class="link"
        :class="{ 'active-link': activeLink === 'home' }"
        @click="setActiveLink('home')"
        >Houses</RouterLink
      >
      <RouterLink
        to="/about"
        class="link"
        :class="{ 'active-link': activeLink === 'about' }"
        @click="setActiveLink('about')"
        >About</RouterLink
      >
    </nav>
  </div>
</template>


<script setup>
import { RouterLink ,useRoute} from "vue-router";
import { ref } from "vue";

import Logo from "./Logo.vue";
const route = useRoute();
const activeLink = ref("home"); // Set a default active link

const setActiveLink = (linkName) => {
  activeLink.value = linkName;
};
</script>

<style scoped>
.app-header {
  display: flex;
  padding: 20px 20%;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #ffffff;
  width: 100%;
}
.navbar {
  display: flex;
  align-items: center;
}
img {
  width: 80px;
}
.link {
  text-decoration: none;
  color: #e8e8e8; /* Set the color for inactive link */
  margin-left: 20px;
  font-family: "Montserrat Bold", sans-serif;
  font-size: 18px;
}
.active-link {
  color: #000000; /* Set the color for active link */
  font-weight: bold; /* set bold for acrive link*/
}
@media only screen and (max-width: 600px) {
  .app-header {
    display: none;
  }
}
</style>
