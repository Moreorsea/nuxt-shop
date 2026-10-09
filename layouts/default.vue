<template>
  <TheHeader />

  <main class="main">
    <slot />
  </main>

  <TheFooter />
</template>

<style lang="scss" scoped>
.main {
  min-height: 80vh;
  max-width: 1248px;
  margin: 0 auto;
  padding: 24px 16px 0;

  @media (min-width: 768px) {
    padding: 32px 24px 0;
  }
}
</style>