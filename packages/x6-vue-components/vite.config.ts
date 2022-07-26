import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    preprocessorOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
        // modifyVars: {
        //   hack: `true; @import 'ant-design-vue/es/style/themes/default.less'`,
        // }
      },
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'ProLayout',
    },
    rollupOptions: {
      external: [
        'vue',
        '@ant-design/icons-vue',
        '@ant-design/icons-svg',
        'ant-design-vue',
        'moment',
        'vue-types',
      ],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps`
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          'ant-design-vue': 'antd',
          '@ant-design/icons-vue': 'iconsVue',
          '@ant-design/icons-svg': 'iconsSvg',
          'vue-types': 'vueTypes',
          moment: 'moment',
        },
      },
    },
  },
})
