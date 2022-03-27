import { defineComponent, watchEffect, inject } from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Interval, withInterval, IntervalView } from '@antv/f2'
import { GeometryProps } from '@antv/f2/es/components/geometry/interface'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        x: String,
        y: String,
        color: [String, Object],
        adjust: [String, Object],
        startOnZero: Boolean
    },
    setup(props) {
        watchEffect(() => {
            const component = jsx(Interval, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withInterval, IntervalView }
