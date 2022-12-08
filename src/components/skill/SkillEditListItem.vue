<template>
  <form
    @submit.prevent="updateSkill()"
    class="grid grid-cols-2 md:grid-cols-4 gap-2"
  >
    <input-field
      label="Name"
      v-model="skill.name"
      class="col-span-2"
    />

    <label class="col-span-2 sm:order-last">
      <input
        id="isRecent"
        v-model="skill.isRecent"
        type="checkbox"
      />

      Recent</label
    >
    <div
      v-if="skill.id"
      class="contents"
    >
      <button
        type="submit"
        class="py-2 mt-2 md:mt-6 fill-hover"
      >
        UPDATE
      </button>
      <button
        type="button"
        class="py-2 mt-2 md:mt-6 fill-hover"
        @click="deleteSkill()"
      >
        DELETE
      </button>
    </div>
    <div
      v-else
      class="contents"
    >
      <button
        type="button"
        class="py-2 mt-2 md:mt-6 fill-hover"
        @click="createSkill()"
      >
        CREATE
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ISkillModel } from '@/stores/skill/skill-model'
import { reactive } from 'vue'
import { useSkillStore } from '@/stores/skill/skill-store'
import InputField from '../InputField.vue'

const props = defineProps<{
  skill: ISkillModel
}>()

const skill = reactive(Object.assign({}, props.skill))

const skillStore = useSkillStore()

function createSkill() {
  skillStore.createSkill(skill)
  skillStore.onCreateSkillDone(() => {
    skill.name = ''
    skill.isRecent = false
  })
}

function deleteSkill() {
  skillStore.deleteSkill(props.skill.id)
}

function updateSkill() {
  skillStore.updateSkill({
    id: props.skill.id,
    name: skill.name,
    isRecent: skill.isRecent,
  })
}
</script>

<style scoped></style>
