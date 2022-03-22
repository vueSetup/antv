import { defineComponent, watchEffect, inject } from 'vue'
import { jsx } from '@antv/f2/jsx-runtime'
import { LineGuide } from '@antv/f2'
import { LegendProps } from '@antv/f2/es/components/legend/withLegend'
import { canvasContextKey, type CanvasContext } from '../../context'

export default defineComponent({
    setup(props) {
        watchEffect(() => {
            const component = jsx(LineGuide, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})
