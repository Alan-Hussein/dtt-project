<template>
  <div class="home">
    <div class="house-create-button">
      <h1>Houses</h1>
      <router-link to="/create-house">
        <div>
          <img
            src="../../assets/ic_plus_grey@3x.png"
            alt="plus-grey"
            class="plus-grey"
          />
          <button class="create-button">
            <img src="../../assets/ic_plus_white@3x.png" alt="plus" /> CREATE
            NEW
          </button>
        </div>
      </router-link>
    </div>
    <div class="search-sort">
      <SearchBar v-model="searchCity" @filter="handleFilter" />
      <SortingOptions v-model="sortBy" />
    </div>
    <!-- Display sorted and filtered houses together -->
    <div v-if="sortedAndFilteredHouses.length > 0">
      <div v-if="searchCity !== ''" class="search-results-count">
        <p>{{ filteredHouses.length }} results found</p>
      </div>
      <HouseCard
        v-for="house in sortedAndFilteredHouses"
        :key="house.id"
        :house="house"
      />
    </div>
    <!-- Display a message if no results are found -->
    <div v-else class="no-results">
      <p>No results found.</p>
      <p>please try another keyword.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import HouseCard from "../../components/HousesCard.vue";
import SortingOptions from "../../components/SortingOptions.vue";
import { useSorting } from "../../utils/useSorting";
import { useSearch } from "../../utils/useSearch";
import SearchBar from "../../components/SearchBar.vue";
const houses = ref([]);

onMounted(() => {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "OWeh_-zUi6aD29TxkRgYGIvldJby8LtS");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      houses.value = data;
    })
    .catch((error) => console.log("error", error));
});

const { sortBy, sortedHouses } = useSorting(houses, null); //set the 
const { searchCity, filteredHouses, setSearchCity } = useSearch(houses);
const handleFilter = (city) => {
  // Update the searchCity value when the "filter" event is emitted
  setSearchCity(city);
};

// Combine sorted and filtered houses into a single array
const sortedAndFilteredHouses = computed(() => {
  if (searchCity.value === "") {
    return sortedHouses.value;
  } else {
    const filteredSet = new Set(filteredHouses.value);
    return sortedHouses.value.filter((house) => filteredSet.has(house));
  }
});
</script>

<style>
/* Add your styles here */
@import "./homeStyle.css";
</style>
