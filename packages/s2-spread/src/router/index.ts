import { createRouter, createWebHistory } from 'vue-router'
import { BasicLayout, BlankLayout } from '@/layouts'
import { constantRouterMap as routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
