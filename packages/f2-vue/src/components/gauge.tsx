import { defineComponent, watchEffect, inject } from 'vue'
import { jsx } from '@antv/f2/jsx-runtime'
import { Gauge, withGauge, GaugeView } from '@antv/f2'
import { LegendProps } from '@antv/f2/es/components/legend/withLegend'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    setup(props) {
        watchEffect(() => {
            const component = jsx(Gauge, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withGauge, GaugeView }
