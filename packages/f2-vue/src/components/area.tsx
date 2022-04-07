import { defineComponent, watchEffect, inject, type ExtractPropTypes } from 'vue-demi'
import { Area, withArea, AreaView, jsx } from '@antv/f2'
import { geometryProps } from './geometry'
import { canvasContextKey, type CanvasContext } from '../context'

export const areaProps = {
    ...geometryProps,
    connectNulls: Boolean
}

export type AreaProps = ExtractPropTypes<typeof areaProps>

export default defineComponent({
    props: areaProps,
    setup(props) {
        watchEffect(() => {
            const component = jsx(Area, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withArea, AreaView }
