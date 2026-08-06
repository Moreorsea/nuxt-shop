<template>
  <button class="card__actions-favorite">
    <Icon name="icon:favorite-add" size="16" />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  id: number;
  isShow: boolean;
}>();
</script>