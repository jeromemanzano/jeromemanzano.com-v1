<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline'
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
  <header>
    <button
      @click="logout()"
      v-if="authStore.isLoggedIn"
    >
      <ArrowLeftOnRectangleIcon class="h-6" />
    </button>
  </header>

  <RouterView />
</template>
