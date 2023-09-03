import { ref, computed } from 'vue';

export function useSorting(houses, defaultSortBy = null) {
  const sortBy = ref(defaultSortBy);

  const sortedHouses = computed(() => {
    return houses.value.slice().sort((a, b) => {
      if (sortBy.value === 'price') {
        return a.price - b.price;
      } else if (sortBy.value === 'size') {
        return b.size - a.size;
      }
    });
  });

  function toggleSorting(option) {
    sortBy.value = sortBy.value === option ? null : option;
  }

  return {
    sortBy,
    sortedHouses,
    toggleSorting,
  };
}
