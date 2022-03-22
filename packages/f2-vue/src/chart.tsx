import { defineComponent, watchEffect, provide, inject, type PropType } from 'vue'
import { jsxs } from '@antv/f2/jsx-runtime'
import { Chart } from '@antv/f2'
import { Props as ChartProps } from '@antv/f2/es/chart'
import { canvasContextKey, type CanvasContext } from './context'

export default defineComponent({
    props: {
        data: Array as PropType<Record<string, any>[]>,
        coord: Object
    },
    setup(props, { slots }) {
        const context: CanvasContext = {
            children: [],
            push: (component: JSX.Element) => {
                context.children.push(component)
            }
        }
        provide(canvasContextKey, context)

        watchEffect(() => {
            const component = jsxs(Chart, { ...props, children: context.children })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })

        return () => <>{slots.default?.()}</>
    }
})
