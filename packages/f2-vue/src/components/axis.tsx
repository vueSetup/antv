import { defineComponent, watchEffect, inject } from 'vue'
import { jsx } from '@antv/f2/jsx-runtime'
import { Axis } from '@antv/f2'
import { AxisProps } from '@antv/f2/es/components/axis/types'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        field: String
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
