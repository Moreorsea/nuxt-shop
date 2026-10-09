export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | undefined>('');

  const setToken = (value: string): void => {
    token.value = value;
  }

  const clearToken = (): void => {
    token.value = '';
  }

  return {
    token,
    setToken,
    clearToken
  }

}, {
  persist: true
})