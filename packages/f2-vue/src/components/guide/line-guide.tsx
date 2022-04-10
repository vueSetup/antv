import { defineComponent, watchEffect, inject } from 'vue-demi'
import { LineGuide, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../../context'

export default defineComponent({
    props: {
        records: Array,
        onClick: Function,
        content: String,
        attrs: Object,
        offsetX: Number,
        offsetY: [Number, Array],
        style: Object
    },
    setup(props) {
        watchEffect(() => {
            const component = jsx(LineGuide, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => { }
            })
            push(component)
        })
        return () => null
    }
})
