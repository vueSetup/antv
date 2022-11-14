import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import { join } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => /^micro-app/.test(tag),
        },
      },
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
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
});
