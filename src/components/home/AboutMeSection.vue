<template>
  <section>
    <h2
      class="transition"
      id="about-section"
    >
      About
    </h2>
    <div
      class="text-2xl font-roboto text-secondaryTextColor transition from:opacity-0 duration-1000 delay-500 max-w-3xl mx-auto flex flex-col gap-5"
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
      <ul class="grid grid-flow-row grid-cols-2 md:grid-cols-3 font-sans text-sm xs:text-lg sm:text-xl">
        <li
          v-for="(skill, index) in recentSkills"
          :key="index"
          class="flex items-center gap-2 text-secondaryColor font-semibold"
        >
          <CodeBracketIcon class="h-4 md:h-6" /> {{ skill }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CodeBracketIcon } from '@heroicons/vue/24/outline'

//TODO: get from DB
const careerStartDate = new Date(2011, 12)

const experienceLengthInYears = computed(() => {
  return new Date().getFullYear() - careerStartDate.getFullYear()
})

const recentSkills = [
  'C#',
  'Avalonia UI',
  '.NET MAUI',
  'Xamarin',
  'Uno Platform',
  'Vue.js',
  'Node.js',
  'Capacitor',
  'TypeScript',
  'JavaScript',
  'TailwindCSS',
  'MongoDB',
]
</script>

<style scoped></style>
