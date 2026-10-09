<template>
  <section class="home">
    <HeroSlider :slides="slides" />

    <section class="arrivals">
      <div class="arrivals__head">
        <h2 class="arrivals__title">
          Последние поступления
        </h2>
        <NuxtLink
          class="arrivals__all"
          to="/catalog"
        >
          Все
        </NuxtLink>
      </div>

      <div class="arrivals__grid">
        <Card
          v-for="card in latestArrivals"
          :key="card.id"
          :card="card"
          to="/catalog"
        />
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
const slides = [
  {
    id: 1,
    title: 'Gold big hoops',
    price: '$ 68,00',
    image: '/images/slider/hero-1.jpg',
    link: '/catalog',
  },
  {
    id: 2,
    title: 'Thin gold hoops',
    price: '$ 54,00',
    image: '/images/slider/hero-2.jpg',
    link: '/catalog',
  },
  {
    id: 3,
    title: 'Pearl & gold',
    price: '$ 92,00',
    image: '/images/slider/hero-3.jpg',
    link: '/catalog',
  },
  {
    id: 4,
    title: 'Sculptural cuff',
    price: '$ 76,00',
    image: '/images/slider/hero-4.jpg',
    link: '/catalog',
  },
  {
    id: 5,
    title: 'Bold gold set',
    price: '$ 120,00',
    image: '/images/slider/hero-5.jpg',
    link: '/catalog',
  },
]

const latestArrivals: IProduct[] = [
  {
    id: 101,
    category_id: 4,
    name: 'Lira Earrings',
    price: 20,
    discount: null,
    created_at: '2026-10-01T00:00:00.000Z',
    rating: 4.8,
    images: [{ id: 1, path: '/images/earrings1.jpg', alt: 'Lira Earrings', sort_order: 0 }],
  },
  {
    id: 102,
    category_id: 4,
    name: 'Hal Earrings',
    price: 25,
    discount: null,
    created_at: '2026-10-02T00:00:00.000Z',
    rating: 4.6,
    images: [{ id: 2, path: '/images/earrings2.jpg', alt: 'Hal Earrings', sort_order: 0 }],
  },
  {
    id: 103,
    category_id: 4,
    name: 'Kaede Hair Pin Set Of 3',
    price: 30,
    discount: null,
    created_at: '2026-10-03T00:00:00.000Z',
    rating: 4.7,
    images: [{ id: 3, path: '/images/earrings3.jpg', alt: 'Kaede Hair Pin Set Of 3', sort_order: 0 }],
  },
  {
    id: 104,
    category_id: 4,
    name: 'Hair Pin Set of 3',
    price: 30,
    discount: null,
    created_at: '2026-10-04T00:00:00.000Z',
    rating: 4.5,
    images: [{ id: 4, path: '/images/earrings4.jpg', alt: 'Hair Pin Set of 3', sort_order: 0 }],
  },
  {
    id: 105,
    category_id: 3,
    name: 'Plaine Necklace',
    price: 19,
    discount: null,
    created_at: '2026-10-05T00:00:00.000Z',
    rating: 4.4,
    images: [{ id: 5, path: '/images/chain1.jpg', alt: 'Plaine Necklace', sort_order: 0 }],
  },
  {
    id: 106,
    category_id: 4,
    name: 'Yuki Hair Pin Set of 3',
    price: 29,
    discount: null,
    created_at: '2026-10-06T00:00:00.000Z',
    rating: 4.9,
    images: [{ id: 6, path: '/images/earrings5.jpg', alt: 'Yuki Hair Pin Set of 3', sort_order: 0 }],
  },
]
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 64px;

  @media (min-width: 768px) {
    padding-bottom: 96px;
  }
}

.arrivals {
  margin-top: 48px;

  @media (min-width: 768px) {
    margin-top: 72px;
  }

  &__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 28px;

    @media (min-width: 768px) {
      margin-bottom: 40px;
    }
  }

  &__title {
    margin: 0;
    color: var(--color-black);
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;

    @media (min-width: 768px) {
      font-size: 32px;
    }
  }

  &__all {
    flex-shrink: 0;
    color: var(--color-accent);
    font-size: 16px;
    line-height: 1;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.75;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 28px 20px;
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 40px 24px;
    }
  }
}
</style>
