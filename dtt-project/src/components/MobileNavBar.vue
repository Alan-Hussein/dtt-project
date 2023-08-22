<!--This is navbar appears in mobile screen in the bottom of the screen and it contain links to home and about page.-->
<template>
  <div class="mobile-navbar">
    <nav class="navbar">
      <div class="icon-container">
        <RouterLink to="/" active-class="active-link">
          <img
            :src="isActive('/') ? HomeIconActive : HomeIcon" 
            alt=""
            class="navbar-icon-mobile"
          />
        </RouterLink>
      </div>
      <div class="icon-container">
        <RouterLink to="/about" active-class="active-link">
          <img
            :src="isActive('/about') ? AboutIconActive : AboutIcon"
            alt=""
            class="navbar-icon-mobile"
          />
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
// is Active is a function to copmare the crrent path with the passed path
function isActive(routePath) {
  return route.path === routePath;
}
// import images 
import HomeIcon from "../assets/ic_mobile_navigarion_home@3x.png";
import AboutIcon from "../assets/ic_mobile_navigarion_info@3x.png";
import HomeIconActive from "../assets/ic_mobile_navigarion_home_active@3x.png";
import AboutIconActive from "../assets/ic_mobile_navigarion_info_active@3x.png";
</script>

<style scoped>
.mobile-navbar {
  display: none;
}

img {
  width: 20px;
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
  .mobile-navbar {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    padding: 20px;
  }
  .navbar {
    display: flex;
    padding: 20px 50px;
  }
  .icon-container {
    padding: 0 50px;
  }
}
</style>
