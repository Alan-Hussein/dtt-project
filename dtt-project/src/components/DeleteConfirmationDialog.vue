<!--This component appears when click delete button fr confirmation -->
<template>
  <div class="delete-confirmation">
    <div class="confirmation-box">
      <h3>Deleting list</h3>
      <p>Are you sure you want to delete this listing?</p>
      <p>This action can not be undone.</p>
      <div class="delete-buttons">
        <button @click="confirmDelete" class="red-delete-button">
          Yes, Delete
        </button>
        <button @click="cancelDelete" class="grey-back-button">Go Back</button>
      </div>
    </div>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Ensure it's on top of other content */
  font-family: 'Open Sans', sans-serif;

}
h3{
  font-family: "Montserrat Bold", sans-serif;

}
p{
  color: #4A4B4C;
}

.confirmation-box {
  background-color: white;
  padding: 20px 80px;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 10px;
}
.delete-buttons {
  display: flex;
  flex-direction: column;
}
.red-delete-button {
  margin-bottom: 10px;
  background-color: #eb5440;
  border: none;
  border-radius: 5px;
  padding: 7px 0;
  color: #ffffff;
  cursor: pointer;
}
.grey-back-button {
  background-color: #4a4b4c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 7px 0;
  cursor: pointer;
}
</style>
