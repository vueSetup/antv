import type { RouteRecordRaw } from "vue-router"
import { BasicLayout } from "@/layouts"

export const constantRouterMap: RouteRecordRaw[] = [
  {
    path: "/",
    component: BasicLayout,
    redirect: "/weclome",
    children: [
      {
        path: "/weclome",
        name: "weclome",
        component: () =>
          import(/* webpackChunkName: "weclome" */ "@/views/tasks/list.vue"),
        meta: { title: "日计划" },
      },
      {
        path: "/table",
        name: "table",
        component: () =>
          import(/* webpackChunkName: "weclome" */ "@/views/table.vue"),
        meta: { title: "日计划" },
      },
      {
        path: "/pivot",
        name: "pivot",
        component: () =>
          import(/* webpackChunkName: "pivot" */ "@/views/pivot.vue"),
        meta: { title: "日计划" },
      },
      {
        path: "/tasks",
        name: "tasks",
        component: () =>
          import(/* webpackChunkName: "tasks" */ "@/views/tasks/list.vue"),
        meta: { title: "日计划" },
      },
      {
        path: "/tasks/form",
        name: "tasks/form",
        component: () =>
          import(/* webpackChunkName: "tasks" */ "@/views/tasks/form.vue"),
        meta: { title: "日计划" },
      },
    ],
  },
  {
    path: "/401",
    name: "unauthorized",
    component: () =>
      import(/* webpackChunkName: "exception" */ "@/views/exception/401.vue"),
  },
  {
    path: "/403",
    name: "forbidden",
    component: () =>
      import(/* webpackChunkName: "exception" */ "@/views/exception/403.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () =>
      import(/* webpackChunkName: "exception" */ "@/views/exception/404.vue"),
  },
]
