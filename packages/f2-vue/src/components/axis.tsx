import {
    defineComponent,
    watchEffect,
    inject,
    type PropType,
    type ExtractPropTypes
} from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Chart, Axis, withAxis, AxisView } from '@antv/f2'
import Coord from '../coord'
import type { StyleProps } from '@antv/f2/es/components/axis/types'
import { canvasContextKey, type CanvasContext } from '../context'

export const axisProps = {
    field: String,
    position: String as PropType<'right' | 'left' | 'top' | 'bottom'>,
    visible: Boolean,
    style: Object as PropType<StyleProps>,
    zoomRange: Array,
    coord: Object as PropType<typeof Coord>,
    chart: Object as PropType<typeof Chart>
}

// import { AxisProps } from '@antv/f2/es/components/axis/types'
export type AxisProps = ExtractPropTypes<typeof axisProps>

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
