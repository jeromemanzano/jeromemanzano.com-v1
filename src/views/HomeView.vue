<template>
  <header class="block fixed top-0 left-0 w-full bg-mainBgColor z-10">
    <nav class="flex justify-end">
      <button
        class="sm:hidden p-4 self-end justify-end content-end items-end justify-items-end place-self-end"
        @click="showMenu = true"
      >
        <font-awesome-icon
          icon="fa-solid fa-bars"
          class="h-7 w-7"
        />
      </button>
      <Teleport
        to="#sideMenu"
        :disabled="isDesktop"
      >
        <navigation-menu
          v-show="showMenu || isDesktop"
          @close="showMenu = false"
          class="flex shrink-0"
        >
          <template v-slot:body>
            <ol
              class="flex flex-col justify-center gap-6 sm:gap-0 sm:flex-row sm:justify-end sm:items-center uppercase p-8 sm:p-4 text-secondaryTextColor"
            >
              <li class="block sm:transition from:opacity-0 from:translate-y-5 delay-[1s] duration-500">
                <a
                  class="hover:text-secondaryColor border-b-[1px] hover:border-activeBorderColor border-b-transparent py-3 sm:p-3"
                  :href="'#about-section'"
                  :class="{ 'text-secondaryColor': currentSectionId === 'about-section' }"
                  >About</a
                >
              </li>
              <li class="block sm:transition from:opacity-0 from:translate-y-5 delay-[1.2s] duration-500 mr-2">
                <a
                  class="hover:text-secondaryColor border-b-[1px] hover:border-activeBorderColor border-b-transparent py-3 sm:p-3"
                  :href="'#experiences-section'"
                  :class="{ 'text-secondaryColor': currentSectionId === 'experiences-section' }"
                  >Experience</a
                >
              </li>
              <li
                class="overflow-hidden py-3 sm:transition from:opacity-0 from:translate-y-5 delay-[1.4s] duration-500"
              >
                <a
                  class="border-[1px] border-borderColor text-textColor px-4 py-2 fill-hover before:content-['Download']"
                  :href="'https://www.jeromemanzano.com/resume.pdf'"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  >Resume</a
                >
              </li>
            </ol>
          </template>
        </navigation-menu>
      </Teleport>
    </nav>
  </header>

  <div class="sm:px-32 mx-auto">
    <WelcomeSection />
    <AboutMeSection class="min-h-screen" />
    <ExperiencesSection />
    <ContactSection />
  </div>
  <ul
    class="text-2xl sm:flex-col sm:items-stretch sm:justify-end sm:bottom-[10%] sm:top-0 sm:fixed flex text-secondaryTextColor absolute left-0 transition from:opacity-0 from:-translate-x-5 duration-500 sm:delay-[1.6s] w-full sm:w-auto justify-center bottom-12"
  >
    <li class="sm:mb-5">
      <a
        :href="profile.linkedInUrl"
        aria-label="LinkedIn"
        rel="noopener noreferrer"
        class="sm:border-[1px] border-borderColor sm:hover:text-contentTextColor p-2 sm:fill-hover"
        target="_blank"
      >
        <font-awesome-icon
          icon=" fa-brands fa-linkedin-in"
          class="w-[24px] h-[24px]"
        />
      </a>
    </li>
    <li>
      <a
        :href="profile.githubUrl"
        aria-label="Github"
        rel="noopener noreferrer"
        class="sm:border-[1px] border-borderColor sm:hover:text-contentTextColor p-2 sm:fill-hover"
        target="_blank"
      >
        <font-awesome-icon
          icon="fa-brands fa-github"
          class="w-[24px] h-[24px]"
      /></a>
    </li>
  </ul>
  <footer class="flex text-center justify-center absolute left-0 right-0 bottom-0 text-secondaryTextColor">
    <a
      href="https://github.com/jeromemanzano/jerome-manzano-website"
      aria-label="Website repository"
      rel="noopener noreferrer"
      target="_blank"
      class="py-4 uppercase"
    >
      jeromemanzano.com v1
    </a>
  </footer>
</template>

<script setup lang="ts">
import WelcomeSection from '@/components/home/WelcomeSection.vue'
import ExperiencesSection from '@/components/home/ExperiencesSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import AboutMeSection from '@/components/home/AboutMeSection.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, onMounted, onUnmounted } from 'vue'
import { useProfileStore } from '@/stores/profile-store'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import NavigationMenu from '@/components/NavigationMenu.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater('sm')
const showMenu = ref(false)

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
