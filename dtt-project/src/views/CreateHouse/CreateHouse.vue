<template>
  <div class="create-house">
    <div class="create-house-header">
      <back-to-overview></back-to-overview>
      <h2>Create New Listing</h2>
    </div>

    <form @submit.prevent="submitForm">
      <label for="streetName">Street Name*</label>
    <input
      id="streetName"
      v-model="formData.streetName"
      type="text"
      placeholder="Enter the street name"
      :class="{ 'input-field': true, invalid: formErrors.streetName }"
    />
    <div v-if="formErrors.streetName" class="error-text">
      Required field missing
    </div>

    <div class="flex">
      <div class="flex-column">
        <label for="houseNumber">House Number*</label>
        <input
          id="houseNumber"
          v-model="formData.houseNumber"
          type="text"
          placeholder="Enter house number"
          :class="{ 'input-field': true, invalid: formErrors.houseNumber }"
        />
        <div v-if="formErrors.houseNumber" class="error-text">
          Required field missing
        </div>
      </div>
      <div class="flex-column">
        <label for="numberAddition">Addition (optional)</label>
        <input
          id="numberAddition"
          v-model="formData.numberAddition"
          type="text"
          placeholder="e.g, A"
        />
      </div>
    </div>

    <label for="zip">Postal Code*</label>
    <input
      id="zip"
      v-model="formData.zip"
      type="text"
      placeholder="e.g. 1000 AA"
      :class="{ 'input-field': true, invalid: formErrors.zip }"
    />
    <div v-if="formErrors.zip" class="error-text">Required field missing</div>
    <label for="city">City*</label>
    <input
      id="city"
      v-model="formData.city"
      type="text"
      placeholder="e.g Utrecht"
      :class="{ 'input-field': true, invalid: formErrors.city }"
    />
    <div v-if="formErrors.city" class="error-text">Required field missing</div>
    <div class="upload-container">
      <label for="image">Upload picture (PNG or JPG)*</label>
      <input
        type="file"
        id="image"
        ref="imageInput"
        @change="handleImageChange"
        accept="image/*"
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
    <label for="price">Price*</label>
    <input
      id="price"
      v-model="formData.price"
      type="number"
      placeholder="e.g €150.000"
      min="0"
      :class="{ 'input-field': true, invalid: formErrors.price }"
    />
    <div v-if="formErrors.price" class="error-text">Required field missing</div>
    <div class="flex">
      <div class="flex-column">
        <label for="size">Size*</label>
        <input
          id="size"
          v-model="formData.size"
          type="number"
          min="0"
          placeholder="e.g 60m2"
          :class="{ 'input-field': true, invalid: formErrors.size }"
        />
        <div v-if="formErrors.size" class="error-text">
          Required field missing
        </div>
      </div>
      <div class="flex-column">
        <label for="hasGarage">Garage*</label>
        <select
          id="hasGarage"
          v-model="formData.hasGarage"
          :class="{ 'input-field': true, invalid: formErrors.hasGarage }"
        >
          <option value="" disabled>Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <div v-if="formErrors.hasGarage" class="error-text">
          Required field missing
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="flex-column">
        <label for="bedrooms">Bedrooms*</label>
        <input
          id="bedrooms"
          v-model="formData.bedrooms"
          type="number"
          min="0"
          placeholder="Enter amount"
          :class="{ 'input-field': true, invalid: formErrors.bedrooms }"
        />
        <div v-if="formErrors.bedrooms" class="error-text">
          Required field missing
        </div>
      </div>
      <div class="flex-column">
        <label for="bathrooms">Bathrooms*</label>
        <input
          id="bathrooms"
          v-model="formData.bathrooms"
          type="number"
          min="0"
          placeholder="Enter amount"
          :class="{ 'input-field': true, invalid: formErrors.bathrooms }"
        />
        <div v-if="formErrors.bathrooms" class="error-text">
          Required field missing
        </div>
      </div>
    </div>

    <label for="constructionYear">Construction Year*</label>
    <input
      id="constructionYear"
      v-model="formData.constructionYear"
      type="number"
      min="1901"
      placeholder="e.g 1990"
      :class="{ 'input-field': true, invalid: formErrors.constructionYear }"
    />
    <div v-if="formErrors.constructionYear" class="error-text">
      Required field missing
    </div>
    <label for="description">Description*</label>
    <textarea
      id="description"
      class="textarea"
      v-model="formData.description"
      placeholder="Enter description"
      :class="{ 'input-field': true, invalid: formErrors.description }"
    ></textarea>
    <div v-if="formErrors.description" class="error-text">
      Required field missing
    </div>
    <button type="submit">POST</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BackToOverview from "../../components/BackToOverview.vue";
import { defineProps, reactive } from "vue";

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

const formErrors = reactive({
  streetName: false,
  houseNumber: false,
  numberAddition: false,
  zip: false,
  city: false,
  price: false,
  size: false,
  hasGarage: false,
  bedrooms: false,
  bathrooms: false,
  constructionYear: false,
  description: false,
});

const router = useRouter();
const imageInput = ref(null);

function handleImageChange() {
  const file = imageInput.value.files[0];
  formData.value.image = file;
}

function validateField(fieldName) {
  if (!formData.value[fieldName]) {
    formErrors[fieldName] = true;
  } else {
    formErrors[fieldName] = false;
  }
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

function submitForm() {
  // Validate all required fields before submitting the form
  validateField("streetName");
  validateField("houseNumber");
  validateField("zip");
  validateField("city");
  validateField("price");
  validateField("size");
  validateField("hasGarage");
  validateField("bedrooms");
  validateField("bathrooms");
  validateField("constructionYear");
  validateField("description");

  // Check if there are any validation errors
  const hasErrors = Object.values(formErrors).some((error) => error);

  if (!hasErrors) {
    // If there are no errors, proceed to create the house
    createHouse();
  }
}

</script>
<style scoped>
@import "./createHouseStyle.css";
</style>