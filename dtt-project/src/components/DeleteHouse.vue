<template>
  <div>
    <img
      v-if="isMobile"
      class="delete-icon-white"
      @click="showDeleteDialog"
      src="../assets/ic_delete_white@3x.png"
      alt="delete-icon"
    />
    <img
      v-else
      class="delete-icon"
      @click="showDeleteDialog"
      src="../assets/ic_delete@3x.png"
      alt="delete-icon"
    />

    <DeleteConfirmationDialog
      v-if="showConfirmationDialog"
      @deleteConfirmed="deleteHouse"
      @deleteCanceled="cancelDelete"
    />
  </div>
</template>

<script>
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog.vue";
import { deleteHouse } from "@/utils/api"; // Import the deleteHouse function from api.js

export default {
  components: {
    DeleteConfirmationDialog,
  },
  props: {
    houseId: String,
    isMobile: Boolean,
  },
  data() {
    return {
      showConfirmationDialog: false,
    };
  },
  methods: {
    showDeleteDialog() {
      this.showConfirmationDialog = true;
    },
    async deleteHouse() {
      try {
        const success = await deleteHouse(this.houseId);
        if (success) {
          console.log("House deleted successfully");
          this.showConfirmationDialog = false;
          this.$emit("house-deleted");

          // Redirect to the home page or another appropriate route
          this.$router.push({ name: "home" });
        }
      } catch (error) {
        console.error("Error deleting house:", error);
      }
    },
    cancelDelete() {
      this.showConfirmationDialog = false;
    },
  },
};
</script>

<style>
.delete-icon {
  width: 20px;
  cursor: pointer;
}
.delete-icon-white {
  display: none;
}
@media only screen and (max-width: 600px) {
  .delete-icon-white {
    display: block;
    width: 14px;
    cursor: pointer;
    padding-left: 10px;
  }
}
</style>
