import { defineComponent, watchEffect, inject } from 'vue-demi'
import { Sunburst, withSunburst, SunburstView, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        data: Array,
        coord: Object,
        color: Object,
        value: String
    },
    setup(props) {
        watchEffect(() => {
            const component = jsx(Sunburst, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withSunburst, SunburstView }
