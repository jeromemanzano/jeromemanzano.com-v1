<template>
  <header class="absolute w-full top-0 flex flex-col z-50 items-end">
    <nav>
      <ol class="flex justify-end items-center uppercase p-4 text-secondaryTextColor">
        <li class="hidden sm:block transition from:opacity-0 from:translate-y-5 delay-[1s] duration-500">
          <router-link
            class="hover:text-secondaryColor border-b-[1px] hover:border-activeBorderColor border-b-mainBgColor p-3"
            to="/admin/skills"
            >Skills</router-link
          >
        </li>
        <li class="hidden sm:block transition from:opacity-0 from:translate-y-5 delay-[1.2s] duration-500 mr-2">
          <router-link
            class="hover:text-secondaryColor border-b-[1px] hover:border-activeBorderColor border-b-mainBgColor p-3"
            to="/admin/companies"
            >Companies</router-link
          >
        </li>
        <li class="hidden sm:block transition from:opacity-0 from:translate-y-5 delay-[1.2s] duration-500 mr-2">
          <router-link
            class="hover:text-secondaryColor border-b-[1px] hover:border-activeBorderColor border-b-mainBgColor p-3"
            to="/admin/experiences"
            >Experiences</router-link
          >
        </li>
        <li class="overflow-hidden py-3 transition from:opacity-0 from:translate-y-5 delay-[1.4s] duration-500">
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
        </li>
      </ol>
    </nav>

    <modal-component
      class="mx-2 p-5 bg-secondaryTextColor text-contentTextColor"
      v-show="showLogin"
      @close="showLogin = false"
    >
      <template v-slot:body>
        <admin-login
          @close="showLogin = false"
          class="flex-none"
        />
      </template>
    </modal-component>
  </header>

  <router-view class="sm:px-20 mx-auto mt-32"></router-view>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/ModalComponent.vue'
import AdminLogin from '@/components/AdminLogin.vue'
import { useAuthStore } from '@/stores/auth-store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const authStore = useAuthStore()

const showLogin = ref(false)
</script>

<style scoped>
.router-link-exact-active {
  @apply text-secondaryColor;
}
</style>
