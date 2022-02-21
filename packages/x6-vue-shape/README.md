> When using with [Vite](https://vitejs.dev), you will need to opt-out the pre-bundling to get `vue-demi` work properly by
>
> ```js
> // vite.config.js
> export default defineConfig({
>     optimizeDeps: {
>         exclude: ['vue-demi']
>     }
> })
> ```
