import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import { babel } from '@rollup/plugin-babel'
import config from '../../configs/rollup-config'

export default {
    input: './src/index.ts',
    output: [
        {
            name: 'X6VueComponents',
            format: 'umd',
            file: 'dist/x6-vue-components.js',
            sourcemap: true,
            globals: {
                ['ant-design-vue']: 'AntDesignVue',
                vue: 'Vue'
            }
        }
    ],
    external: ['ant-design-vue', 'vue'],
    plugins: [
        babel({
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                ['@babel/preset-typescript', { allExtensions: true, isTSX: true }]
            ],
            plugins: ['@vue/babel-plugin-jsx']
        }),
        // typescript({ declaration: false }),
        resolve(),
        // commonjs(),
        // replace({
        //     preventAssignment: true,
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),
        // terser(),
        // filesize(),
        // postcss({
        //     minimize: true,
        //     sourceMap: false,
        //     extensions: ['.less', '.css'],
        //     use: [['less', { javascriptEnabled: true }]]
        // })
    ]
}
