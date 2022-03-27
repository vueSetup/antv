import { ref } from 'vue'
import { Canvas, Chart } from '../../../../src'
import { Interval, Axis, Legend, Tooltip } from '../../../../src/components'
import { createContext, delay } from '../../../util'

const data = [
    { type: 'a', genre: 'Sports', sold: 5 },
    { type: 'a', genre: 'Strategy', sold: 10 },
    { type: 'a', genre: 'Action', sold: 20 },
    { type: 'a', genre: 'Shooter', sold: 20 },
    { type: 'a', genre: 'Other', sold: 40 },
    { type: 'b', genre: 'Sports', sold: 5 },
    { type: 'b', genre: 'Strategy', sold: 10 },
    { type: 'b', genre: 'Action', sold: 20 },
    { type: 'b', genre: 'Shooter', sold: 20 },
    { type: 'b', genre: 'Other', sold: 40 }
]

describe('条形图', () => {
    it('基础条形图', async () => {
        const chartRef = ref(null)
        const App = (
            <Canvas pixelRatio={1}>
                <Chart data={data} coord={{ transposed: true }}>
                    <Interval x="genre" y="sold" color="type" />
                </Chart>
            </Canvas>
        )

        const context = createContext(App)
        await delay(1000)
        expect(context).toMatchImageSnapshot()
    })

    it('基础条形图-转置+设置固定size', async () => {
        const chartRef = ref(null)
        const App = (
            <Canvas pixelRatio={1}>
                <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
                    <Interval x="genre" y="sold" color="type" />
                </Chart>
            </Canvas>
        )

        const context = createContext(App)
        await delay(1000)
        expect(context).toMatchImageSnapshot()
    })

    it('分组条形图', async () => {
        const chartRef = ref(null)
        const App = (
            <Canvas pixelRatio={1}>
                <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
                    <Interval x="genre" y="sold" color="type" adjust="dodge" />
                </Chart>
            </Canvas>
        )

        const context = createContext(App)
        await delay(1000)
        expect(context).toMatchImageSnapshot()
    })

    it('堆叠条形图', async () => {
        const chartRef = ref(null)
        const App = (
            <Canvas pixelRatio={1}>
                <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
                    <Interval x="genre" y="sold" color="type" adjust="stack" />
                </Chart>
            </Canvas>
        )

        const context = createContext(App)
        await delay(1000)
        expect(context).toMatchImageSnapshot()
    })
})
