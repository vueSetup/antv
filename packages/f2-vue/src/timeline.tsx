import { defineComponent, watchEffect, provide, inject, type PropType } from 'vue-demi'
import { jsxs } from '@antv/f2/jsx-runtime'
import { Timeline } from '@antv/f2'
import { Props as ChartProps } from '@antv/f2/es/chart'
import { canvasContextKey, type CanvasContext } from './context'

export default defineComponent({
    props: {
        loop: Boolean,
        delay: Number
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
            const component = jsxs(Timeline, { ...props, children: context.children })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })

        return () => <>{slots.default?.()}</>
    }
})
