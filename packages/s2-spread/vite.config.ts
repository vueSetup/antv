import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { getThemeVariables } from "ant-design-vue/dist/theme"
import { join } from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^micro-app/.test(tag),
        },
      },
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          // https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
          ...getThemeVariables(),
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://11.11.160.93:51003", // 测试环境
        // target: "http://11.2.251.19:10001", // 任雨亭本地
        // target: "https://group-jsc.dw.cnpc.com.cn",   // 生产环境 hosts: 11.11.237.224    group-jsc.dw.cnpc.com.cn
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
