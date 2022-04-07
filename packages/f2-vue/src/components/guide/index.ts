import { defineComponent, watchEffect, inject } from 'vue-demi'
import type { PropType, CSSProperties, ExtractPropTypes } from 'vue-demi'
import { Guide, withGuide, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../../context'

export const guideProps = {
    records: Array as PropType<Record<string, any>[]>,
    style: Object as PropType<CSSProperties>
}

export type GuideProps = ExtractPropTypes<typeof guideProps>

export default defineComponent({
    props: guideProps,
    setup(props) {
        watchEffect(() => {
            const component = jsx(Guide, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => { }
            })
            push(component)
        })
        return () => null
    }
})

export { withGuide }

export { default as TextGuide } from "./text-guide"
export { default as PointGuide } from "./point-guide"
export { default as ArcGuide } from "./arc-guide"
export { default as LineGuide } from "./line-guide"
export { default as RectGuide } from "./rect-guide"
export { default as ImageGuide } from "./image-guide"
export { default as TagGuide } from "./tag-guide"