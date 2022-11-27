<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import router from '@/router'

const authStore = useAuthStore()

async function logout() {
  try {
    await authStore.logout()
  } catch (error) {
    //TODO: handle error
  }

  if (router.currentRoute.value.meta?.requiresAuth ?? false) {
    router.replace({ name: 'home' })
  }
}
</script>

<template>
  <RouterView />
</template>
