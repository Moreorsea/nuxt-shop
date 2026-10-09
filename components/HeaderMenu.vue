<template>
  <nav class="header-menu">
    <NuxtLink
      to="/"
      active-class=""
      exact-active-class="router-link-active"
    >
      Главная
    </NuxtLink>
    <NuxtLink to="/catalog">
      Магазин
    </NuxtLink>
    <NuxtLink to="/about">
      О нас
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }

  a {
    color: var(--color-black);
    font-size: 16px;
    line-height: 1.2;
    white-space: nowrap;
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
