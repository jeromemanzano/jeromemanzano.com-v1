<template>
  <menu class="hidden fixed md:flex justify-center w-28 z-50">
    <nav class="absolute left-0 right-0 grid mt-10 ml-2 text-xs lg:text-lg gap-2">
      <GlitchButton
        text="About"
        class="transition from:opacity-0 from:-translate-x-5 delay-[2000ms] duration-500"
        :href="'#about-section'"
        :active="currentSectionId === 'about-section'"
      />
      <GlitchButton
        text="Experiences"
        class="transition from:opacity-0 from:-translate-x-5 delay-[2100ms] duration-500"
        :href="'#experiences-section'"
        :active="currentSectionId === 'experiences-section'"
      />
      <GlitchButton
        text="Contact"
        class="transition from:opacity-0 from:-translate-x-5 delay-[2300ms] duration-500"
        :href="'#contact-section'"
        :active="currentSectionId === 'contact-section'"
      />
      <GlitchButton
        text="Resume"
        class="transition from:opacity-0 from:-translate-x-5 delay-[2400ms] duration-500"
        :href="'/resume.pdf'"
      />
    </nav>
    <ul
      v-if="currentSectionId !== 'contact-section'"
      class="grid py-2 text-2xl gap-3 lg:gap-5 fixed h-100px bottom-[20%]"
    >
      <li class="transition from:-translate-x-5 from:opacity-0 delay-[2600ms] duration-500">
        <a
          :href="profile.linkedInUrl"
          aria-label="LinkedIn"
          rel="noopener noreferrer"
          class="hover:drop-shadow-[-5px_0.5px_0_rgba(0,240,255,1)] text-textColor"
          target="_blank"
        >
          <font-awesome-icon
            icon="fa-brands fa-linkedin-in"
            class="text-3xl lg:text-5xl hover:translate-x-0.5 hover:-translate-y-0.5"
          />
        </a>
      </li>
      <li class="transition from:-translate-x-5 from:opacity-0 delay-[2700ms] duration-500">
        <a
          :href="profile.githubUrl"
          aria-label="Github"
          rel="noopener noreferrer"
          target="_blank"
          class="hover:drop-shadow-[-5px_0.5px_0_rgba(0,240,255,1)] text-textColor"
          ><font-awesome-icon
            icon="fa-brands fa-github"
            class="text-3xl 0 lg:text-5xl hover:translate-x-0.5 hover:-translate-y-0.5"
        /></a>
      </li>
      <li class="transition from:-translate-x-5 from:opacity-0 delay-[2800ms] duration-500">
        <a
          :href="profile.emailUrl"
          aria-label="Email"
          rel="noopener noreferrer"
          target="_blank"
          class="hover:drop-shadow-[-5px_0.5px_0_rgba(0,240,255,1)] text-textColor"
          ><font-awesome-icon
            icon="fa-solid fa-envelope"
            class="text-3xl lg:text-5xl hover:translate-x-0.5 hover:-translate-y-0.5"
        /></a>
      </li>
    </ul>
  </menu>

  <div class="sm:mx-32">
    <WelcomeSection />
    <AboutMeSection class="md:h-screen" />
    <ExperiencesSection />
    <ContactSection />
  </div>
  <footer class="bg-contentBgColor text-contentTextColor absolute bottom-0 left-0 right-0">
    <ul class="flex py-2 justify-center text-2xl gap-2">
      <li>
        <a
          :href="profile.linkedInUrl"
          aria-label="LinkedIn"
          rel="noopener noreferrer"
          target="_blank"
          class="px-4 py-2 neon"
        >
          <font-awesome-icon
            icon="fa-solid fa-arrow-right"
            class="hidden md:inline mr-2"
          />

          <span class="hidden md:inline uppercase">LinkedIn</span>
          <font-awesome-icon
            class="md:hidden"
            icon=" fa-brands fa-linkedin-in"
          />
        </a>
      </li>
      <li>
        <a
          :href="profile.githubUrl"
          aria-label="Github"
          class="px-4 py-2 neon"
          rel="noopener noreferrer"
          target="_blank"
        >
          <font-awesome-icon
            icon="fa-solid fa-arrow-right"
            class="hidden md:inline mr-2" />

          <span class="hidden md:inline uppercase">Github</span>
          <font-awesome-icon
            class="md:hidden"
            icon="fa-brands fa-github"
        /></a>
      </li>
      <li>
        <a
          aria-label="Resume"
          class="px-4 py-2 neon"
          rel="noopener noreferrer"
          target="_blank"
          href="/resume.pdf"
        >
          <font-awesome-icon
            icon="fa-solid fa-arrow-right"
            class="mr-2 uppercase"
          /><span class="uppercase">Resume</span></a
        >
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
import WelcomeSection from '@/components/home/WelcomeSection.vue'
import ExperiencesSection from '@/components/home/ExperiencesSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import AboutMeSection from '@/components/home/AboutMeSection.vue'
import GlitchButton from '@/components/GlitchButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, onMounted, onUnmounted } from 'vue'
import { useProfileStore } from '@/stores/profile-store'

const profile = useProfileStore()
const from = 'from'
const currentSectionId = ref<string | null>(null)

const transitionIntersectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(element => {
      if (element.isIntersecting) {
        element.target.classList.remove(from)
      }
    })
  },
  { rootMargin: '0px 0px -10% 0px' }
)

const transitionGroupMutationObserver = new MutationObserver(entries => {
  entries.forEach(element => {
    element.addedNodes.forEach(node => {
      const el = node as Element

      if (el?.classList.contains('transition') ?? false) {
        el.classList.add(from)
        transitionIntersectionObserver.observe(el)
      }
    })
  })
})

const headerIntersectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(element => {
      if (element.isIntersecting) {
        currentSectionId.value = element.target.getAttribute('id')
      }
    })
  },
  { rootMargin: '0px 0px -40% 0px' }
)

onMounted(() => {
  const transitionElements = document.querySelectorAll('.transition')
  transitionElements.forEach(element => {
    element.classList.add(from)
    transitionIntersectionObserver.observe(element)
  })

  const transitionGroups = document.querySelectorAll('.transition-group')
  transitionGroups.forEach(element => {
    transitionGroupMutationObserver.observe(element, {
      childList: true,
    })
  })

  const headerElements = document.querySelectorAll('section h2, section h1')
  headerElements.forEach(element => {
    element.classList.add(from)
    headerIntersectionObserver.observe(element)
  })
})

onUnmounted(() => {
  transitionIntersectionObserver.disconnect()
  transitionGroupMutationObserver.disconnect()
  headerIntersectionObserver.disconnect()
})
</script>

<style scoped>
.neon:hover {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #00f0ff, 0 0 82px #00f0ff, 0 0 92px #00f0ff,
    0 0 102px #00f0ff, 0 0 151px #00f0ff;
  animation: pulsate 1.5s infinite alternate;
}

@keyframes pulsate {
  100% {
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #00f0ff, 0 0 80px #00f0ff, 0 0 90px #00f0ff,
      0 0 100px #00f0ff, 0 0 150px #00f0ff;
  }

  0% {
    text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px #00f0ff, 0 0 45px #00f0ff, 0 0 55px #00f0ff,
      0 0 70px #00f0ff, 0 0 80px #00f0ff;
  }
}
</style>
