export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useCookie<{token: string}>('auth');

  if(!auth.value?.token) {
    return navigateTo('/auth/login')
  }
})