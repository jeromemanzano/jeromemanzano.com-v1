<template>
  <div class="flex justify-center styled-list horizontal">
    <button
      @click="login()"
      v-if="!authStore.isLoggedIn"
      class="content-aqua px-6 py-4"
    >
      Sign in with google
    </button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth-store'

const authStore = useAuthStore()

async function login() {
  try {
    await authStore.login()
    await router.replace({ path: router.currentRoute.value?.redirectedFrom?.path ?? '/' })
  } catch (error) {
    //TODO: handle error
  }
}
</script>
