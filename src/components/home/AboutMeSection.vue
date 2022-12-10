<template>
  <section class="flex flex-col justify-center">
    <h2
      class="transition text-left"
      id="about-section"
    >
      About
    </h2>
    <div
      class="flex flex-col text-sm md:text-lg font-roboto transition from:opacity-0 from:translate-x-5 duration-1000 delay-500 max-w-3xl mx-auto gap-5"
    >
      <p>
        I&#39;m a software developer based in the Philippines. I work with agencies, startups, and businesses of all
        sizes to help them build better products. I&#39;ve been working in software development for over
        {{ experienceLengthInYears }} years now, and have had the opportunity to work with some amazing people and
        incredible projects along the way.
      </p>
      <p>
        In recent years I&#39;ve been focusing more on helping startups and small businesses build products that run on
        web browsers, desktops, and mobile devices. This has involved everything from front-end development to back-end
        coding and system administration.
      </p>
      <p>
        I&#39;m comfortable with a wide range of technologies, but here are some of the ones I&#39;ve used most
        recently:
      </p>
      <ul class="flex flex-wrap font-sans text-lg md:text-3xl gap-2">
        <li
          v-for="(skill, index) in recentSkills"
          :key="index"
          class="flex items-center font-black uppercase"
        >
          {{ skill.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSkillStore } from '@/stores/skill/skill-store'
import type { ISkillModel } from '@/stores/skill/skill-model'

//TODO: get from DB
const careerStartDate = new Date(2011, 12)

const experienceLengthInYears = computed(() => {
  return new Date().getFullYear() - careerStartDate.getFullYear()
})

const recentSkills = useSkillStore().skills?.getAllSkills.filter((skill: ISkillModel) => skill.isRecent)
</script>

<style scoped>
li:nth-child(even) {
  color: transparent;
  -webkit-text-stroke: 1px #cdcdcd;
}
</style>
