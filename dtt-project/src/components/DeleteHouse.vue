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
      const myHeaders = new Headers();
      myHeaders.append("X-Api-Key", "OWeh_-zUi6aD29TxkRgYGIvldJby8LtS");

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://api.intern.d-tt.nl/api/houses/${this.houseId}`,
          requestOptions
        );
        if (response.ok) {
          console.log("House deleted successfully");
          this.showConfirmationDialog = false;
          this.$emit("house-deleted");

          // Redirect to the home page
          this.$router.push({ name: "home" });
        } else {
          console.error("House deletion request failed:", response.statusText);
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
