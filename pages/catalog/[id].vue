<template>
  <Head>
    <Meta name="description" content="устаналиваю альтернативный хэдер" />
  </Head>
  <section class="product">
    <div class="product__top">
      <div class="gallery">
        <div class="gallery__thumbs">
          <button
            v-for="(image, index) in product.images"
            :key="image.id"
            type="button"
            class="gallery__thumb"
            :class="{ 'gallery__thumb--active': activeImage === index }"
            :aria-label="`Фото ${index + 1}`"
            @click="activeImage = index"
          >
            <NuxtImg
              :src="image.path"
              :alt="image.alt || product.name"
              width="80"
              height="80"
              format="webp"
              loading="lazy"
            />
          </button>
        </div>

        <div class="gallery__main">
          <NuxtImg
            :src="product.images[activeImage]?.path"
            :alt="product.images[activeImage]?.alt || product.name"
            width="540"
            height="540"
            format="webp"
            class="gallery__image"
          />
          <div
            class="gallery__progress"
            aria-hidden="true"
          >
            <span
              class="gallery__progress-bar"
              :style="{ width: `${((activeImage + 1) / product.images.length) * 100}%` }"
            />
          </div>
        </div>
      </div>

      <div class="product__info">
        <h1 class="product__title">
          {{ product.name }}
        </h1>
        <p class="product__price">
          $ {{ formatPrice(product.price) }}
        </p>

        <div class="product__rating">
          <div
            class="stars"
            :aria-label="`Рейтинг ${product.rating} из 5`"
          >
            <Icon
              v-for="n in 5"
              :key="n"
              :name="n <= Math.round(product.rating) ? 'icon:star' : 'icon:star-empty'"
              size="16"
            />
          </div>
          <span class="product__reviews-count">{{ reviews.length }} отзыва</span>
        </div>

        <p class="product__lead">
          {{ product.description }}
        </p>

        <div class="product__buy">
          <div
            class="qty"
            role="group"
            aria-label="Количество"
          >
            <button
              type="button"
              class="qty__btn"
              aria-label="Уменьшить"
              :disabled="quantity <= 1"
              @click="quantity -= 1"
            >
              −
            </button>
            <span class="qty__value">{{ quantity }}</span>
            <button
              type="button"
              class="qty__btn"
              aria-label="Увеличить"
              @click="quantity += 1"
            >
              +
            </button>
          </div>

          <ActionButton
            type="ghost"
            class="product__cart"
          >
            Добавить в корзину
          </ActionButton>
        </div>

        <div class="product__actions">
          <button
            type="button"
            class="product__fav"
            :aria-label="isFavourites(product.id) ? 'Убрать из избранного' : 'В избранное'"
            @click="toggleFavourites(product.id)"
          >
            <Icon
              :name="isFavourites(product.id) ? 'icon:favorite-add' : 'icon:favorite'"
              size="20"
            />
          </button>

          <span
            class="product__divider"
            aria-hidden="true"
          />

          <div class="product__share">
            <a
              href="mailto:"
              aria-label="Поделиться по email"
            >
              <Icon
                name="icon:mail"
                size="18"
              />
            </a>
            <a
              href="#"
              aria-label="Facebook"
            >
              <Icon
                name="icon:facebook"
                size="18"
              />
            </a>
            <a
              href="#"
              aria-label="Instagram"
            >
              <Icon
                name="icon:instagram"
                size="18"
              />
            </a>
            <a
              href="#"
              aria-label="Twitter"
            >
              <Icon
                name="icon:twitter"
                size="18"
              />
            </a>
          </div>
        </div>

        <dl class="product__meta">
          <div>
            <dt>SKU:</dt>
            <dd>{{ product.sku }}</dd>
          </div>
          <div>
            <dt>Категория:</dt>
            <dd>{{ product.category }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="product__tabs">
      <div
        class="tabs"
        role="tablist"
      >
        <button
          type="button"
          class="tabs__btn"
          :class="{ 'tabs__btn--active': activeTab === 'description' }"
          role="tab"
          :aria-selected="activeTab === 'description'"
          @click="activeTab = 'description'"
        >
          Описание
        </button>
        <button
          type="button"
          class="tabs__btn"
          :class="{ 'tabs__btn--active': activeTab === 'reviews' }"
          role="tab"
          :aria-selected="activeTab === 'reviews'"
          @click="activeTab = 'reviews'"
        >
          Отзывы ({{ reviews.length }})
        </button>
      </div>

      <div
        v-show="activeTab === 'description'"
        class="tabs__panel"
        role="tabpanel"
      >
        <p class="product__description">
          {{ product.fullDescription }}
        </p>
      </div>

      <div
        v-show="activeTab === 'reviews'"
        class="tabs__panel tabs__panel--reviews"
        role="tabpanel"
      >
        <ul class="reviews">
          <li
            v-for="review in reviews"
            :key="review.id"
            class="reviews__item"
          >
            <div class="reviews__head">
              <span class="reviews__author">{{ review.author }}</span>
              <time class="reviews__date">{{ review.date }}</time>
            </div>
            <div
              class="stars stars--sm"
              :aria-label="`Рейтинг ${review.rating} из 5`"
            >
              <Icon
                v-for="n in 5"
                :key="n"
                :name="n <= review.rating ? 'icon:star' : 'icon:star-empty'"
                size="14"
              />
            </div>
            <p class="reviews__text">
              {{ review.text }}
            </p>
          </li>
        </ul>

        <form
          class="review-form"
          @submit.prevent
        >
          <h2 class="review-form__title">
            Добавить отзыв
          </h2>
          <p class="review-form__note">
            Ваш email не будет опубликован. Обязательные поля помечены *
          </p>

          <label class="review-form__field">
            <textarea
              v-model="form.text"
              class="review-form__textarea"
              placeholder="Отзыв*"
              rows="4"
              required
            />
          </label>

          <label class="review-form__field">
            <input
              v-model="form.name"
              class="review-form__input"
              type="text"
              placeholder="Ваше имя*"
              required
            >
          </label>

          <label class="review-form__field">
            <input
              v-model="form.email"
              class="review-form__input"
              type="email"
              placeholder="Ваш email*"
              required
            >
          </label>

          <label class="review-form__check">
            <input
              v-model="form.saveData"
              type="checkbox"
            >
            <span>Сохранить данные для следующих отзывов</span>
          </label>

          <div class="review-form__rating">
            <span>Рейтинг*</span>
            <div class="stars">
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                class="review-form__star"
                :aria-label="`Оценка ${n}`"
                @click="form.rating = n"
              >
                <Icon
                  :name="n <= form.rating ? 'icon:star' : 'icon:star-empty'"
                  size="16"
                />
              </button>
            </div>
          </div>

          <ActionButton class="review-form__submit">
            Отправить
          </ActionButton>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const route = useRoute()

const product = {
  id: Number(route.params.id) || 101,
  name: 'Lira Earrings',
  price: 20,
  rating: 5,
  sku: '12',
  category: 'Серьги',
  description: 'Лёгкие серьги из позолоченной латуни с аккуратным силуэтом. Подходят для повседневных образов и вечерних выходов.',
  fullDescription: 'Серьги Lira выполнены из позолоченной латуни с матовым покрытием. Лёгкая конструкция комфортна в носке весь день. Изделие сочетается как с минималистичными, так и с более выразительными образами. Рекомендуем беречь от влаги и хранить в мягком футляре.',
  images: [
    { id: 1, path: '/images/earrings1.jpg', alt: 'Lira Earrings — вид 1', sort_order: 0 },
    { id: 2, path: '/images/earrings2.jpg', alt: 'Lira Earrings — вид 2', sort_order: 1 },
    { id: 3, path: '/images/earrings3.jpg', alt: 'Lira Earrings — вид 3', sort_order: 2 },
    { id: 4, path: '/images/earrings4.jpg', alt: 'Lira Earrings — вид 4', sort_order: 3 },
  ],
}

const reviews = [
  {
    id: 1,
    author: 'Василий',
    date: '6 мая 2024',
    rating: 3,
    text: 'Красивые серьги, но крепления оказались чуть крупнее, чем ожидал. В целом качество нормальное за свою цену.',
  },
  {
    id: 2,
    author: 'Николай',
    date: '6 мая 2024',
    rating: 3,
    text: 'Хороший подарок, упаковка аккуратная. Цвет приятный, на фото выглядит чуть ярче, чем вживую.',
  },
]

const activeImage = ref(0)
const activeTab = ref<'description' | 'reviews'>('reviews')
const quantity = ref(1)

const form = reactive({
  text: '',
  name: '',
  email: '',
  saveData: false,
  rating: 0,
})

const favouritesStore = useFavouritesStore()
const { toggleFavourites, isFavourites } = favouritesStore

function formatPrice(price: number) {
  return price.toFixed(2).replace('.', ',')
}

useSeoMeta({
  title: product.name,
  description: product.description,
})
</script>

<style lang="scss" scoped>
.product {
  padding-bottom: 64px;
  color: #2c2c2c;

  @media (min-width: 768px) {
    padding-bottom: 96px;
  }

  &__top {
    display: grid;
    gap: 32px;

    @media (min-width: 960px) {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      gap: 48px;
      align-items: start;
    }
  }

  &__title {
    margin: 0;
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;

    @media (min-width: 768px) {
      font-size: 36px;
    }
  }

  &__price {
    margin-top: 12px;
    color: var(--color-accent);
    font-size: 20px;
    line-height: 1.3;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
  }

  &__reviews-count {
    color: var(--color-dark-gray);
    font-size: 14px;
  }

  &__lead {
    margin-top: 24px;
    max-width: 420px;
    color: var(--color-dark-gray);
    font-size: 15px;
    line-height: 1.6;
  }

  &__buy {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 16px;
    margin-top: 32px;
  }

  &__cart {
    flex: 1;
    min-width: 180px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 28px;
  }

  &__fav {
    display: inline-flex;
    padding: 0;
    border: none;
    background: none;
    color: #2c2c2c;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-accent);
    }
  }

  &__divider {
    width: 1px;
    height: 18px;
    background-color: var(--color-gray);
  }

  &__share {
    display: flex;
    align-items: center;
    gap: 16px;

    a {
      display: inline-flex;
      color: #2c2c2c;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-accent);
      }
    }
  }

  &__meta {
    display: grid;
    gap: 8px;
    margin-top: 28px;
    font-size: 14px;
    line-height: 1.4;

    div {
      display: flex;
      gap: 6px;
    }

    dt {
      color: var(--color-dark-gray);
    }

    dd {
      margin: 0;
      color: #2c2c2c;
    }
  }

  &__tabs {
    margin-top: 56px;

    @media (min-width: 768px) {
      margin-top: 72px;
    }
  }

  &__description {
    max-width: 720px;
    color: var(--color-dark-gray);
    font-size: 15px;
    line-height: 1.7;
  }
}

.gallery {
  display: grid;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 20px;
    align-items: start;
  }

  &__thumbs {
    display: flex;
    gap: 12px;
    order: 2;
    overflow-x: auto;

    @media (min-width: 640px) {
      flex-direction: column;
      order: 0;
      overflow: visible;
    }
  }

  &__thumb {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 2px;
    background: none;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.2s ease;

    @media (min-width: 640px) {
      width: 72px;
      height: 72px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &--active,
    &:hover {
      border-color: #2c2c2c;
    }
  }

  &__main {
    position: relative;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    background-color: rgba(lightgray, 0.35);
  }

  &__progress {
    height: 2px;
    margin-top: 12px;
    background-color: var(--color-gray);
  }

  &__progress-bar {
    display: block;
    height: 100%;
    background-color: #2c2c2c;
    transition: width 0.25s ease;
  }
}

.stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #2c2c2c;

  &--sm {
    margin-top: 8px;
  }
}

.qty {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-width: 108px;
  height: 52px;
  padding: 0 14px;
  border: 1px solid var(--color-gray);
  border-radius: 4px;
  background-color: #f8f8f8;

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    padding: 0;
    border: none;
    background: none;
    color: #2c2c2c;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;

    &:disabled {
      opacity: 0.35;
      cursor: default;
    }
  }

  &__value {
    min-width: 1.5ch;
    text-align: center;
    font-size: 16px;
  }
}

.tabs {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid var(--color-gray);

  &__btn {
    position: relative;
    padding: 0 0 14px;
    border: none;
    background: none;
    color: var(--color-dark-gray);
    font: inherit;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.2s ease;

    &--active {
      color: #2c2c2c;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 2px;
        background-color: #2c2c2c;
      }
    }
  }

  &__panel {
    padding-top: 32px;

    &--reviews {
      display: grid;
      gap: 40px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 64px;
        align-items: start;
      }
    }
  }
}

.reviews {
  display: grid;
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;

  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px 16px;
  }

  &__author {
    font-size: 16px;
    font-weight: 500;
  }

  &__date {
    color: var(--color-dark-gray);
    font-size: 14px;
  }

  &__text {
    margin-top: 10px;
    color: var(--color-dark-gray);
    font-size: 15px;
    line-height: 1.6;
  }
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__title {
    margin: 0;
    font-size: 22px;
    font-weight: 500;
    line-height: 1.3;
  }

  &__note {
    margin: -8px 0 0;
    color: var(--color-dark-gray);
    font-size: 13px;
    line-height: 1.5;
  }

  &__field {
    display: block;
  }

  &__input,
  &__textarea {
    display: block;
    width: 100%;
    padding: 12px 0;
    border: none;
    border-bottom: 1px solid var(--color-gray);
    background: none;
    color: #2c2c2c;
    font: inherit;
    resize: vertical;

    &::placeholder {
      color: var(--color-dark-gray);
    }

    &:focus {
      outline: none;
      border-bottom-color: #2c2c2c;
    }
  }

  &__check {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: var(--color-dark-gray);
    font-size: 14px;
    line-height: 1.4;
    cursor: pointer;

    input {
      margin-top: 2px;
      accent-color: #2c2c2c;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--color-dark-gray);
    font-size: 14px;
  }

  &__star {
    display: inline-flex;
    padding: 0;
    border: none;
    background: none;
    color: #2c2c2c;
    cursor: pointer;
  }

  &__submit {
    align-self: flex-start;
    min-width: 140px;
  }
}
</style>
