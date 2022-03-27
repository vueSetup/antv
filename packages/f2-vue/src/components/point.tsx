import { defineComponent, watchEffect, inject } from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Point, withPoint, PointView } from '@antv/f2'
import { AxisProps } from '@antv/f2/es/components/axis/types'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        x: String,
        y: String,
        color: String,
        field: String
    },
    setup(props) {
        watchEffect(() => {
            const component = jsx(Point, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withPoint, PointView }
