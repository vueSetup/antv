import { defineComponent, ref } from 'vue'
import Canvas from '@antv/f2-vue'
import { Chart, Axis, Line, Point } from '@antv/f2'

const data = [
    {
        date: '2017-06-05',
        value: 11.6,
        tag: 0
    },
    {
        date: '2017-06-06',
        value: 12.9,
        tag: 0
    },
    {
        date: '2017-06-07',
        value: 13.5,
        tag: 0
    },
    {
        date: '2017-06-08',
        value: 8.6,
        tag: 2
    },
    {
        date: '2017-06-09',
        value: 7.3,
        tag: 2
    },
    {
        date: '2017-06-10',
        value: 8.5,
        tag: 0
    },
    {
        date: '2017-06-11',
        value: 7.3,
        tag: 0
    },
    {
        date: '2017-06-12',
        value: 6.8,
        tag: 0
    },
    {
        date: '2017-06-13',
        value: 9.2,
        tag: 0
    },
    {
        date: '2017-06-14',
        value: 13.0,
        tag: 1
    },
    {
        date: '2017-06-15',
        value: 24.5,
        tag: 0
    },
    {
        date: '2017-06-16',
        value: 13,
        tag: 0
    },
    {
        date: '2017-06-17',
        value: 11.5,
        tag: 1
    },
    {
        date: '2017-06-18',
        value: 11.1,
        tag: 0
    },
    {
        date: '2017-06-19',
        value: 30.9,
        tag: 0
    },
    {
        date: '2017-06-20',
        value: 20.6,
        tag: 1
    },
    {
        date: '2017-06-21',
        value: 13.7,
        tag: 1
    },
    {
        date: '2017-06-22',
        value: 12.8,
        tag: 1
    },
    {
        date: '2017-06-23',
        value: 8.5,
        tag: 0
    },
    {
        date: '2017-06-24',
        value: 9.4,
        tag: 1
    },
    {
        date: '2017-06-25',
        value: 7.1,
        tag: 0
    },
    {
        date: '2017-06-26',
        value: 10.6,
        tag: 0
    },
    {
        date: '2017-06-27',
        value: 8.4,
        tag: 0
    },
    {
        date: '2017-06-28',
        value: 9.3,
        tag: 0
    },
    {
        date: '2017-06-29',
        value: 8.5,
        tag: 0
    },
    {
        date: '2017-06-30',
        value: 7.3,
        tag: 0
    }
]
//issue:point未描边
export default defineComponent({
    setup() {
        const chartRef = ref(null)
        const lineRef = ref(null)

        return () => (
            <Canvas pixelRatio={1}>
                <Chart
                    ref={chartRef.value}
                    data={data}
                    coord={{
                        type: Rect
                    }}
                    scale={{
                        date: {
                            type: 'timeCat',
                            tickCount: 3
                        },
                        value: {
                            tickCount: 5,
                            min: 0,
                            formatter: (val) => `${val.toFixed(2)}%`
                        },
                        tag: {
                            type: 'cat'
                        }
                    }}
                >
                    <Axis
                        field="date"
                        style={{
                            label: { align: 'between' }
                        }}
                    />
                    <Axis field="value" />
                    <Line ref={lineRef} x="date" y="value" lineWidth="4px" />
                    <Point
                        x="date"
                        y="value"
                        size={{
                            field: 'tag',
                            callback: (val) => (val ? 3 : 0)
                        }}
                        color={{
                            field: 'tag',
                            callback: (val) => (val === 2 ? '#518DFE' : '#F35833')
                        }}
                    />
                </Chart>
            </Canvas>
        )
    }
})
