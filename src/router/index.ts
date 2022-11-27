import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SkillEditTabItem from '@/components/skill/SkillEditTabItem.vue'
import CompanyEditTabItem from '@/components/company/CompanyEditTabItem.vue'
import ExperienceEditTabItem from '@/components/experience/ExperienceEditTabItem.vue'

// import { useAuthStore } from '@/stores/auth-store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/skills',
      component: AdminView,
      meta: {
        requiresAuth: true,
      },
      children: [
        { path: 'skills', component: SkillEditTabItem },
        { path: 'companies', component: CompanyEditTabItem },
        { path: 'experiences', component: ExperienceEditTabItem },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

router.beforeEach(async to => {
  if (to.name !== 'home') {
    return { name: 'home' }
  }

  // TODO: fix issues before enabling
  // const authStore = useAuthStore()
  // await authStore.init()

  // return

  // if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isLoggedIn) {
  //   return { name: 'login' }
  // }
})

export default router
