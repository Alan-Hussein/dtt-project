<template>
  <div class="house-card">
    <router-link :to="{ name: 'house-details', params: { id: house.id } }">
      <div class="house-image">
        <img :src="house.image" :alt="house.name" class="house-img" />
      </div>
    </router-link>
    <div class="house-inormations">
      <div>
        <h3>{{ house.location.street }} {{ house.location.houseNumber }}</h3>
        <p class="price">€ {{ house.price }}</p>
        <p class="location">
          {{ house.location.zip }} {{ house.location.city }}
        </p>
      </div>
      <div>
        <ul class="house-icons-informations">
          <li class="icon-item">
            <img src="../assets/ic_bed@3x.png" alt="bed" class="icon" />
            {{ house.rooms.bedrooms }}
          </li>
          <li class="icon-item">
            <img src="../assets/ic_bath@3x.png" alt="bath" class="icon" />
            {{ house.rooms.bathrooms }}
          </li>
          <li class="icon-item">
            <img src="../assets/ic_size@3x.png" alt="size" class="icon" />
            {{ house.size }} m2
          </li>
        </ul>
      </div>
    </div>

    <div class="edit-delete" v-if="house.madeByMe">
      <div class="edit-button">
        <router-link :to="{ name: 'edit-house', params: { id: house.id } }">
          <img
            src="../assets/ic_edit@3x.png"
            alt="edit-icon"
            class="edit-icon"
          />
        </router-link>
      </div>
      <div>
        <!--Reload page after delete a house -->
        <DeleteHouse
          :houseId="house.id.toString()"
          @house-deleted="refreshPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import DeleteHouse from "./DeleteHouse.vue";

function refreshPage() {
  // reload the current page to refresh the content
  location.reload();
}
const props = defineProps({
  house: Object,
});
</script>
<style scoped>
li {
  list-style: none;
}
.house-inormations {
  line-height: 8px;
}
.house-card {
  background-color: #ffffff;
  margin: 20px 20%;
  display: flex;
  border-radius: 10px;
  text-decoration: none;
  position: relative;
  font-family: "Montserrat Bold", sans-serif;
}
.house-img {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin: 15px;
}

.house-icons-informations {
  list-style: none;
  display: flex;
  padding: 0;
  color: #4a4b4c;
}

.icon-item {
  display: flex;
  align-items: center;
  margin: 0 10px 0 0;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.edit-icon {
  width: 20px;
  height: auto;
  padding-right: 10px;
}
.edit-delete {
  position: absolute;
  display: flex;
  align-items: center;
  right: 20px;
  top: 10px;
}
.price {
  color: #4a4b4c;
  font-weight: medium;
}
.location {
  color: #4a4b4c;
}
@media only screen and (max-width: 600px) {
  .house-card {
    margin: 5% 2%;
  }
  img {
    width: 90px;
    height: 90px;
    margin: 15px 10px;
  }
  .icon {
    width: 16px;
    height: 16px;
  }
}
</style>
