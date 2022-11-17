import { createApp } from "vue"
import store from "./store"
import router from "./router"

import Antdv from "ant-design-vue"
import "ant-design-vue/dist/antd.css"

import App from "./App.vue"

createApp(App).use(store).use(router).use(Antdv).mount("#app")
