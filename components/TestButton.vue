<template>
  <button
    :class="['btn', color]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'primary' }
})
defineEmits(['click'])
</script>