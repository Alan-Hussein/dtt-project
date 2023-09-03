<!-- Here is button used to back to house details page. -->
<template>
  <div >
    <router-link class="back" :to="{ name: 'house-details' }">
      <img
        src="../assets/ic_back_grey@3x.png"
        alt="back-icon"
        class="back-icon"
      />
      <p class="back-text">Back to detail page</p>
    </router-link>
  </div>
</template>
<style scoped>
.back {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.back-text {
  color: #000000;
}

.back-icon {
  width: 16px;
}
@media only screen and (max-width: 600px) {
  .back-text {
    display: none;
  }
}
</style>
