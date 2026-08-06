<template>
  <NuxtLink
    class="card"
    to="/catalog"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="card__actions">
      <div
        :class="['card__actions-discount', card.discount === 0 ? 'card__actions-discount--hidden' : '']"
      >
        - {{ card.discount }}%
      </div>

      <AddFavourite v-show="isHovered || isFavourites(card.id)" :id="card.id" :is-show="true" @click="() => toggleFavourites(card.id)" />
    </div>
    <!-- <div class="card__images">
    </div> -->
    <NuxtImg
      :src="card.images[0]?.path"
      width="300"
      height="300"
      format="webp"
      loading="lazy"
    />
    <!-- <img :src="image" />
    <img :src="Image" /> -->
    <p class="card__title">
      {{ card.name }}
    </p>
    <p class="card__price">
      $ {{ card.price }}, 00
    </p>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { useFavouritesStore } from '@/stores/favourites';
//import Image from "assets/images/jewelry/moonlight1.jpg";

const { card } = defineProps<{
  card: IProduct
}>();

const favouritesStore = useFavouritesStore();
const { toggleFavourites, isFavourites } = favouritesStore;

const isHovered = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.card {
  position: relative;

  &__images {
    border-radius: 8px;
    width: 300px;
    height: 300px;
    background-color: rgba(lightgray, 0.5);
  }

  &__title {
    font-size: 20px;
    line-height: 20px;
  }

  &__price {
    color: #A18A68;
    font-size: 20px;
    line-height: 26px;
  }

  &__actions {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // width: 100%;
    top: 10px;
    left: 10px;
    right: 10px;

    &-discount {
      border-radius: 4px;
      background-color: #A18A68;
      color: #ffffff;
      padding: 10px 20px;

      &--hidden {
        opacity: 0;
        pointer-events: none;
      }
    }

    &-favorite {
      margin-left: auto;
    }
  }
}
</style>