import { defineComponent, watchEffect, inject } from 'vue'
import { jsx } from '@antv/f2/jsx-runtime'
import { Tooltip } from '@antv/f2'
import { LegendProps } from '@antv/f2/es/components/legend/withLegend'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        showTooltipMarker: Boolean
    },
    setup(props, { slots }) {
        watchEffect(() => {
            const component = jsx(Tooltip, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => <>{slots.default?.()}</>
    }
})
