  <!-- Here is button used to back to overview page (home). -->

<template>
  <div class="back">
    <router-link :to="{ name: 'home' }">
      <img
        v-if="isMobile"
        src="../assets/ic_back_white@3x.png"
        alt="back-icon-white"
        class="back-icon-white"
      />
      <img
        v-else
        src="../assets/ic_back_grey@3x.png"
        alt="back-icon-white"
        class="back-icon"
      />
    </router-link>
    <p class="back-text">Back to overview</p>
  </div>
</template>
<script>
export default {
  props: {
    isMobile: Boolean, /* use isMobile prop to get custom image.  */
  },
};
</script>
<style>
.back {
  display: flex;
  align-items: center;
}
.back-icon {
  width: 16px;
}
/* Responsive Style */
@media only screen and (max-width: 600px) {
  .back-icon-white {
    width: 12px;
    position: absolute;
    top: 15px;
    left: 15px;
  }
  h2 {
    padding-left: 10%;
  }
}
</style>
