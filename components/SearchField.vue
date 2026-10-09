<template>
  <label
    class="search"
    :class="`search--${variant}`"
  >
    <Icon
      v-if="variant === 'filled'"
      name="icon:search"
      size="18"
      class="search__icon"
    />
    <input
      ref="inputRef"
      v-model="model"
      class="search__control"
      type="search"
      placeholder="Поиск"
      @keydown.escape="$emit('close')"
    >
    <button
      v-if="closable"
      type="button"
      class="search__close"
      aria-label="Закрыть поиск"
      @click.stop="$emit('close')"
    >
      <Icon
        name="icon:close"
        size="14"
      />
    </button>
  </label>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  variant?: 'underline' | 'filled'
  closable?: boolean
}>(), {
  variant: 'underline',
  closable: false,
})

defineEmits<{
  close: []
}>()

const model = defineModel<string>()
const inputRef = ref<HTMLInputElement | null>(null)

function focus() {
  inputRef.value?.focus()
}

defineExpose({ focus })
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  width: 100%;

  &--underline {
    border-bottom: 1px solid var(--color-gray);

    .search__control {
      padding: 8px 0;
      font-size: 14px;
    }

    &:focus-within {
      border-bottom-color: var(--color-black);
    }
  }

  &--filled {
    gap: 10px;
    padding: 10px 16px;
    border-radius: 6px;
    background-color: color-mix(in srgb, var(--color-gray) 45%, white);
  }

  &__icon {
    flex-shrink: 0;
    color: var(--color-dark-gray);
  }

  &__control {
    flex: 1;
    min-width: 0;
    border: none;
    background: none;
    color: var(--color-black);
    outline: none;

    &::placeholder {
      color: var(--color-dark-gray);
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button {
      appearance: none;
    }
  }

  &__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: none;
    color: var(--color-dark-gray);
    cursor: pointer;
    transition: color 0.2s ease, background-color 0.2s ease;

    &:hover {
      color: var(--color-black);
      background-color: color-mix(in srgb, var(--color-gray) 55%, white);
    }
  }
}
</style>
