import {
  loadEnv,
  searchForWorkspaceRoot,
  type ConfigEnv,
  type UserConfig,
} from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { join } from "node:path"

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())

  return {
    optimizeDeps: {
      exclude: ["vue-demi"],
    },
    plugins: [
      vue(),
      vueJsx({
        isCustomElement: (tagName: string) => ["group"].includes(tagName),
      }),
    ],
    resolve: {
      alias: {
        "@": join(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd())],
      },
      proxy: {
        "/api": {
          target: "http://11.11.160.192:48810",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
}
