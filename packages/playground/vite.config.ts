import { loadEnv, searchForWorkspaceRoot } from 'vite'
import type { ConfigEnv, UserConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'
import { join } from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE_URL,
    define: {
      'process.env.BASE_URL': JSON.stringify(env.VITE_BASE_URL)
    },
    plugins: [vue(), vuejsx()],
    resolve: {
      alias: {
        '@': join(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        }
      }
    },
    server: {
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd())
        ]
      },
      proxy: {
        '/api': {
          target: 'http://11.11.160.192:48810',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
      }
    }
  }
}
