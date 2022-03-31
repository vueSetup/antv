import { defineComponent, watchEffect, inject } from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Axis, withAxis, AxisView } from '@antv/f2'
import { AxisProps } from '@antv/f2/es/components/axis/types'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        field: String,
        min: Number,
        max: Number,
        tickCount: Number,
        style: Object,
        formatter: Function,
        visible: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        watchEffect(() => {
            const component = jsx(Axis, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withAxis, AxisView }
