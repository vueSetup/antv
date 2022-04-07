import { defineComponent, watchEffect, inject } from 'vue-demi'
import { ScrollBar, withScrollBar, ScrollBarView, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        field: String
    },
    setup(props) {
        watchEffect(() => {
            const component = jsx(ScrollBar, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withScrollBar, ScrollBarView }
