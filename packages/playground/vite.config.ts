import { defineConfig, } from 'vite'
import type { ConfigEnv, UserConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [vue(), vuejsx()],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        }
      }
    }
  }
}
