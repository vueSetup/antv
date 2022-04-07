import { defineComponent, watchEffect, inject } from 'vue-demi'
import { TextGuide, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../../context'

export default defineComponent({
    setup(props) {
        watchEffect(() => {
            const component = jsx(TextGuide, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})
