<template>
  <NuxtLink
    class="card"
    :to="link"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="card__media">
      <NuxtImg
        :src="card.images[0]?.path"
        width="380"
        height="380"
        format="webp"
        loading="lazy"
        class="card__image"
        :alt="card.images[0]?.alt || card.name"
      />

      <div
        v-if="card.discount"
        class="card__discount"
      >
        - {{ card.discount }}%
      </div>

      <div
        class="card__overlay"
        :class="{ 'card__overlay--visible': isHovered || isFavourites(card.id) }"
      >
        <button
          type="button"
          class="card__action"
          aria-label="В корзину"
          @click.stop.prevent
        >
          <Icon
            name="icon:cart"
            size="20"
          />
        </button>
        <span
          class="card__action"
          aria-hidden="true"
        >
          <Icon
            name="icon:eye"
            size="20"
          />
        </span>
        <button
          type="button"
          class="card__action"
          :aria-label="isFavourites(card.id) ? 'Убрать из избранного' : 'В избранное'"
          @click.stop.prevent="toggleFavourites(card.id)"
        >
          <Icon
            :name="isFavourites(card.id) ? 'icon:favorite-add' : 'icon:favorite'"
            size="20"
          />
        </button>
      </div>
    </div>

    <p class="card__title">
      {{ card.name }}
    </p>
    <p class="card__price">
      $ {{ formatPrice(card.price) }}
    </p>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
  card: IProduct
  to?: string
}>()

const link = computed(() => props.to ?? `/catalog/${props.card.id}`)

const favouritesStore = useFavouritesStore()
const { toggleFavourites, isFavourites } = favouritesStore

const isHovered = ref(false)

function formatPrice(price: number) {
  return price.toFixed(2).replace('.', ',')
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: block;
  width: 100%;

  &__media {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    background-color: rgba(lightgray, 0.35);
  }

  &__discount {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
    border-radius: 4px;
    background-color: var(--color-accent);
    color: #ffffff;
    padding: 8px 14px;
    font-size: 14px;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color: rgba(255, 255, 255, 0.42);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;

    &--visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: none;
    color: var(--color-black);
    line-height: 0;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: var(--color-accent);
      transform: translateY(-1px);
    }
  }

  &__title {
    margin-top: 16px;
    color: var(--color-black);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.3;
  }

  &__price {
    margin-top: 8px;
    color: var(--color-accent);
    font-size: 16px;
    line-height: 1.4;
  }
}
</style>
