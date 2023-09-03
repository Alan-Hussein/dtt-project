<template>
  <div class="edit-house">
    <div class="edit-header-mobile">
      <back-to-details></back-to-details>
      <h1>Edit Listing</h1>
    </div>

    <HouseForm
      :formData="formData"
      :handleImageChange="handleImageChange"
      :handleSubmit="editHouse"
      :mode="'edit'"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackToDetails from "../../components/BackToDetails.vue";
import HouseForm from "../../components/HouseForm.vue";
function handleImageChange(event) {
  const newImageFile = event.target.files[0];
  formData.value.image = newImageFile; // Update image property with the new image file
}
const route = useRoute();
const router = useRouter();

const formData = ref({
  streetName: "",
  houseNumber: "",
  numberAddition: "",
  zip: "",
  city: "",
  price: "",
  size: "",
  bedrooms: "",
  bathrooms: "",
  constructionYear: "",
  hasGarage: "",
  description: "",
  image: "",
});
const editMode = ref(false);

onMounted(() => {
  fetchHouseData();
});

async function fetchHouseData() {
  try {
    const response = await fetch(
      `https://api.intern.d-tt.nl/api/houses/${route.params.id}`,
      {
        headers: {
          "X-Api-Key": "OWeh_-zUi6aD29TxkRgYGIvldJby8LtS",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data[0].image);
    formData.value = {
      streetName: data[0].location.street,
      houseNumber: data[0].location.houseNumber,
      numberAddition: data[0].location.houseNumberAddition,
      zip: data[0].location.zip,
      city: data[0].location.city,
      price: data[0].price,
      size: data[0].size,
      bedrooms: data[0].rooms.bedrooms,
      bathrooms: data[0].rooms.bathrooms,
      constructionYear: data[0].constructionYear,
      hasGarage:
        data[0].hasGarage !== undefined ? data[0].hasGarage.toString() : "", // Convert boolean to string if exists, otherwise use an empty string
      description: data[0].description,
      image: data[0].image,
    };
    editMode.value = true; // Set edit mode to true
  } catch (error) {
    console.error("Error fetching house data:", error);
  }
}

async function editHouse() {
  const houseFormData = new FormData();
  // Add the updated form data to the FormData object
  for (const key in formData.value) {
    houseFormData.append(key, formData.value[key]);
  }
  // Set the API Key header
  const houseHeaders = new Headers();
  houseHeaders.append("X-Api-Key", "OWeh_-zUi6aD29TxkRgYGIvldJby8LtS");
  const houseRequestOptions = {
    method: "POST",
    headers: houseHeaders,
    body: houseFormData,
    redirect: "follow",
  };

  try {
    const houseResponse = await fetch(
      `https://api.intern.d-tt.nl/api/houses/${route.params.id}`,
      houseRequestOptions
    );

    if (houseResponse.ok) {
      // Upload new image
      const imageFormData = new FormData();
      imageFormData.append("image", formData.value.image);

      const imageHeaders = new Headers();
      imageHeaders.append("X-Api-Key", "OWeh_-zUi6aD29TxkRgYGIvldJby8LtS");

      const imageRequestOptions = {
        method: "POST",
        headers: imageHeaders,
        body: imageFormData,
        redirect: "follow",
      };

      const imageResponse = await fetch(
        `https://api.intern.d-tt.nl/api/houses/${route.params.id}/upload`,
        imageRequestOptions
      );

      if (imageResponse.ok) {
        // Image upload successful
        router.push({
          name: "house-details",
          params: { id: route.params.id },
        });
      } else {
        console.error("Image upload failed:", imageResponse.statusText);
      }
    } else {
      console.error("House update request failed:", houseResponse.statusText);
    }
  } catch (error) {
    console.error("Error updating house:", error);
  }
}
</script>

<style scoped>
@import "./editHouseStyle.css";

/*
---------
*/
</style>
