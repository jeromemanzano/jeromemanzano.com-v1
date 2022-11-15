import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import HomeView from '@/views/HomeView.vue'
import SkillEditTabItem from '@/components/skill/SkillEditTabItem.vue'
import CompanyEditTabItem from '@/components/company/CompanyEditTabItem.vue'
import ExperienceEditTabItem from '@/components/experience/ExperienceEditTabItem.vue'

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
      children: [
        { path: 'skills', component: SkillEditTabItem },
        { path: 'companies', component: CompanyEditTabItem },
        { path: 'experiences', component: ExperienceEditTabItem },
      ],
    },
  ],
})

export default router
