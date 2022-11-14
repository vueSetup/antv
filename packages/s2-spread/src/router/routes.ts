import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts'

export const constantRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/weclome',
    children: [
      {
        path: '/weclome',
        name: 'weclome',
        component: () => import(/* webpackChunkName: "daily" */ '@/views/weclome.vue'),
        meta: { title: '日计划' }
      }
    ]
  },
  {
    path: '/401',
    name: 'unauthorized',
    component: () =>
      import(/* webpackChunkName: "exception" */ '@/views/exception/401.vue')
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () =>
      import(/* webpackChunkName: "exception" */ '@/views/exception/403.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () =>
      import(/* webpackChunkName: "exception" */ '@/views/exception/404.vue')
  }
]
