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
      <div class="search-container">
        <img
          src="../../assets/ic_search@3x.png"
          alt="search-icon"
          class="search-icon"
        />
        <input
          v-model="searchCity"
          @keyup.enter="filterHouses"
          placeholder="Search for a house"
          class="search-bar"
        />
      </div>
      <div class="sorting-options">
        <input
          type="radio"
          id="r1"
          v-model="sortBy"
          value="price"
          checked
          class="radio"
        />
        <label for="r1" class="radio-label">Price</label>

        <input
          type="radio"
          id="r2"
          v-model="sortBy"
          value="size"
          class="radio"
        />
        <label for="r2" class="radio-label">Size</label>
      </div>
    </div>
    <!-- Display search results count after performing a search -->
    <div v-if="searchCity !== ''" class="search-results-count">
      <p>{{ filteredHouses.length }} results found</p>
    </div>
    <!-- Display no results background image when there are no search results -->
    <div
      v-if="searchCity !== '' && filteredHouses.length === 0"
      class="no-results"
    >
      <p>No results found.</p>
      <p>please try another keyword</p>
    </div>
    <HouseCard v-for="house in sortedHouses" :key="house.id" :house="house" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import HouseCard from "../../components/HousesCard.vue";

const houses = ref([]);
const searchCity = ref("");
const sortBy = ref("price"); // Default sorting criteria.

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "OWeh_-zUi6aD29TxkRgYGIvldJby8LtS");

  var requestOptions = {
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

const filteredHouses = computed(() => {
  if (searchCity.value === "") {
    return houses.value;
  } else {
    return houses.value.filter((house) =>
      house.location.city.toLowerCase().includes(searchCity.value.toLowerCase())
    );
  }
});

const sortedHouses = computed(() => {
  return filteredHouses.value.slice().sort((a, b) => {
    if (sortBy.value === "price") {
      return a.price - b.price;
    } else if (sortBy.value === "size") {
      return a.size - b.size;
    }
  });
});
</script>

<style scoped>
/* Add your styles here */
@import "./homeStyle.css";
</style>
