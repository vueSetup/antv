import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "welcome" */ "@/views/welcome.vue"),
  },
  {
    path: "/ava",
    name: "ava",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/ava"),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
