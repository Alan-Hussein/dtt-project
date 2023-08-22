<template>
  <div class="edit-button">
    <router-link :to="{ name: 'edit-house', params: { id: house.id } }">
      <img src="../assets/ic_edit@3x.png" alt="edit-icon" class="icon" />
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    houseId: String,
    isMobile: Boolean,
  },
};
</script>
