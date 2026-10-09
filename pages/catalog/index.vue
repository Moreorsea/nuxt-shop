<template>
  <h1>Каталог товаров</h1>
  <div
    v-if="categoriesError || productsError"
    class="catalog-error"
  >
    Ошибка загрузки: {{ categoriesError?.message || productsError?.message }}
  </div>
  <div class="catalog">
    <div class="filters">
      <SelectField
        v-model="category_id"
        label="Категория"
        :options="categoriesSelect"
      />
      <SearchField v-model="search" />
      <SelectField
        v-model="sort"
        label="Сортировка"
        :options="sortOptions"
      />
      <div class="filters__limit">
        <span class="filters__limit-label">На странице</span>
        <div
          class="limit-switch"
          role="group"
          aria-label="Количество товаров на странице"
        >
          <button
            v-for="option in limitOptions"
            :key="option"
            type="button"
            class="limit-switch__btn"
            :class="{ 'limit-switch__btn--active': limit === option }"
            @click="limit = option"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>
    <div class="catalog__content">
      <div class="card-list">
        <Card
          v-for="card in cards"
          :key="card.id"
          :card="card"
        />
      </div>
      <div
        v-if="pagination && pagination.totalPages > 0"
        class="pagination"
      >
        <button
          type="button"
          class="pagination__nav"
          :disabled="pagination.page <= 1"
          aria-label="Предыдущая страница"
          @click="page = pagination.page - 1"
        >
          ←
        </button>

        <div class="pagination__pages">
          <button
            v-for="(item, index) in pageItems"
            :key="`${item}-${index}`"
            type="button"
            class="pagination__page"
            :class="{
              'pagination__page--active': item === pagination.page,
              'pagination__page--ellipsis': item === '…',
            }"
            :disabled="item === '…'"
            @click="typeof item === 'number' && (page = item)"
          >
            {{ item }}
          </button>
        </div>

        <button
          type="button"
          class="pagination__nav"
          :disabled="pagination.page >= pagination.totalPages"
          aria-label="Следующая страница"
          @click="page = pagination.page + 1"
        >
          →
        </button>

        <p class="pagination__meta">
          {{ paginationRange }} из {{ pagination.total }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const category_id = ref(route.query.category_id?.toString() || '');
const search = ref(route.query.search?.toString() || '');
const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 10);
const sort = ref(route.query.sort?.toString() || 'date_desc');

const selectDefault = {
  value: '',
  label: 'Категории'
}

const sortOptions = [
  { value: 'date_desc', label: 'Сначала новые' },
  { value: 'date_asc', label: 'Сначала старые' },
  { value: 'rating', label: 'По рейтингу' },
]

const limitOptions = [6, 10, 20]

const { data: categoriesSelect, error: categoriesError } = await useFetch('/api/categories', {
  transform: (rawData) => {
    const categories = rawData
      ? rawData.map(item => ({ label: item.title, value: String(item.id) })).concat(selectDefault)
      : [selectDefault];

    return categories;
  }
})

const { data: productsResponse, error: productsError } = await useFetch('/api/products', {
  query: {
    search,
    category_id,
    page,
    limit,
    sort,
  },
  watch: [category_id, search, page, limit, sort],
})

const cards = computed(() => productsResponse.value?.data ?? []);
const pagination = computed(() => productsResponse.value?.meta);

const paginationRange = computed(() => {
  const meta = pagination.value;
  if (!meta || !meta.total) {
    return '0';
  }

  const from = (meta.page - 1) * meta.limit + 1;
  const to = Math.min(meta.page * meta.limit, meta.total);
  return `${from}–${to}`;
});

const pageItems = computed(() => {
  const meta = pagination.value;
  if (!meta || meta.totalPages <= 0) {
    return [] as Array<number | '…'>;
  }

  const total = meta.totalPages;
  const current = meta.page;

  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: Array<number | '…'> = [1];

  if (current > 3) {
    items.push('…');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    items.push(pageNumber);
  }

  if (current < total - 2) {
    items.push('…');
  }

  items.push(total);
  return items;
});

watch([category_id, search, limit, sort], () => {
  page.value = 1;
});

watch(categoriesSelect, (newCategories) => {
  if (!router?.query?.category_id && newCategories?.[0]) {
    router.push({
      query: {
        category_id: newCategories[0].value
      }
    })
  }
})

watchEffect(() => {
  const query: Record<string, string> = {};

  if (category_id.value) {
    query.category_id = category_id.value
  }

  if (search.value) {
    query.search = search.value
  }

  if (page.value > 1) {
    query.page = String(page.value)
  }

  if (limit.value !== 10) {
    query.limit = String(limit.value)
  }

  if (sort.value !== 'date_desc') {
    query.sort = sort.value
  }

  router.replace({ query })
})
</script>

<style lang="scss" scoped>
.catalog-error {
  color: #b00020;
  margin-bottom: 16px;
}

.catalog {
  display: flex;
  gap: 30px;

  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 24px;
  }
}

.catalog__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.card-list {
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

.filters {
  max-width: 260px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;

  @media (max-width: 1023px) {
    max-width: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
    gap: 16px 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-gray);
  }

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
  }

  &__limit {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__limit-label {
    color: var(--color-dark-gray);
    font-size: 13px;
    letter-spacing: 0.02em;
  }
}

.limit-switch {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--color-gray);

  &__btn {
    height: 44px;
    border: none;
    border-right: 1px solid var(--color-gray);
    background: transparent;
    color: var(--color-dark-gray);
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s ease, background-color 0.2s ease;

    &:last-child {
      border-right: none;
    }

    &:hover {
      color: var(--color-black);
    }

    &--active {
      color: var(--color-white-light);
      background-color: var(--color-accent);
    }
  }
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  margin-top: 8px;
  margin-bottom: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--color-gray);

  &__nav,
  &__page {
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--color-gray);
    background: transparent;
    color: var(--color-dark-gray);
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;

    &:hover:not(:disabled) {
      color: var(--color-black);
      border-color: var(--color-black);
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }

  &__pages {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__page {
    &--active {
      color: var(--color-white-light);
      background-color: var(--color-accent);
      border-color: var(--color-accent);

      &:hover:not(:disabled) {
        color: var(--color-white-light);
        border-color: var(--color-accent);
      }
    }

    &--ellipsis {
      min-width: 24px;
      border: none;
      cursor: default;
      opacity: 1;
    }
  }

  &__meta {
    margin-left: auto;
    color: var(--color-dark-gray);
    font-size: 13px;
  }
}
</style>
