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
        :options="categoriesSelect"
      />
      <SearchField v-model="search" />
      <label class="filters__limit">
        На странице
        <select v-model.number="limit">
          <option :value="6">
            6
          </option>
          <option :value="10">
            10
          </option>
          <option :value="20">
            20
          </option>
        </select>
      </label>
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
        v-if="pagination"
        class="pagination"
      >
        <button
          type="button"
          :disabled="pagination.page <= 1"
          @click="page = pagination.page - 1"
        >
          Назад
        </button>
        <span>Страница {{ pagination.page }} из {{ pagination.totalPages }}</span>
        <button
          type="button"
          :disabled="pagination.page >= pagination.totalPages"
          @click="page = pagination.page + 1"
        >
          Вперёд
        </button>
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

const selectDefault = {
  value: '',
  label: 'Категории'
}

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
  },
  watch: [category_id, search, page, limit],
})

const cards = computed(() => productsResponse.value?.data ?? []);
const pagination = computed(() => productsResponse.value?.meta);

watch([category_id, search, limit], () => {
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
}

.catalog__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.filters {
  max-width: 260px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__limit {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
  }
}

.pagination {
  display: flex;
  align-items: center;
  gap: 16px;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
