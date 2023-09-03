<template>
  <form class="house-form" @submit.prevent="handleFormSubmit">
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
        <img src="../assets/ic_upload@3x.png" alt="Upload Image" />
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
        <label for="hasGarage">Has Garage*</label>
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
    <!--mode is for show POST button in Create houes page and show SAVE in Edit page. -->
    <button type="submit">{{ mode === "create" ? "POST" : "SAVE" }}</button>
  </form>
</template>

<script setup>
import { defineProps, reactive } from "vue";

// Define the `props` variable to receive props passed to the component
const props = defineProps({
  formData: Object,
  handleImageChange: Function,
  handleSubmit: Function,
  mode: String,
  imageInput: Object, // Define imageInput as a prop
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
function handleImageChange(event) {
  const file = event.target.files[0]; // Get the first selected file
  if (file) {
    // Create a FileReader to read the selected file as a data URL
    const reader = new FileReader();

    reader.onload = () => {
      // Update formData.image with the data URL of the selected file
      props.formData.image = reader.result;
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(file);
  }
}
function validateForm() {
  for (const field in formErrors) {
    formErrors[field] = false;
  }

  const requiredFields = [
    "streetName",
    "houseNumber",
    "zip",
    "city",
    "price",
    "size",
    "hasGarage",
    "bedrooms",
    "bathrooms",
    "constructionYear",
    "description",
  ];

  let isValid = true;

  requiredFields.forEach((fieldName) => {
    if (!props.formData[fieldName]) {
      formErrors[fieldName] = true;
      isValid = false;
    }
  });

  return isValid;
}

function handleFormSubmit(event) {
  console.log("Form submission attempted");
  if (!validateForm()) {
    event.preventDefault(); // Prevent form submission if validation fails
  } else {
    // Proceed with form submission
    props.handleSubmit();
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  color: #4a4b4c;
}

input {
  padding: 8px;
  margin-bottom: 10px;
  width: 275px;
  border: none;
  border-radius: 5px;
}

button {
  background-color: #eb5440;
  color: white;
  padding: 8px 10px;
  margin: 10px 155px;
  width: 140px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.flex {
  display: flex;
  padding-right: 20px;
  gap: 10px;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-column input {
  width: 125px;
}
.flex-column select {
  width: 140px;
  padding: 8px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
}

.textarea {
  height: 80px;
  width: 290px;
  border: none;
  border-radius: 5px;
}
.upload-container {
  position: relative;
  display: flex;
  flex-direction: column;
}

.upload-button {
  width: 25px;
  padding: 10px 20px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 3px #e8e8e8 dashed;
}

.upload-button img {
  vertical-align: middle;
  width: 20px;
}
.uploaded-image {
  width: 125px;
}
/* Hide the input visually */
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
input::placeholder {
  color: #e3e3e3;
  font-size: 11px;
}
/*---*/
.input-field.invalid {
  border: 1px solid #eb5440;
}
.input-field.invalid::placeholder {
  color: #eb5440;
}

.error-text {
  color: #eb5440;
  font-size: 12px;
  margin-top: 5px;
  font-style: italic;
}

</style>
