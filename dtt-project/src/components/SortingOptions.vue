<template>
  <div class="sorting-options">
    <input
      type="radio"
      id="sortByPrice"
      v-model="sortBy"
      value="price"
      class="radio"
      @click="toggleSorting('price')"
    />
    <label for="sortByPrice" class="radio-label">Price</label>

    <input
      type="radio"
      id="sortBySize"
      v-model="sortBy"
      value="size"
      class="radio"
      @click="toggleSorting('size')"
    />
    <label for="sortBySize" class="radio-label">Size</label>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits();

const sortBy = ref(props.modelValue);

const toggleSorting = (option) => {
  sortBy.value = sortBy.value === option ? null : option;
  emit("update:modelValue", sortBy.value);
};
</script>

<style scoped>
.sorting-options {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.radio {
  display: none;
}
.radio-label {
  display: inline-block;
  cursor: pointer;
  padding: 5px 40px;
  transition: background-color 0.3s;
  background-color: #e8e8e8; /* Default background color for unselected options */
  color: white;
}

.radio:checked + .radio-label {
  background-color: #eb5440; /* Background color for selected option */
}

#sortByPrice + .radio-label {
  border-radius: 5px 0 0 5px;
}
#sortBySize + .radio-label {
  border-radius: 0 5px 5px 0;
}
@media only screen and (max-width: 600px) {
  .radio-label {
    padding: 7px 20%;
  }
}
</style>
