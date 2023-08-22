<template>
  <div class="create-house">
    <div class="create-house-header">
      <back-to-overview></back-to-overview>
      <h2>Create New Listing</h2>
    </div>

    <form @submit.prevent="createHouse">
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
          required
        />
        <label v-if="!formData.image" for="image" class="upload-button">
          <img src="../../assets/ic_upload@3x.png" alt="Upload Image" />
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
        min="0"
      />

      <div class="flex">
        <div class="flex-column">
          <label for="size">Size:</label>
          <input
            v-model="formData.size"
            type="number"
            required
            min="20"
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
            min="0"
            required
            placeholder="Enter amount"
          />
        </div>
        <div class="flex-column">
          <label for="bathrooms">Bathrooms:</label>
          <input
            v-model="formData.bathrooms"
            type="number"
            min="0"
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
        min="1901"
        placeholder="e.g 1990"
      />

      <label for="description">Description:</label>
      <textarea
        class="textarea"
        v-model="formData.description"
        required
        placeholder="Enter description"
      ></textarea>

      <button type="submit">POST</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BackToOverview from "../../components/BackToOverview.vue";
const formData = ref({
  streetName: "",
  houseNumber: "",
  numberAddition: "",
  zip: "",
  city: "",
  price: null,
  size: null,
  bedrooms: null,
  bathrooms: null,
  constructionYear: null,
  hasGarage: "",
  description: "",
  image: null,
  madeByMe: true,
});

const router = useRouter();
const imageInput = ref(null);

function handleImageChange() {
  const file = imageInput.value.files[0];
  formData.value.image = file;
}

async function createHouse() {
  const houseFormData = new FormData();
  for (const key in formData.value) {
    if (key !== "image") {
      houseFormData.append(key, formData.value[key]);
    }
  }

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
      "https://api.intern.d-tt.nl/api/houses",
      houseRequestOptions
    );
    if (houseResponse.ok) {
      const houseResult = await houseResponse.json();

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
        `https://api.intern.d-tt.nl/api/houses/${houseResult.id}/upload`,
        imageRequestOptions
      );
      if (imageResponse.ok) {
        // Handle successful image upload
      } else {
        console.error("Image upload failed:", imageResponse.statusText);
      }

      router.push({
        name: "house-details",
        params: { id: houseResult.id },
      });
    } else {
      console.error("House creation request failed:", houseResponse.statusText);
    }
  } catch (error) {
    console.error("Error creating house:", error);
  }
}
</script>
<style scoped>
@import "./createHouseStyle.css";
</style>
