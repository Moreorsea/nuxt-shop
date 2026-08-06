<template>
  <h1>Index</h1>

  <div v-if="pending">
    Загрузка...
  </div>

  <div v-else-if="error">
    Ошибка: {{ error }}
  </div>

  <div v-else>
    <h3>Меню ({{ menu || 0 }} пунктов)</h3>
    <ul>
      <li
        v-for="item in menu?.items"
        :key="item.id"
      >
        {{ item.name }} - {{ item.url }}
      </li>
    </ul>
  </div>

  <button
    :disabled="loading"
    @click="testRequest"
  >
    {{ loading ? 'Загрузка...' : 'Тестовый запрос' }}
  </button>
</template>

<script setup>
const menu = ref(null);
const error = ref(null);
const pending = ref(false);
const loading = ref(false);

const config = useRuntimeConfig();

const { $api } = useNuxtApp();
async function testRequest() {
  loading.value = true;
  error.value = null;
  try {
    //console.log('📤 Отправка запроса к /api/menu');
    const response = await $api.get('/menu');
    //console.log('📦 Ответ получен:', response);
    menu.value = response;
  } catch (err) {
    console.error('❌ Ошибка:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>