<template>
  <header class="absolute w-full top-0 flex flex-col items-end">
    <nav class="flex sm:px-4">
      <button
        class="sm:hidden p-4"
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
              class="flex flex-col sm:flex-none gap-6 sm:flex-row items-start sm:items-center justify-center uppercase py-4 text-secondaryTextColor"
            >
              <li class="block transition from:opacity-0 from:translate-y-5 delay-[1s] duration-500">
                <a
                  class="hover:text-secondaryColor border-b-[1px] hover:border-activeBorderColor border-b-transparent p-3"
                  href="/"
                  >Home</a
                >
              </li>
              <li class="block transition from:opacity-0 from:translate-y-5 delay-[1s] duration-500">
                <router-link
                  class="hover:text-secondaryColor border-b-[1px] hover:border-activeBorderColor border-b-transparent p-3"
                  to="/admin/skills"
                  >Skills</router-link
                >
              </li>
              <li class="block transition from:opacity-0 from:translate-y-5 delay-[1.2s] duration-500 mr-2">
                <router-link
                  class="hover:text-secondaryColor border-b-[1px] hover:border-activeBorderColor border-b-transparent p-3"
                  to="/admin/companies"
                  >Companies</router-link
                >
              </li>
              <li class="block transition from:opacity-0 from:translate-y-5 delay-[1.2s] duration-500 mr-2">
                <router-link
                  class="hover:text-secondaryColor border-b-[1px] hover:border-activeBorderColor border-b-transparent p-3"
                  to="/admin/experiences"
                  >Experiences</router-link
                >
              </li>
            </ol>
          </template>
          <template v-slot:footer>
            <admin-login
              ref="adminLogin"
              v-show="showLogin || showMenu"
              @close="showLogin = false"
              class="flex-none sm:absolute sm:top-20 sm:-right-5 sm:bg-[#292524] sm:p-6 sm:flex min-w-[250px] z-10"
            />
          </template>
        </navigation-menu>
      </Teleport>
      <div class="hidden sm:block overflow-hidden py-3">
        <button
          class="h-8 w-8 rounded-full overflow-hidden m-2"
          @click="showLogin = !showLogin"
        >
          <img
            v-if="authStore.user !== null"
            alt="User avatar"
            referrerpolicy="no-referrer"
            :src="authStore.user.photoURL || ''"
          />
          <font-awesome-icon
            icon="fa-solid fa-user"
            class="h-8 w-8"
            v-else
          />
        </button>
      </div>
    </nav>
  </header>
  <router-view class="sm:px-20 mx-auto mt-32"></router-view>
</template>

<script setup lang="ts">
import NavigationMenu from '@/components/NavigationMenu.vue'
import AdminLogin from '@/components/AdminLogin.vue'
import { useAuthStore } from '@/stores/auth-store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
const authStore = useAuthStore()

const adminLogin = ref(null)

const breakpoints = useBreakpoints(breakpointsTailwind)
breakpoints
const isDesktop = breakpoints.greater('sm')
const showMenu = ref(false)
const showLogin = ref(false)

onClickOutside(adminLogin, () => (showLogin.value = false))
</script>

<style scoped>
.router-link-exact-active {
  @apply text-secondaryColor;
}
</style>
