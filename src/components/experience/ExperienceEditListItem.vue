<template>
  <form
    @submit.prevent="updateExperience()"
    class="grid md:grid-cols-2 gap-2"
  >
    <input-field
      label="Position"
      v-model="position"
    />
    <label class="flex flex-col">
      <span class="text-aqua">Company</span>
      <select
        v-if="useCompanyStore().companies"
        id="company"
        v-model="company"
        class="bg-[#001518] text-white border-2 border-aqua p-2 outline-0 h-11"
      >
        <option
          v-for="(company, index) in useCompanyStore().companies.getAllCompanies"
          :value="company"
          :key="index"
        >
          {{ company.name }}
        </option>
      </select>
    </label>

    <input-field
      label="Start date"
      v-model="startDate"
      type="date"
    />
    <input-field
      label="End date"
      v-model="endDate"
      type="date"
    />

    <div class="col-span-2">
      <label class="block text-aqua">Skills</label>
      <div class="flex flex-wrap gap-1">
        <div>
          <select
            id="remainingSkills"
            v-if="skillStore.skills"
            v-model="skillToAdd"
            class="bg-[#001518] text-white border-2 border-aqua p-2 outline-0"
          >
            <option
              v-for="(skill, index) in skillStore.skills.getAllSkills"
              :value="skill"
              :key="index"
            >
              {{ skill.name }}
            </option>
          </select>
          <button
            @click="addSkillToExperience()"
            type="button"
            class="content-aqua py-2 px-4 ml-1"
            :disabled="skillAdded"
          >
            ADD SKILL
          </button>
        </div>
        <template
          v-for="(skill, index) in skills"
          :key="index"
        >
          <div class="pl-6 content-aqua flex">
            <span class="self-center">{{ skill.name }}</span>
            <!-- TODO: change this icon -->
            <button
              type="button"
              class="px-6 py-3"
              @click="removeSkillFromExperience(index)"
            >
              <XMarkIcon class="h-4 text-center" />
            </button>
          </div>
        </template>
      </div>
    </div>

    <label class="col-span-2 flex flex-col">
      <span class="text-aqua">Roles</span>
      <div class="flex gap-2">
        <input
          type="text"
          v-model="roleToAdd"
          class="bg-[#001518] text-white border-2 border-aqua p-2 outline-0 grow"
        />
        <button
          type="button"
          class="content-aqua py-2 px-4"
          @click="addRoleToExperience()"
        >
          ADD ROLE
        </button>
      </div>
      <template
        v-for="(role, index) in roles"
        :key="index"
      >
        <div class="py-1 px-2 mt-2 content-aqua flex">
          <span class="grow">{{ role }}</span>
          <!-- TODO: change this icon -->

          <button
            type="button"
            class="px-6"
            @click="removeRoleFromExperience(index)"
          >
            <XMarkIcon class="h-6" />
          </button>
        </div>
      </template>
    </label>
    <div
      v-if="experience.id"
      class="col-span-2 styled-list horizontal gap-2"
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
        @click="deleteExperience()"
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
        @click="createExperience()"
      >
        CREATE
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { IExperienceModel } from '@/stores/experience/experience-model'
import { computed, ref } from 'vue'
import InputField from '../InputField.vue'

import { useExperienceStore } from '@/stores/experience/experience-store'
import { useCompanyStore } from '@/stores/company/company-store'
import { useSkillStore } from '@/stores/skill/skill-store'
import type { ISkillModel } from '@/stores/skill/skill-model'
import type { ICompanyModel } from '@/stores/company/company-model'
import { XMarkIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  experience: IExperienceModel
}>()

const position = ref(props.experience.position)
const roles = ref<string[]>(props.experience.roles ?? [])
const startDate = ref<string>(props.experience.startDate)
const endDate = ref<string>(props.experience.endDate ?? '')
const skills = ref<ISkillModel[]>(props.experience.skills ?? [])
const company = ref<ICompanyModel>(props.experience.company)
const experienceStore = useExperienceStore()
const skillStore = useSkillStore()
const skillToAdd = ref<ISkillModel>({} as ISkillModel)
const skillAdded = computed(() => skills.value.some(skill => skill.id === skillToAdd.value.id))

const roleToAdd = ref('')

function addSkillToExperience() {
  skills.value = [...skills.value, skillToAdd.value]
}

function addRoleToExperience() {
  roles.value = [...roles.value, roleToAdd.value]
  roleToAdd.value = ''
}

function removeSkillFromExperience(index: number) {
  skills.value.splice(index, 1)
}

function removeRoleFromExperience(index: number) {
  roles.value.splice(index, 1)
}

function createExperience() {
  experienceStore.createExperience(
    position.value,
    roles.value,
    startDate.value,
    endDate.value,
    company.value.id,
    skills.value.map(skill => skill.id)
  )
  experienceStore.onCreateExperienceDone(() => {
    position.value = ''
    roles.value = []
    startDate.value = ''
    endDate.value = ''
    skills.value = []
    company.value = {} as ICompanyModel
  })
}

function deleteExperience() {
  experienceStore.deleteExperience(props.experience.id)
}

function updateExperience() {
  experienceStore.updateExperience({
    id: props.experience.id,
    roles: roles.value,
    startDate: startDate.value,
    endDate: endDate.value,
    position: position.value,
    company: company.value,
    skills: skills.value,
  })
}
</script>
