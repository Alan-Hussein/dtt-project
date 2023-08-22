<!--This component appears when click delete button fr confirmation -->
<template>
  <div class="delete-confirmation">
    <p>Are you sure you want to delete this house?</p>
    <button @click="confirmDelete">Yes, Delete</button>
    <button @click="cancelDelete">Go Back</button>
  </div>
</template>

<script>
export default {
  methods: {
    // Method to confirm the delete action
    confirmDelete() {
      // Emitting a custom event "deleteConfirmed"

      this.$emit("deleteConfirmed");
    },
    // Method to cancel the delete action
    cancelDelete() {
      this.$emit("deleteCanceled");
    },
  },
};
</script>

<style scoped>
.delete-confirmation {
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
