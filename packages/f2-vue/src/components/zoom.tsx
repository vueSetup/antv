import { defineComponent, watchEffect, inject } from 'vue-demi'
import { Zoom, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        showTooltipMarker: Boolean
    },
    setup(props) {
        watchEffect(() => {
            const component = jsx(Zoom, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})
