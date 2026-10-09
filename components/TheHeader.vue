<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__top">
        <NuxtLink
          class="header__logo"
          to="/"
        >
          <Logo />
        </NuxtLink>

        <div class="header__right header--desktop">
          <HeaderMenu />
          <span
            class="header__divider"
            aria-hidden="true"
          />

          <div class="header__controls">
            <div class="header__search-slot">
              <button
                class="header__icon"
                :class="{ 'header__icon--hidden': isSearchOpen }"
                type="button"
                aria-label="Поиск"
                :tabindex="isSearchOpen ? -1 : 0"
                @click="openSearch"
              >
                <Icon
                  name="icon:search"
                  size="22"
                />
              </button>

              <div
                class="header__search-panel"
                :class="{ 'header__search-panel--open': isSearchOpen }"
              >
                <div class="header__search-panel-inner">
                  <SearchField
                    ref="searchRef"
                    v-model="search"
                    variant="filled"
                    closable
                    class="header__search"
                    @close="closeSearch"
                    @keydown.enter="submitSearch"
                  />
                </div>
              </div>
            </div>

            <HeaderAction variant="toolbar" />
          </div>
        </div>

        <div class="header__tools header--tablet">
          <NuxtLink
            to="/cart"
            class="header__icon"
            aria-label="Корзина"
          >
            <Icon
              name="icon:cart"
              size="24"
            />
          </NuxtLink>
          <button
            class="header__burger"
            type="button"
            :aria-expanded="isShowMenu"
            :aria-label="isShowMenu ? 'Закрыть меню' : 'Меню'"
            @click="toggleMenu"
          >
            <Icon
              :name="`icon:${isShowMenu ? 'close' : 'menu'}`"
              size="28"
            />
          </button>
        </div>
      </div>

      <div
        v-if="isShowMenu"
        class="header__content header--tablet"
      >
        <SearchField
          v-model="search"
          variant="filled"
          class="header__search"
          @keydown.enter="submitSearch"
        />

        <HeaderMenu />

        <span
          class="header__content-divider"
          aria-hidden="true"
        />

        <HeaderAction variant="menu" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const route = useRoute()
const isShowMenu = ref(false)
const isSearchOpen = ref(false)
const search = ref('')
const searchRef = ref<{ focus: () => void } | null>(null)

const toggleMenu = () => {
  isShowMenu.value = !isShowMenu.value
}

function closeMenu() {
  isShowMenu.value = false
}

async function openSearch() {
  isSearchOpen.value = true
  await nextTick()
  window.setTimeout(() => searchRef.value?.focus(), 420)
}

function closeSearch() {
  isSearchOpen.value = false
}

function submitSearch() {
  const q = search.value.trim()
  closeMenu()
  navigateTo({
    path: '/catalog',
    query: q ? { search: q } : {},
  })
}

watch(() => route.fullPath, closeMenu)

watch(isShowMenu, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-white-light);
  border-bottom: 1px solid var(--color-gray);

  &__inner {
    max-width: 1248px;
    margin: 0 auto;
    padding: 0 16px;

    @media (min-width: 768px) {
      padding: 0 48px;
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 68px;
    padding: 16px 0;

    @media (min-width: 768px) {
      padding: 20px 0;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    line-height: 0;
  }

  &__right {
    display: none;
    align-items: center;
    gap: 32px;

    @media (min-width: 1024px) {
      display: flex;
    }
  }

  &__divider {
    width: 1px;
    height: 20px;
    background-color: var(--color-gray);
    flex-shrink: 0;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__search-slot {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 22px;
  }

  &__search-panel {
    max-width: 0;
    opacity: 0;
    transform: translateX(12px);
    overflow: hidden;
    pointer-events: none;
    will-change: max-width, opacity, transform;
    transition:
      max-width 0.8s cubic-bezier(0.33, 1, 0.32, 1),
      opacity 0.65s cubic-bezier(0.33, 1, 0.32, 1) 0.05s,
      transform 0.8s cubic-bezier(0.33, 1, 0.32, 1);

    &--open {
      max-width: 300px;
      opacity: 1;
      transform: translateX(0);
      pointer-events: auto;
      transition:
        max-width 0.8s cubic-bezier(0.33, 1, 0.32, 1),
        opacity 0.55s cubic-bezier(0.33, 1, 0.32, 1),
        transform 0.8s cubic-bezier(0.33, 1, 0.32, 1);
    }
  }

  &__search-panel-inner {
    width: 280px;
  }

  &__search {
    width: 280px;
  }

  &__tools {
    display: flex;
    align-items: center;
    gap: 16px;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  &__icon,
  &__burger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: none;
    color: var(--color-dark-gray);
    line-height: 0;
    cursor: pointer;
    transition:
      color 0.25s ease,
      opacity 0.5s cubic-bezier(0.33, 1, 0.32, 1),
      transform 0.5s cubic-bezier(0.33, 1, 0.32, 1);

    &:hover {
      color: var(--color-black);
    }
  }

  &__icon--hidden {
    position: absolute;
    opacity: 0;
    transform: scale(0.9);
    pointer-events: none;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-height: calc(100dvh - 68px);
    padding: 8px 0 32px;
    overflow-y: auto;
    border-top: 1px solid var(--color-gray);

    @media (min-width: 768px) {
      gap: 36px;
      padding: 16px 0 40px;
    }

    .header__search {
      width: 100%;
      min-width: 0;
    }
  }

  &__content-divider {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-gray);
  }

  :deep(.header--tablet) {
    @media (min-width: 1024px) {
      display: none !important;
    }
  }

  :deep(.header--desktop) {
    @media (max-width: 1023px) {
      display: none !important;
    }
  }
}
</style>
