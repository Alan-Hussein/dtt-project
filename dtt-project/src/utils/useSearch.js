import { ref, computed } from 'vue';

export function useSearch(houses) {
  const searchCity = ref('');

  const filteredHouses = computed(() => {
    if (searchCity.value === '') {
      return houses.value;
    } else {
      return houses.value.filter((house) =>
        house.location.city.toLowerCase().includes(searchCity.value.toLowerCase())
      );
    }
  });

  const setSearchCity = (city) => {
    searchCity.value = city;
  };

  return {
    searchCity,
    filteredHouses,
    setSearchCity,
  };
}
