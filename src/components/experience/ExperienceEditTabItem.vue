<template>
  <!-- TODO: implement loading and error -->
  <div v-if="experienceStore.loading"></div>
  <div v-else-if="experienceStore.error"></div>
  <div
    v-else-if="experienceStore.experiences"
    class="grid gap-6 md:gap-4"
  >
    <ExperienceEditListItem :experience="newExperience" />
    <ExperienceEditListItem
      v-for="(experience, index) in experienceStore.experiences.getAllExperiences"
      :experience="experience"
      :key="index"
    />
  </div>
</template>

<script setup lang="ts">
import type { IExperienceModel } from '@/stores/experience/experience-model'
import ExperienceEditListItem from './ExperienceEditListItem.vue'
import { useExperienceStore } from '@/stores/experience/experience-store'

const newExperience = {} as IExperienceModel
const experienceStore = useExperienceStore()
</script>

<style scoped></style>
