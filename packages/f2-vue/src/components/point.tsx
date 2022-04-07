import { defineComponent, watchEffect, inject, type ExtractPropTypes } from 'vue-demi'
import { Point, withPoint, PointView, jsx } from '@antv/f2'
import { geometryProps } from './geometry'
import { canvasContextKey, type CanvasContext } from '../context'

export const pointProps = {
    ...geometryProps
}

export type PointProps = ExtractPropTypes<typeof pointProps>

export default defineComponent({
    props: pointProps,
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
