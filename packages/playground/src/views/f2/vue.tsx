import { defineComponent } from 'vue'
import { Canvas, Chart, Interval, Axis, Tooltip, Legend, Timeline, Area, Line } from '@antv/f2-vue'

const data = [
    {
        month: 'Jan.',
        value: 6.06
    },
    {
        month: 'Feb.',
        value: 82.2
    },
    {
        month: 'Mar.',
        value: -22.11
    },
    {
        month: 'Apr.',
        value: 21.53
    },
    {
        month: 'May.',
        value: -21.74
    },
    {
        month: 'Jun.',
        value: 73.61
    },
    {
        month: 'Jul.',
        value: 53.75
    },
    {
        month: 'Aug.',
        value: 60.32
    }
]

export default defineComponent({
    setup() {
        return () => (
            <Canvas pixelRatio={1}>
                <Chart
                    data={data}
                    scale={{
                        month: {
                            range: [0, 1]
                        },
                        value: {
                            nice: false,
                            min: -100,
                            max: 100,
                            tickCount: 5
                        }
                    }}
                >
                    <Axis field="month" />
                    <Axis field="value" />
                    <Area x="month" y="value" startOnZero={true} />
                    <Line x="month" y="value" />
                </Chart>
            </Canvas>
        )
    }
})
