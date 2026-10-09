export const useFavouritesStore = defineStore('favourites', () => {
  const favourites = ref<number[]>([]);

  const toggleFavourites = (id: number) => {
    const index = favourites.value.findIndex(item => item === id);

    if(index === -1) {
      favourites.value.push(id);
      return;
    }

    favourites.value.splice(index, 1);
  }

  const isFavourites = (id: number) => {
    return favourites.value.findIndex(item => item === id) !== -1;
  }

  return {
    favourites,
    toggleFavourites,
    isFavourites
  }
}, {
  persist: true
})