import { defineComponent, watchEffect, inject } from 'vue'
import { jsx } from '@antv/f2/jsx-runtime'
import { TextGuide } from '@antv/f2'
import { LegendProps } from '@antv/f2/es/components/legend/withLegend'
import { canvasContextKey, type CanvasContext } from '../../context'

export default defineComponent({
    setup(props) {
        watchEffect(() => {
            const component = jsx(TextGuide, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})
