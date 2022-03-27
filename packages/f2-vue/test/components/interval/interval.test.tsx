import { ref } from 'vue'
import { Canvas, Chart, Interval, Axis } from '../../../src'
import { createContext, delay } from '../../util'
const context = createContext()

const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: -110 }
]

describe('Interval', () => {
    it('render', async () => {
        const ref = {}
        const App = (
            <Canvas pixelRatio={1}>
                <Chart data={data}>
                    <Axis field="genre" />
                    <Axis field="sold" min={0} />
                    <Interval
                        // ref={ ref }
                        x="genre"
                        y="sold"
                        color="genre"
                        // onPress={ (ev) => {
                        //   const { points, geometry } = ev || {};
                        //   const point = points[0];
                        //   const records = geometry.getSnapRecords(point);
                        //   console.log(records);
                        // } }
                    />
                    {/* <Tooltip geometryRef={ ref } records={ [{ x: 179.5, y: 280 }] } /> */}
                </Chart>
            </Canvas>
        )

        const context = createContext(App)
        await delay(1000)
        expect(context).toMatchImageSnapshot()
    })

    it('startOnZero', async () => {
        const App = (
            <Canvas pixelRatio={1}>
                <Chart data={data}>
                    <Axis field="genre" />
                    <Axis field="sold" min={0} />
                    <Interval startOnZero={false} x="genre" y="sold" color="genre" />
                </Chart>
            </Canvas>
        )
        const context = createContext(App)
        await delay(1000)
        expect(context).toMatchImageSnapshot()
    })

    it('x scale 为 timeCat', () => {
        const data = [
            {
                time: '2016-08-08 00:00:00',
                tem: 10
            },
            {
                time: '2016-08-08 00:10:00',
                tem: 22
            },
            {
                time: '2016-08-08 00:30:00',
                tem: 20
            },
            {
                time: '2016-08-09 00:35:00',
                tem: 26
            },
            {
                time: '2016-08-09 01:00:00',
                tem: 20
            }
        ]
        const chartRef = ref(null)
        const { offsetWidth } = document.body
        const height = offsetWidth * 0.75
        const App = (
            <Canvas pixelRatio={1} width={offsetWidth} height={height}>
                <Chart
                    ref={chartRef}
                    data={data}
                    scale={{
                        time: {
                            type: 'timeCat',
                            tickCount: 3
                        },
                        tem: {
                            tickCount: 5
                        }
                    }}
                >
                    <Axis field="time" />
                    <Axis field="tem" />
                    <Interval x="time" y="tem" />
                </Chart>
            </Canvas>
        )
        const context = createContext(App)

        const timeScale = chartRef.value.scale.getScale('time')
        const { range } = timeScale
        expect(range[0]).toBeGreaterThan(0)
        expect(range[1]).toBeLessThan(1)
    })
})
