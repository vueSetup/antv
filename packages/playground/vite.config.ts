import { loadEnv, searchForWorkspaceRoot, type ConfigEnv, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'path'

const shape = ['rect', 'line', 'text', 'circle', 'marker', 'group']

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE_URL,
    define: {
      'process.env.BASE_URL': JSON.stringify(env.VITE_BASE_URL)
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    plugins: [
      vue(),
      vueJsx({
        isCustomElement: (tagName: string) =>
          ['group', 'rect', 'circle', 'line', 'polygon', 'polyline', 'arc', 'sector', 'text', 'custom', 'marker', 'image'].includes(tagName)
      })],
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
