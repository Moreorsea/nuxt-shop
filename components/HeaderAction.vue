<template>
  <div
    class="header-action"
    :class="`header-action--${variant}`"
  >
    <template v-if="variant === 'toolbar'">
      <NuxtLink
        to="/cart"
        aria-label="Корзина"
      >
        <Icon
          name="icon:cart"
          size="22"
        />
      </NuxtLink>
      <NuxtLink
        to="/favorites"
        aria-label="Избранное"
      >
        <Icon
          name="icon:favorite"
          size="22"
        />
      </NuxtLink>
      <NuxtLink
        :to="accountLink"
        aria-label="Аккаунт"
      >
        <Icon
          name="icon:account"
          size="22"
        />
      </NuxtLink>
    </template>

    <template v-else>
      <NuxtLink
        :to="accountLink"
        class="header-action__item"
      >
        <Icon
          name="icon:account"
          size="20"
        />
        <span>Мой аккаунт</span>
      </NuxtLink>
      <NuxtLink
        to="/favorites"
        class="header-action__item"
      >
        <Icon
          name="icon:favorite"
          size="20"
        />
        <span>Избранное</span>
      </NuxtLink>
    </template>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  variant?: 'toolbar' | 'menu'
}>(), {
  variant: 'toolbar',
})

const authStore = useAuthStore()

const isLoggedIn = computed(() => Boolean(authStore.token))
const accountLink = computed(() => isLoggedIn.value ? '/account' : '/auth/login')
</script>

<style lang="scss" scoped>
.header-action {
  display: flex;

  &--toolbar {
    flex-direction: row;
    align-items: center;
    gap: 24px;

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--color-dark-gray);
      line-height: 0;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-black);
      }

      &.router-link-active {
        color: var(--color-accent);
      }
    }
  }

  &--menu {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 0;
    border: none;
    background: none;
    color: var(--color-black);
    font: inherit;
    font-size: 16px;
    line-height: 1.2;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-dark-gray);
    }

    &.router-link-active {
      color: var(--color-accent);
    }
  }
}
</style>
