  <!-- Here is button used to back to house details page. -->
<template>
  <div class="back">
    <router-link :to="{ name: 'house-details' }">
      <img
        src="../assets/ic_back_grey@3x.png"
        alt="back-icon"
        class="back-icon"
    /></router-link>
    <p class="back-text">Back to detail page</p>
  </div>
</template>
<style>
.back {
  display: flex;
  align-items: center;
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
