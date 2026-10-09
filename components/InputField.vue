<template>
  <div
    class="input-field"
    :class="`input-field--${variant}`"
  >
    <input
      v-model="data"
      :placeholder="placeholder"
      class="input-field__control"
      :type="inputType"
    >
    <button
      v-if="isPassword"
      type="button"
      class="input-field__toggle"
      :aria-label="isVisible ? 'Скрыть пароль' : 'Показать пароль'"
      @click="isVisible = !isVisible"
    >
      <Icon
        :name="isVisible ? 'icon:eye-off' : 'icon:eye'"
        size="20"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
const data = defineModel<string>({ default: '' })
const {
  variant = 'gray',
  placeholder = '',
  type = 'text',
} = defineProps<{
  variant?: 'gray' | 'black'
  placeholder?: string
  type?: string
}>()

const isPassword = computed(() => type === 'password')
const isVisible = ref(false)

const inputType = computed(() => {
  if (!isPassword.value) return type
  return isVisible.value ? 'text' : 'password'
})
</script>

<style lang="scss" scoped>
.input-field {
  display: flex;
  align-items: center;
  gap: 8px;

  &--gray {
    border-bottom: 1px solid var(--color-gray);
  }

  &--black {
    border-bottom: 1px solid var(--color-black);
  }

  &__control {
    flex: 1;
    min-width: 0;
    padding: 12px 0;
    background: none;
    border: none;
    color: var(--color-black);

    &::placeholder {
      color: var(--color-dark-gray);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: var(--color-black);
      box-shadow: 0 0 0 1000px #fff inset;
      transition: background-color 9999s ease-out;
    }
  }

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;
    border: none;
    background: none;
    color: var(--color-dark-gray);
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-black);
    }
  }
}
</style>
