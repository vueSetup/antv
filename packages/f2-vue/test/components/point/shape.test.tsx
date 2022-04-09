import { Canvas, Chart, Point, Axis } from '../../../src'
import { createContext, delay } from '../../util'

const data = [
    {
        day: '周一',
        value: 300
    },
    {
        day: '周二',
        value: 400
    },
    {
        day: '周三',
        value: 350
    },
    {
        day: '周四',
        value: 500
    },
    {
        day: '周五',
        value: 490
    },
    {
        day: '周六',
        value: 600
    },
    {
        day: '周日',
        value: 900
    }
]

describe('shape 类型', () => {
    it('default', async () => {
        const App = (
            <Canvas pixelRatio={1} animate={false}>
                <Chart data={data}>
                    <Point x="day" y="value" />
                </Chart>
            </Canvas>
        )

        const context = createContext(App)

        await delay(100)
        expect(context).toMatchImageSnapshot()
    })
    it('hollowCircle', async () => {
        const App = (
            <Canvas pixelRatio={1} animate={false}>
                <Chart data={data}>
                    <Point x="day" y="value" shape="hollowCircle" />
                </Chart>
            </Canvas>
        )

        const context = createContext(App)

        await delay(100)
        expect(context).toMatchImageSnapshot()
    })

    it('rect', async () => {
        const App = (
            <Canvas pixelRatio={1} animate={false}>
                <Chart data={data}>
                    <Point x="day" y="value" shape="rect" />
                </Chart>
            </Canvas>
        )

        const context = createContext(App)

        await delay(100)
        expect(context).toMatchImageSnapshot()
    })
})
