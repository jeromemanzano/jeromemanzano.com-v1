<template>
  <form
    @submit.prevent="updateSkill()"
    class="grid grid-cols-2 md:grid-cols-6 gap-2"
  >
    <input-field
      label="Name"
      v-model="name"
      class="col-span-2"
    />
    <input-field
      label="Icon URL"
      v-model="iconUrl"
      class="col-span-2"
    />

    <div
      v-if="skill.id"
      class="col-span-2 styled-list horizontal gap-3"
    >
      <button
        type="submit"
        class="content-aqua py-2 mt-2 md:mt-6"
      >
        UPDATE
      </button>
      <button
        type="button"
        class="content-candyAppleRed py-2 mt-2 md:mt-6"
        @click="deleteSkill()"
      >
        DELETE
      </button>
    </div>
    <div
      v-else
      class="contents styled-list horizontal"
    >
      <button
        type="button"
        class="content-aqua py-2 mt-2 md:mt-6"
        @click="createSkill()"
      >
        CREATE
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ISkillModel } from '@/stores/skill/skill-model'
import { ref } from 'vue'
import { useSkillStore } from '@/stores/skill/skill-store'
import InputField from '../InputField.vue'

const props = defineProps<{
  skill: ISkillModel
}>()

const name = ref(props.skill.name ?? '')
const iconUrl = ref(props.skill.iconUrl)

const skillStore = useSkillStore()

function createSkill() {
  skillStore.createSkill(name.value, iconUrl.value)
  skillStore.onCreateSkillDone(() => {
    name.value = ''
    iconUrl.value = ''
  })
}

function deleteSkill() {
  skillStore.deleteSkill(props.skill.id)
}

function updateSkill() {
  skillStore.updateSkill({
    id: props.skill.id,
    name: name.value,
    iconUrl: iconUrl.value,
  })
}
</script>

<style scoped></style>
