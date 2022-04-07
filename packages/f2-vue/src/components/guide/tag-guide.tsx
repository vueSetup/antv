import { defineComponent, watchEffect, inject } from 'vue-demi'
import { TagGuide, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../../context'

export default defineComponent({
    props: {
        records: Array,
        onClick: Function,
        content: String,
        attrs: Object,
        offsetX: Number,
        offsetY: Number
    },
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
