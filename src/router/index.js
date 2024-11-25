import { createRouter, createWebHistory } from 'vue-router'
import VoteView from '../views/VoteView.vue'
import LawsView from '../views/LawsView.vue'
import LogInView from '@/views/LogInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vote',
      name: 'vote',
      component: VoteView,
    },
    {
      path: '/laws',
      name: 'laws',
      component: LawsView,
    },
    {
      path: '/logIn',
      name: 'logIn',
      component: LogInView,
    },
  ],
})

export default router
