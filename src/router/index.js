import { createRouter, createWebHistory } from 'vue-router'
import VoteView from '../views/VoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vote',
      name: 'vote',
      component: VoteView,
    },
  ],
})

export default router
