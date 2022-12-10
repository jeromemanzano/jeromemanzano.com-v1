<template>
  <form
    @submit.prevent="updateExperience()"
    class="grid md:grid-cols-2 gap-2"
  >
    <input-field
      label="Position"
      v-model="experience.position"
    />
    <label class="flex flex-col">
      <span class="text-slate-200">Company</span>
      <select
        v-if="useCompanyStore().companies"
        id="company"
        v-model="experience.company"
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
      v-model="experience.startDate"
      type="date"
    />
    <input-field
      label="End date"
      v-model="experience.endDate"
      type="date"
    />

    <div class="col-span-2">
      <label class="block text-slate-200">Skills</label>
      <div class="flex flex-wrap gap-2">
        <select
          id="remainingSkills"
          v-if="skillStore.skills"
          v-model="skillToAdd"
          class="h-full"
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
          class="fill-hover"
          :disabled="skillAdded"
        >
          ADD SKILL
        </button>
        <template
          v-for="(skill, index) in experience.skills"
          :key="index"
        >
          <div class="pl-6 flex border-[1px] border-neutral-300">
            <span class="self-center">{{ skill.name }}</span>
            <button
              type="button"
              class="px-6 py-3"
              @click="removeSkillFromExperience(skill.id)"
            >
              <font-awesome-icon
                icon="fa-solid fa-xmark"
                class="h-4 text-center"
              />
            </button>
          </div>
        </template>
      </div>
    </div>

    <label class="col-span-2 flex flex-col">
      <span class="text-slate-200">Roles</span>
      <div class="flex gap-2">
        <input
          type="text"
          v-model="roleToAdd"
          class="grow"
        />
        <button
          type="button"
          class="fill-hover"
          @click="addRoleToExperience()"
        >
          ADD ROLE
        </button>
      </div>
      <template
        v-for="(role, index) in experience.roles"
        :key="index"
      >
        <div class="py-1 px-2 mt-2 text-slate-200 flex">
          <span class="grow">{{ role }}</span>
          <!-- TODO: change this icon -->

          <button
            type="button"
            class="px-6"
            @click="removeRoleFromExperience(role)"
          >
            <font-awesome-icon
              icon="fa-solid fa-xmark"
              class="h-6 text-center"
            />
          </button>
        </div>
      </template>
    </label>
    <div
      v-if="experience.id"
      class="contents gap-2"
    >
      <button
        type="submit"
        class="fill-hover mt-2 md:mt-6"
      >
        UPDATE
      </button>
      <button
        type="button"
        class="fill-hover mt-2 md:mt-6"
        @click="deleteExperience()"
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
        class="fill-hover mt-2 md:mt-6"
        @click="createExperience()"
      >
        CREATE
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { IExperienceModel } from '@/stores/experience/experience-model'
import { computed, ref, reactive } from 'vue'
import InputField from '../InputField.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { useExperienceStore } from '@/stores/experience/experience-store'
import { useCompanyStore } from '@/stores/company/company-store'
import { useSkillStore } from '@/stores/skill/skill-store'
import type { ISkillModel } from '@/stores/skill/skill-model'
import type { ICompanyModel } from '@/stores/company/company-model'

const props = defineProps<{
  experience: IExperienceModel
}>()

const experience = reactive(Object.assign({}, props.experience))

const experienceStore = useExperienceStore()
const skillStore = useSkillStore()
const skillToAdd = ref<ISkillModel>({} as ISkillModel)
const skillAdded = computed(() => experience.skills?.some(skill => skill.id === skillToAdd.value.id) ?? [])

const roleToAdd = ref('')

function addSkillToExperience() {
  experience.skills = [...experience.skills, skillToAdd.value]
}

function addRoleToExperience() {
  experience.roles = [...experience.roles, roleToAdd.value]
  roleToAdd.value = ''
}

function removeSkillFromExperience(id: string) {
  experience.skills = experience.skills.filter(skill => skill.id !== id)
}

function removeRoleFromExperience(role: string) {
  experience.roles = experience.roles.filter(value => value !== role)
}

function createExperience() {
  experienceStore.onCreateExperienceDone(() => {
    experience.position = ''
    experience.roles = []
    experience.startDate = ''
    experience.endDate = ''
    experience.skills = []
    experience.company = {} as ICompanyModel
  })
  experienceStore.createExperience(experience)
}

function deleteExperience() {
  experienceStore.deleteExperience(props.experience.id)
}

function updateExperience() {
  experienceStore.updateExperience({
    id: experience.id,
    roles: experience.roles,
    startDate: experience.startDate,
    endDate: experience.endDate,
    position: experience.position,
    company: experience.company,
    skills: experience.skills,
  })
}
</script>
