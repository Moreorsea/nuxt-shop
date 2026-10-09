<template>
  <h1>Мой аккаунт</h1>
  <form class="form" @submit.prevent="onSubmit">
    <InputField v-model="email" placeholder="Почта" />
    <InputField v-model="password" placeholder="Пароль" type="password" />
    <p v-if="error" class="form__error">{{ error }}</p>
    <ActionButton>
      {{ pending ? 'Вход…' : 'Вход' }}
    </ActionButton>
    <NuxtLink to="/auth/restore">Забыли пароль</NuxtLink>
  </form>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../../stores/auth';

const email = ref('')
const password = ref('')
const error = ref('')
const pending = ref(false)
const authStore = useAuthStore();

async function onSubmit() {
  error.value = ''
  pending.value = true

  try {
    const data = await $fetch<ILoginResponse>('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    if (import.meta.client) {
      // localStorage.setItem('auth_token', data.token)
      // localStorage.setItem('auth_user', JSON.stringify(data.user))
      authStore.setToken(data.token);
    }

    await navigateTo('/')
  }
  catch (e: unknown) {
    const statusMessage
      = e && typeof e === 'object' && 'data' in e
        ? (e as { data?: { statusMessage?: string } }).data?.statusMessage
        : undefined

    error.value = statusMessage || 'Не удалось войти'
  }
  finally {
    pending.value = false
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__error {
    color: #c0392b;
    font-size: 0.9rem;
  }
}
</style>
