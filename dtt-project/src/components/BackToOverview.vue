<!-- Here is button used to back to overview page (home). -->

<template>
  <div>
    <router-link :to="{ name: 'home' }" class="back">
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
      <p class="back-text">Back to overview</p>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    isMobile: Boolean /* use isMobile prop to get custom image.  */,
  },
};
</script>
<style scoped>
.back {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.back-icon {
  width: 16px;
}
.back-text {
  color: #000000;
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
  .back-text{
    display: none;
  }
}
</style>
