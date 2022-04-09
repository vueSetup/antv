import { defineComponent, watchEffect, inject } from 'vue-demi'
import { Treemap, withTreemap, TreemapView, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        data: Array,
        coord: Object,
        color: Object,
        value: String,
        space: Number
    },
    setup(props) {
        watchEffect(() => {
            const component = jsx(Treemap, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withTreemap, TreemapView }
