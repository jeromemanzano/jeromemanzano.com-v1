<template>
  <section>
    <h2
      class="transition"
      id="experiences-section"
    >
      Experiences
    </h2>

    <ol class="transition-group vertical flex flex-col gap-4 max-w-3xl mx-auto">
      <li
        v-for="(experience, index) in experiences"
        :key="index"
        @click="onActivated($event)"
        :class="{ active: index === 0 }"
        class="group border-[1px] border-neutral-300 pb-6 px-8 transition from:translate-x-5 from:opacity-0 duration-500 overflow-hidden fill-hover"
      >
        <div class="w-full flex py-5 items-center">
          <span class="bg-neutral-300 group-[:hover:not(.active)]:bg-neutral-900 w-[50px] h-1 mr-4"></span>
          <h4 class="grow text-right group-[:hover:not(.active)]:opacity-0">
            {{ formatDate(experience.positions[experience.positions.length - 1].startDate) }}-{{
              formatDate(experience.positions[experience.positions.length - 1].endDate)
            }}
          </h4>
        </div>
        <h3
          class="block text-sm md:text-xl font-semibold group-[:hover:not(.active)]:text-neutral-900 group-[.active]:text-slate-200"
        >
          {{ experience.positions[0].title }}
          <a
            :href="experience.company.website"
            class="uppercase text-slate-200 group-[:hover:not(.active)]:text-neutral-900 font-semibold group-[.active]:text-yellow-400"
            >@{{ experience.company.name }}</a
          >
        </h3>

        <div class="details hidden font-roboto group-[.active]:block">
          <ul class="block my-5">
            <li
              class="list-disc list-inside"
              v-for="(role, index) in experience.positions[0].roles"
              :key="index"
            >
              {{ role }}
            </li>
          </ul>
          <ul class="flex flex-wrap gap-x-5 text-slate-200">
            <li
              v-for="(skill, index) in experience.positions[0].skills"
              class="inline pipe"
              :key="index"
            >
              {{ skill.name }}
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { useExperienceStore } from '@/stores/experience/experience-store'
import { useCompanyStore } from '@/stores/company/company-store'
import { computed } from 'vue'
import type { IExperienceModel } from '@/stores/experience/experience-model'

const experienceStore = useExperienceStore()
const companyStore = useCompanyStore()
const experiences = computed(() => {
  if (!companyStore.companies || !experienceStore.experiences) return []

  const experienceMap = new Map()
  experienceStore.experiences.getAllExperiences.forEach((experience: IExperienceModel) => {
    let experienceEntry = experienceMap.get(experience.company.id)

    if (!experienceEntry) {
      experienceEntry = {
        company: experience.company,
        positions: [
          {
            title: experience.position,
            startDate: experience.startDate,
            endDate: experience.endDate,
            skills: experience.skills,
            roles: experience.roles,
          },
        ],
      }
    } else {
      experienceEntry.positions = [
        ...experienceEntry.positions,
        {
          title: experience.position,
          startDate: experience.startDate,
          endDate: experience.endDate,
          skills: experience.skills,
          roles: experience.roles,
        },
      ].sort((a, b) => (a.endDate > b.endDate ? -1 : 1))
    }

    experienceMap.set(experience.company.id, experienceEntry)
  })

  return [...experienceMap.values()].sort((a, b) =>
    a.positions[a.positions.length - 1].startDate > b.positions[b.positions.length - 1].startDate ? -1 : 1
  )
})

function onActivated(event: Event) {
  const target = event.currentTarget as Element
  const children = target.parentElement?.children

  if (children) {
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('active')
    }
  }

  target.classList.add('active')
}

function formatDate(dateString: string): string {
  if (!dateString) return 'Present'

  const date = new Date(dateString)
  return `${date.getMonth() + 1}.${date.getFullYear()}`
}
</script>

<style scoped>
.fill-hover.active {
  @apply border-cyan-400;
}

.fill-hover:not(.active):before {
  content: 'SEE MORE';
  font-weight: bold;
  display: flex;
  @apply py-5;
  @apply px-9;
  justify-content: flex-end;
  align-items: flex-start;
}
</style>
