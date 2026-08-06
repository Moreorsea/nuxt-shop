<template>
  <input
    v-model="model"
    class="search"
    type="text"
    placeholder="Поиск"
  >
</template>

<script lang="ts" setup>
const model = defineModel<string>();
</script>

<style>
.search {
  border-bottom: 1px solid var(--color-gray);
  width: 100%;
  padding: 10px;
}
</style>