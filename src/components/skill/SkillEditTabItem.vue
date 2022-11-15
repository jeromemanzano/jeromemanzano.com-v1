<template>
  <!-- TODO: implement loading and error -->
  <div v-if="skillStore.loading"></div>
  <div v-else-if="skillStore.error"></div>
  <div
    v-else-if="skillStore.skills"
    class="grid gap-6 md:gap-4"
  >
    <SkillEditListItem :skill="newSkill" />
    <SkillEditListItem
      v-for="(skill, index) in skillStore.skills.getAllSkills"
      :skill="skill"
      :key="index"
    />
  </div>
</template>

<script setup lang="ts">
import SkillEditListItem from './SkillEditListItem.vue'
import type { ISkillModel } from '@/stores/skill/skill-model'
import { useSkillStore } from '@/stores/skill/skill-store'

const newSkill = {} as ISkillModel
const skillStore = useSkillStore()
</script>

<style scoped></style>
