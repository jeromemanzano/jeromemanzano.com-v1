<template>
  <div
    v-if="authStore.isLoggedIn"
    class="font-roboto flex flex-col gap-5 text-center"
  >
    Logged in as {{ authStore.user?.displayName }}
    <button
      @click="logout()"
      class="block fill-hover px-6 py-4 border-[1px] border-mainBgColor hover:text-secondaryColor"
    >
      Sign out
    </button>
  </div>
  <div
    v-else
    class="font-roboto flex flex-col gap-5"
  >
    <button
      @click="login()"
      class="fill-hover px-6 py-4 border-[1px] border-mainBgColor"
    >
      Sign in with Google
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'

const authStore = useAuthStore()
const emits = defineEmits(['close'])

function login() {
  authStore
    .login()
    .then(() => emits('close'))
    .catch(error => {
      console.error(error)
      //TODO: show error message
    })
}

function logout() {
  authStore
    .logout()
    .then(() => emits('close'))
    .catch(error => console.error(error))
}
</script>
