<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__top">
        <nav class="footer__menu">
          <NuxtLink
            to="/"
            class="footer__menu-item"
          >
            Контакты
          </NuxtLink>
          <NuxtLink
            to="/"
            class="footer__menu-item"
          >
            Условия покупки
          </NuxtLink>
          <NuxtLink
            to="/"
            class="footer__menu-item"
          >
            Доставка и возврат
          </NuxtLink>
        </nav>

        <form
          class="footer__form"
          @submit.prevent
        >
          <InputField
            v-model="email"
            class="footer__input"
            placeholder="Ваш email для акций и предложений"
          />
          <button
            class="footer__subscribe"
            type="submit"
            aria-label="Подписаться"
          >
            <Icon
              name="icon:arrow"
              size="12"
            />
          </button>
        </form>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">
          © {{ year }} Shoppe
        </p>

        <div class="footer__social">
          <NuxtLink
            to="/"
            aria-label="LinkedIn"
          >
            <Icon
              name="icon:linkedin"
              size="18"
            />
          </NuxtLink>
          <NuxtLink
            to="/"
            aria-label="Facebook"
          >
            <Icon
              name="icon:facebook"
              size="18"
            />
          </NuxtLink>
          <NuxtLink
            to="/"
            aria-label="Instagram"
          >
            <Icon
              name="icon:instagram"
              size="18"
            />
          </NuxtLink>
          <NuxtLink
            to="/"
            aria-label="Twitter"
          >
            <Icon
              name="icon:twitter"
              size="18"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const email = ref('')
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 64px;
  border-top: 1px solid var(--color-gray);

  &__inner {
    max-width: 1248px;
    margin: 0 auto;
    padding: 32px 16px 40px;

    @media (min-width: 768px) {
      padding: 40px 48px 48px;
    }
  }

  &__top,
  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (min-width: 900px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
    }
  }

  &__top {
    margin-bottom: 36px;

    @media (min-width: 900px) {
      margin-bottom: 48px;
    }
  }

  &__menu {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 28px;
  }

  &__menu-item {
    color: var(--color-dark-gray);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.06em;
    line-height: 1;
    text-transform: uppercase;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-black);
    }
  }

  &__form {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    @media (min-width: 900px) {
      width: min(360px, 40%);
      flex-shrink: 0;
    }
  }

  &__input {
    width: 100%;

    :deep(.input-field) {
      width: 100%;
      border-bottom-color: var(--color-gray);
    }

    :deep(.input-field__control) {
      padding: 10px 32px 10px 0;
      font-size: 14px;
      color: var(--color-dark-gray);

      &::placeholder {
        color: var(--color-dark-gray);
        opacity: 0.85;
      }
    }
  }

  &__subscribe {
    position: absolute;
    right: 0;
    top: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: none;
    background: none;
    color: var(--color-dark-gray);
    transform: translateY(-50%);
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-black);
    }
  }

  &__copyright {
    margin: 0;
    color: var(--color-dark-gray);
    font-size: 13px;
    line-height: 1;
  }

  &__social {
    display: flex;
    align-items: center;
    gap: 28px;

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
    }
  }
}
</style>
