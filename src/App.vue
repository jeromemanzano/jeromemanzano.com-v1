<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { useSkillStore } from './stores/skill/skill-store'
import { useExperienceStore } from './stores/experience/experience-store'
import { useCompanyStore } from './stores/company/company-store'
import router from '@/router'
import LoadingView from './views/LoadingView.vue'

const authStore = useAuthStore()
const skillStore = useSkillStore()
const experienceStore = useExperienceStore()
const companyStore = useCompanyStore()
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
  <LoadingView
    class="absolute w-screen h-screen z-50"
    v-if="skillStore.queryLoading || experienceStore.queryLoading || companyStore.queryLoading"
  />

  <RouterView v-else />
</template>
