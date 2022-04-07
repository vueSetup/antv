import { defineComponent, watchEffect, inject } from 'vue-demi'
import { Gauge, withGauge, GaugeView, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        center: Object,
        startAngle: Number,
        endAngle: Number,
        percent: Number,
        r: String,
        tickCount: Number,
        tickOffset: String,
        tickLength: String
    },
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
