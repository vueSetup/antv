import { defineComponent, watchEffect, inject, type ExtractPropTypes } from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Area, withArea, AreaView } from '@antv/f2'
import { geometryProps } from './geometry'
import { canvasContextKey, type CanvasContext } from '../context'

export const areaProps = {
    ...geometryProps,
    connectNulls: Boolean
}

export type AreaProps = ExtractPropTypes<typeof areaProps>

export default defineComponent({
<<<<<<< HEAD
    props: {
        x: String,
        y: String,
        color: [String, Array],
        adjust: [String,Object],
        shape: String,
        startOnZero: Boolean
    },
=======
    props: areaProps,
>>>>>>> f228fd4d0503fdd0a2ece613a146a45028c2bc30
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
