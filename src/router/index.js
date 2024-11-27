import { createRouter, createWebHistory } from 'vue-router'
import VoteView from '../views/VoteView.vue'
import LawsView from '../views/LawsView.vue'
import LogInView from '@/views/LogInView.vue'
import GovernmentView from '@/views/GovernmentView.vue'
import NewsView from '@/views/NewsView.vue'
import PartiesView from '@/views/PartiesView.vue'
import CourtsView from '@/views/CourtsView.vue'

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
    {
      path: '/government',
      name: 'Government',
      component: GovernmentView,
    },
    {
      path: '/news',
      name: 'News',
      component: NewsView,
    },
    {
      path: '/parties',
      name: 'Parties',
      component: PartiesView,
    },
    {
      path: '/courts',
      name: 'Courts',
      component: CourtsView,
    },
  ],
})

export default router
