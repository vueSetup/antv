import { defineComponent, watchEffect, inject, type ExtractPropTypes } from 'vue-demi'
import { PointGuide, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../../context'

export const pointGuideProps = {
    offsetX: Number,
    offsetY: Number,
    records: Array,
    content: String,
    style: Object
}

export type PointGuideProps = ExtractPropTypes<typeof pointGuideProps>

export default defineComponent({
    props: pointGuideProps,
    setup(props) {
        watchEffect(() => {
            const component = jsx(PointGuide, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})
