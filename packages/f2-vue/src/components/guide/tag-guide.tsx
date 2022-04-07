import { defineComponent, watchEffect, inject } from 'vue-demi'
import { TagGuide, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../../context'

export default defineComponent({
    setup(props) {
        watchEffect(() => {
            const component = jsx(TagGuide, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})
