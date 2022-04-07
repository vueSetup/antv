import { defineComponent, watchEffect, inject } from 'vue-demi'
import { PieLabel, withPieLabel, PieLabelView, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    setup(props) {
        watchEffect(() => {
            const component = jsx(PieLabel, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withPieLabel, PieLabelView }
