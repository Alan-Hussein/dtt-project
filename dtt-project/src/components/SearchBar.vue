<template>
    <div class="search-container">
      <img src="../assets/ic_search@3x.png" alt="search-icon" class="search-icon" />
      <input
        v-model="searchCity"
        @keyup.enter="filterHouses"
        @input="$emit('filter', searchCity)" 
        placeholder="Search for a house"
        class="search-bar"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: String, // This is the v-model binding for the search input
    },
    methods: {
      filterHouses() {
        // Emit a custom event to notify the parent component to filter houses
        this.$emit("filter", this.searchCity);
      },
    },
    data() {
      return {
        searchCity: this.value, // Initialize with the provided search value
      };
    },
  };
  </script>
  