<template>
  <ClientOnly>
    <Swiper
      class="hero-slider"
      :modules="modules"
      :slides-per-view="1"
      :loop="slides.length > 1"
      effect="fade"
      :fade-effect="{ crossFade: true }"
      :speed="900"
      :autoplay="{
        delay: 5500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
    >
      <SwiperSlide
        v-for="slide in slides"
        :key="slide.id"
      >
        <article
          class="hero-slide"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="hero-slide__content">
            <h2 class="hero-slide__title">
              {{ slide.title }}
            </h2>
            <p class="hero-slide__price">
              {{ slide.price }}
            </p>
            <NuxtLink
              class="hero-slide__cta"
              :to="slide.link"
            >
              Смотреть
            </NuxtLink>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>

    <template #fallback>
      <div
        class="hero-skeleton"
        aria-hidden="true"
      >
        <div class="hero-skeleton__content">
          <span class="hero-skeleton__line hero-skeleton__line--title" />
          <span class="hero-skeleton__line hero-skeleton__line--price" />
          <span class="hero-skeleton__line hero-skeleton__line--cta" />
        </div>
        <div class="hero-skeleton__dots">
          <span
            v-for="n in 5"
            :key="n"
            class="hero-skeleton__dot"
          />
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

interface HeroSlide {
  id: number
  title: string
  price: string
  image: string
  link: string
}

defineProps<{
  slides: HeroSlide[]
}>()

const modules = [Pagination, Autoplay, EffectFade]
</script>

<style lang="scss" scoped>
.hero-slider {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;

  :deep(.swiper-slide) {
    transition-timing-function: cubic-bezier(0.33, 1, 0.32, 1) !important;
  }

  :deep(.swiper-pagination) {
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  :deep(.swiper-pagination-bullet) {
    width: 6px;
    height: 6px;
    margin: 0 !important;
    background: var(--color-white-light);
    opacity: 1;
    border-radius: 50%;
    transition:
      width 0.25s ease,
      height 0.25s ease,
      background-color 0.25s ease,
      border-color 0.25s ease;
  }

  :deep(.swiper-pagination-bullet-active) {
    width: 10px;
    height: 10px;
    background: transparent;
    border: 1px solid var(--color-white-light);
  }
}

.hero-slide,
.hero-skeleton {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 320px;
  padding: 40px 28px 64px;
  border-radius: 16px;

  @media (min-width: 768px) {
    min-height: 480px;
    padding: 56px 64px 72px;
  }

  @media (min-width: 1024px) {
    min-height: 560px;
    padding: 64px 80px 80px;
  }
}

.hero-slide {
  background-color: #cfc9c2;
  background-position: right center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 768px) {
    background-position: center right;
  }

  &__content {
    position: relative;
    z-index: 1;
    max-width: 320px;
    color: var(--color-white-light);
  }

  &__title {
    font-family: "Jost", sans-serif;
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.01em;

    @media (min-width: 768px) {
      font-size: 36px;
    }
  }

  &__price {
    margin-top: 12px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.3;

    @media (min-width: 768px) {
      font-size: 22px;
      margin-top: 16px;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 28px;
    min-width: 140px;
    padding: 12px 28px;
    border: 1px solid var(--color-white-light);
    border-radius: 4px;
    color: var(--color-white-light);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
    transition:
      background-color 0.25s ease,
      color 0.25s ease;

    @media (min-width: 768px) {
      margin-top: 36px;
      min-width: 160px;
      padding: 14px 36px;
      font-size: 15px;
    }

    &:hover {
      background-color: var(--color-white-light);
      color: var(--color-black);
    }
  }
}

.hero-skeleton {
  overflow: hidden;
  background:
    linear-gradient(
      110deg,
      #ddd8d2 0%,
      #ddd8d2 35%,
      #ebe7e1 50%,
      #ddd8d2 65%,
      #ddd8d2 100%
    );
  background-size: 200% 100%;
  animation: hero-shimmer 1.4s ease-in-out infinite;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 320px;
  }

  &__line {
    display: block;
    border-radius: 4px;
    background-color: rgb(255 255 255 / 45%);

    &--title {
      width: min(220px, 70vw);
      height: 28px;

      @media (min-width: 768px) {
        width: 260px;
        height: 36px;
      }
    }

    &--price {
      width: 96px;
      height: 18px;
      margin-top: 16px;

      @media (min-width: 768px) {
        width: 110px;
        height: 22px;
      }
    }

    &--cta {
      width: 140px;
      height: 44px;
      margin-top: 28px;

      @media (min-width: 768px) {
        width: 160px;
        height: 48px;
        margin-top: 36px;
      }
    }
  }

  &__dots {
    position: absolute;
    left: 50%;
    bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    transform: translateX(-50%);
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgb(255 255 255 / 55%);

    &:first-child {
      width: 10px;
      height: 10px;
      background: transparent;
      border: 1px solid rgb(255 255 255 / 70%);
    }
  }
}

@keyframes hero-shimmer {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}
</style>
