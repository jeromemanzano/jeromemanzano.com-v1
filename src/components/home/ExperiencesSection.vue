<template>
  <section>
    <h2
      class="transition"
      id="experiences-section"
    >
      Experiences
    </h2>

    <ol class="transition-group vertical flex flex-col gap-4 text-secondaryTextColor max-w-3xl mx-auto">
      <li
        v-for="(experience, index) in experiences"
        :key="index"
        @click="onActivated($event)"
        class="group transition from:translate-x-5 from:opacity-0 duration-500 not-active:hover:drop-shadow-[10px_10px_0_rgba(0,240,255,1)] not-active:hover:-translate-x-2 not-active:hover:-translate-y-2"
        :class="{ active: index === 0 }"
      >
        <div
          class="bordered pb-6 px-8 group-[.active]:bg-contentActiveBgColor group-[.active]:before:opacity-0 group-[.active]:text-textColor"
        >
          <div class="w-full flex py-5 items-center">
            <span class="bg-borderColor group-[.active]:bg-activeBorderColor w-[50px] h-1 mr-4"></span>
            <h4 class="grow text-right">
              {{ formatDate(experience.positions[experience.positions.length - 1].startDate) }}-{{
                formatDate(experience.positions[experience.positions.length - 1].endDate)
              }}
            </h4>
          </div>
          <h3 class="block text-sm md:text-xl font-semibold">
            {{ experience.positions[0].title }}
            <a
              :href="experience.company.website"
              class="uppercase text-textColor font-semibold group-[.active]:text-textActiveColor"
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
            <ul class="flex flex-wrap gap-x-5">
              <li
                v-for="(skill, index) in experience.positions[0].skills"
                class="inline pipe"
                :key="index"
              >
                {{ skill.name }}
              </li>
            </ul>
          </div>
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
.bordered {
  @apply bg-borderColor;
  clip-path: polygon(30px 0%, 100% 0, 100% 100%, 0 100%, 0% 30px);
  overflow-y: visible;
}

.bordered::before {
  @apply bg-mainBgColor;
  position: absolute;
  clip-path: polygon(30px 0%, 100% 0, 100% 100%, 0 100%, 0% 30px);
  content: '';
  z-index: -4;
  top: 1px;
  bottom: 1px;
  left: 1px;
  right: 1px;
}
</style>
