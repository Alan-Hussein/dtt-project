<template>
  <div class="house-details">
    <div v-if="house" class="house-details-container">
      <back-to-overview v-if="!isMobile"></back-to-overview>
      <div class="house-buttons-img-mobile">
        <div class="back-mobile">
          <back-to-overview
            v-if="isMobile"
            :isMobile="isMobile"
          ></back-to-overview>
        </div>
        <div v-if="house.madeByMe">
          <div>
            <div v-if="isMobile" class="edit-delete-mobile">
              <div class="edit-button-white">
                <router-link
                  :to="{ name: 'edit-house', params: { id: house.id } }"
                >
                  <img
                    src="../../assets/ic_edit_white@3x.png"
                    alt="edit-icon-white"
                    class="icon"
                  />
                </router-link>
              </div>
              <DeleteHouse
                :houseId="house.id.toString()"
                :isMobile="isMobile"
              />
            </div>
          </div>
        </div>
        <img class="house-details-img" :src="house.image" :alt="house.name" />
      </div>
      <div class="house-informations-details">
        <div class="house-information-and-delete">
          <div>
            <h3>
              {{ house.location.street }} {{ house.location.houseNumber }}
            </h3>
          </div>
          <div class="edit-delete" v-if="house.madeByMe">
            <div class="edit-button">
              <router-link
                :to="{ name: 'edit-house', params: { id: house.id } }"
              >
                <img
                  v-if="!isMobile"
                  src="../../assets/ic_edit@3x.png"
                  alt="edit-icon"
                  class="icon"
                />
              </router-link>
            </div>
            <div v-if="!isMobile">
              <DeleteHouse
                :houseId="house.id.toString()"
                :isMobile="isMobile"
              />
            </div>
          </div>
        </div>
        <div class="location">
          <img
            src="../../assets/ic_location@3x.png"
            alt="locatio-icon"
            class="icon"
          />
          <p>{{ house.location.zip }} {{ house.location.city }}</p>
        </div>
        <div class="price-size-date">
          <div class="flex">
            <img
              src="../../assets/ic_price@3x.png"
              alt="price-icon"
              class="icon"
            />
            <p>{{ house.price }}</p>
          </div>
          <div class="flex">
            <img
              src="../../assets/ic_size@3x.png"
              alt="size-icon"
              class="icon"
            />
            <p>{{ house.size }} m2</p>
          </div>
          <div class="flex">
            <img
              src="../../assets/ic_construction_date@3x.png"
              alt="construction-date-icon"
              class="icon"
            />
            <p>{{ house.constructionYear }}</p>
          </div>
        </div>
        <div class="rooms">
          <div class="flex">
            <img src="../../assets/ic_bed@3x.png" alt="bed-icon" class="icon" />
            <p>{{ house.rooms.bedrooms }}</p>
          </div>
          <div class="flex">
            <img
              src="../../assets/ic_bath@3x.png"
              alt="bath-icon"
              class="icon"
            />
            <p>{{ house.rooms.bathrooms }}</p>
          </div>
          <div class="flex">
            <img
              src="../../assets/ic_garage@3x.png"
              alt="garage-icon"
              class="icon"
            />
            <p>{{ house.hasGarage ? "Yes" : "No" }}</p>
          </div>
        </div>
        <div class="description">
          <p>{{ house.description }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import DeleteHouse from "../../components/DeleteHouse.vue";
import BackToOverview from "../../components/BackToOverview.vue";

const route = useRoute();
const house = ref(null);
const isMobile = ref(window.innerWidth <= 600); // Adjust the breakpoint as needed
window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth <= 600;
});

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "OWeh_-zUi6aD29TxkRgYGIvldJby8LtS");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.intern.d-tt.nl/api/houses/${route.params.id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      house.value = data[0];
    })
    .catch((error) => console.log("error", error));
});
</script>

<style scoped>
/* Add your styles here */
@import "./houseDetailsStyle.css";
</style>
