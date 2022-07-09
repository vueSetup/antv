import { defineComponent, ref } from 'vue'
import Canvas from '@antv/f2-vue'
import { Chart, Axis, Line } from '@antv/f2'

const data = [
    {
        day: 'Mon',
        value: 300
    },
    {
        day: 'Tue',
        value: 400
    },
    {
        day: 'Wed',
        value: null
    },
    {
        day: 'Thu',
        value: 500
    },
    {
        day: 'Fri',
        value: 490
    },
    {
        day: 'Sat',
        value: 600
    },
    {
        day: 'Sun',
        value: 900
    }
]
// issues:空值未连接
export default defineComponent({
    setup() {
        const lineRef = ref(null)
        return () => (
            <Canvas pixelRatio={1}>
                <Chart data={data}>
                    <Axis field="day" />
                    <Axis field="value" />
                    <Line ref={lineRef} x="day" y="value" connectNulls />
                </Chart>
            </Canvas>
        )
    }
})
