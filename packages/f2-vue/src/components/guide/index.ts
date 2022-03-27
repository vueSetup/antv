import { defineComponent, watchEffect, inject } from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Guide, withGuide } from '@antv/f2'
import { LegendProps } from '@antv/f2/es/components/legend/withLegend'
import { canvasContextKey, type CanvasContext } from '../../context'

export default defineComponent({
    setup(props) {
        watchEffect(() => {
            const component = jsx(Guide, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
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