import { defineComponent, watchEffect, inject } from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Zoom } from '@antv/f2'
import { LegendProps } from '@antv/f2/es/components/legend/withLegend'
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
