// 对比折线图-虚实线对比
import { defineComponent, ref } from 'vue'
import { Canvas, Chart, Axis, Line, Rect } from '@antv/f2-vue'

const data = [
    {
        time: '2016-08-08 00:00:00',
        value: 10,
        type: '预期收益率'
    },
    {
        time: '2016-08-08 00:10:00',
        value: 22,
        type: '预期收益率'
    },
    {
        time: '2016-08-08 00:30:00',
        value: 16,
        type: '预期收益率'
    },
    {
        time: '2016-08-09 00:35:00',
        value: 26,
        type: '预期收益率'
    },
    {
        time: '2016-08-09 01:00:00',
        value: 12,
        type: '预期收益率'
    },
    {
        time: '2016-08-09 01:20:00',
        value: 26,
        type: '预期收益率'
    },
    {
        time: '2016-08-10 01:40:00',
        value: 18,
        type: '预期收益率'
    },
    {
        time: '2016-08-10 02:00:00',
        value: 26,
        type: '预期收益率'
    },
    {
        time: '2016-08-10 02:20:00',
        value: 12,
        type: '预期收益率'
    },
    {
        time: '2016-08-08 00:00:00',
        value: 4,
        type: '实际收益率'
    },
    {
        time: '2016-08-08 00:10:00',
        value: 3,
        type: '实际收益率'
    },
    {
        time: '2016-08-08 00:30:00',
        value: 6,
        type: '实际收益率'
    },
    {
        time: '2016-08-09 00:35:00',
        value: -12,
        type: '实际收益率'
    },
    {
        time: '2016-08-09 01:00:00',
        value: 1,
        type: '实际收益率'
    },
    {
        time: '2016-08-09 01:20:00',
        value: 9,
        type: '实际收益率'
    },
    {
        time: '2016-08-10 01:40:00',
        value: 13,
        type: '实际收益率'
    },
    {
        time: '2016-08-10 02:00:00',
        value: -3,
        type: '实际收益率'
    },
    {
        time: '2016-08-10 02:20:00',
        value: 11,
        type: '实际收益率'
    }
]
//issue:莫名其妙的标红
export default defineComponent({
    setup() {
        const chartRef = ref(null)
        const lineRef = ref(null)
        return () => (
            <Canvas pixelRatio={1}>
                <Chart
                    ref={chartRef}
                    data={data}
                    coord={{
                        type: Rect
                    }}
                    scale={{
                        time: {
                            type: 'timeCat',
                            mask: 'hh:mm',
                            range: [0, 1]
                        },
                        value: {
                            formatter: (value) => `${value}%`
                        }
                    }}
                >
                    <Axis
                        field="time"
                        tickCount={3}
                        style={{
                            label: {
                                // align 默认值为 center，可能会导致首尾 tick label 超出画布范围
                                align: 'between'
                            }
                        }}
                    />
                    <Axis field="value" tickCount={3} />
                    <Line
                        ref={lineRef}
                        x="time"
                        y="value"
                        lineWidth="4px"
                        shape={{
                            field: 'type',
                            callback: (type) => {
                                if (type === '预期收益率') {
                                    return 'line'
                                }
                                if (type === '实际收益率') {
                                    return 'dash'
                                }
                            }
                        }}
                        color="type"
                    />
                </Chart>
            </Canvas>
        )
    }
})