import { defineComponent, watchEffect, inject } from 'vue'
import { jsx } from '@antv/f2/jsx-runtime'
import { Interval } from '@antv/f2'
import { GeometryProps } from '@antv/f2/es/components/geometry/interface'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        x: String,
        y: String,
        color: String,
        adjust: [String, Object]
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
