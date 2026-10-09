<template>
  <h1>Избранное</h1>

  <p v-if="!favourites.length">
    Список избранного пуст
  </p>

  <div
    v-else-if="error"
    class="favorites-error"
  >
    Ошибка загрузки: {{ error.message }}
  </div>

  <div
    v-else
    class="cards-list"
  >
    <Card
      v-for="card in cards"
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script lang="ts" setup>
const favouritesStore = useFavouritesStore()
const { favourites } = storeToRefs(favouritesStore)

const { data: cards, error, refresh } = await useAsyncData(
  'favourites-products',
  async () => {
    if (!favourites.value.length) {
      return []
    }

    const products = await Promise.all(
      favourites.value.map(id => $fetch<IProduct>(`/api/products/${id}`))
    )

    return products
  },
)

watch(() => favourites.value.length, (newLength, oldLength) => {
  if(newLength !== oldLength) {
    refresh();
  }
})
</script>

<style lang="scss" scoped>
.favorites-error {
  color: #b00020;
  margin-bottom: 16px;
}

.cards-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 20px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
  }
}
</style>
