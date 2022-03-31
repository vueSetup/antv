import { Canvas, Chart } from '../../../src'
import { Interval, Legend, Axis } from '../../../src/components'
import { createContext, delay, gestureSimulator } from '../../util'

const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: -110 }
]

describe('Interval', () => {
    it('legend 点击', async () => {
        const App = (
            <Canvas pixelRatio={1}>
                <Chart data={data}>
                    <Legend />
                    <Axis field="genre" />
                    <Axis field="sold" />
                    <Interval x="genre" y="sold" color="genre" />
                </Chart>
            </Canvas>
        )

        const context = createContext(App)

        await delay(800)
        expect(context).toMatchImageSnapshot()

        await gestureSimulator(context.canvas, 'click', { x: 165, y: 26 })
        await delay(500)
        expect(context).toMatchImageSnapshot()

        await gestureSimulator(context.canvas, 'click', { x: 109, y: 24 })
        await delay(500)
        expect(context).toMatchImageSnapshot()

        await gestureSimulator(context.canvas, 'click', { x: 165, y: 26 })
        await delay(500)
        expect(context).toMatchImageSnapshot()
    })
})
