<template>
  <div class="edit-house">
    <div class="edit-header-mobile">
      <back-to-details></back-to-details>
      <h1>Edit Listing</h1>
    </div>

    <form @submit.prevent="editHouse">
      <label for="streetName">Street Name:</label>
      <input
        v-model="formData.streetName"
        type="text"
        required
        placeholder="Enter the street name"
      />
      <div class="flex">
        <div class="flex-column">
          <label for="houseNumber">House Number:</label>
          <input
            v-model="formData.houseNumber"
            type="text"
            required
            placeholder="Enter house number"
          />
        </div>
        <div class="flex-column">
          <label for="numberAddition">Number Addition:</label>
          <input
            v-model="formData.numberAddition"
            type="text"
            placeholder="e.g, A"
          />
        </div>
      </div>

      <label for="zip">Postal Code:</label>
      <input
        v-model="formData.zip"
        type="text"
        required
        placeholder="e.g. 1000 AA"
      />

      <label for="city">City:</label>
      <input
        v-model="formData.city"
        type="text"
        required
        placeholder="e.g Utrecht"
      />
      <div class="upload-container">
        <label for="image">Upload picture (PNG or JPG)</label>
        <input
          type="file"
          id="image"
          ref="imageInput"
          @change="handleImageChange"
          accept="image/*"
        />
        <label v-if="!formData.image" for="image" class="upload-button">
          <img
            src="../../assets/ic_upload@3x.png"
            alt="Upload Image"
            class="uploaded-image"
          />
        </label>
        <img
          v-else
          :src="formData.image"
          alt="Uploaded Image"
          class="uploaded-image"
        />
      </div>
      <label for="price">Price:</label>
      <input
        v-model="formData.price"
        type="number"
        required
        placeholder="e.g €150.000"
      />

      <div class="flex">
        <div class="flex-column">
          <label for="size">Size:</label>
          <input
            v-model="formData.size"
            type="number"
            required
            placeholder="e.g 60m2"
          />
        </div>
        <div class="flex-column">
          <label for="hasGarage">Has Garage:</label>
          <select v-model="formData.hasGarage" required>
            <option value="" disabled>Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div class="flex">
        <div class="flex-column">
          <label for="bedrooms">Bedrooms:</label>
          <input
            v-model="formData.bedrooms"
            type="number"
            required
            placeholder="Enter amount"
          />
        </div>
        <div class="flex-column">
          <label for="bathrooms">Bathrooms:</label>
          <input
            v-model="formData.bathrooms"
            type="number"
            required
            placeholder="Enter amount"
          />
        </div>
      </div>

      <label for="constructionYear">Construction Year:</label>
      <input
        v-model="formData.constructionYear"
        type="number"
        required
        placeholder="e.g 1990"
      />

      <label for="description">Description:</label>
      <textarea
        class="textarea"
        v-model="formData.description"
        required
        placeholder="Enter description"
      ></textarea>

      <button type="submit">{{ editMode ? "Save" : "Create Listing" }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackToDetails from "../../components/BackToDetails.vue";
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
