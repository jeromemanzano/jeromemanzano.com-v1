<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSkillStore } from './stores/skill/skill-store'
import { useExperienceStore } from './stores/experience/experience-store'
import { useCompanyStore } from './stores/company/company-store'
import LoadingView from './views/LoadingView.vue'
import ErrorView from './views/ErrorView.vue'

const skillStore = useSkillStore()
const experienceStore = useExperienceStore()
const companyStore = useCompanyStore()
</script>

<template>
  <LoadingView
    class="absolute w-screen h-screen min-w-[320px]"
    v-if="skillStore.queryLoading || experienceStore.queryLoading || companyStore.queryLoading"
  />
  <ErrorView
    v-else-if="skillStore.error || experienceStore.error || companyStore.error"
    class="absolute w-screen h-screen min-w-[320px]"
  />

  <RouterView v-else />
</template>
