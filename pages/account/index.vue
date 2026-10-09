<template>account
<NuxtLink to="/" @click="handleExit">Выйти</NuxtLink>
</template>

<script lang="ts" setup>
import { useAuthStore } from "../../stores/auth";

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore();

const handleExit = () => {
  authStore.clearToken();
}
</script>