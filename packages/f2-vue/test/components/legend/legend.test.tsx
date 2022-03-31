import { Canvas, Chart, Tooltip, Geometry, Interval } from '../../../src'
import { Line, Axis, Legend } from '../../../src/components'
import { createContext, delay } from '../../util'

const { offsetWidth } = document.body
const height = offsetWidth * 0.75

describe('图例', () => {
    describe('图例样式', () => {
        const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 }
        ]
        it('默认', async () => {
            const App = (
                <Canvas pixelRatio={1} height="70px">
                    <Chart data={data}>
                        <Legend />
                        <Geometry x="genre" y="sold" color="genre" />
                    </Chart>
                </Canvas>
            )

            const context = createContext(App)
            await delay(3000)
            expect(context).toMatchImageSnapshot()
        })

        it('自定义样式', async () => {
            const App = (
                <Canvas pixelRatio={1} height="70px">
                    <Chart data={data}>
                        <Legend
                            style={{
                                justifyContent: 'flex-start'
                            }}
                        />
                        <Geometry x="genre" y="sold" color="genre" />
                    </Chart>
                </Canvas>
            )

            const context = createContext(App)
            await delay(3000)
            expect(context).toMatchImageSnapshot()
        })

        it('多行', async () => {
            const data = [
                { genre: 'Sports', sold: 275 },
                { genre: 'Strategy', sold: 115 },
                { genre: 'Action', sold: 120 },
                { genre: 'Shooter', sold: 350 },
                { genre: 'Other', sold: -110 },
                { genre: 'Other1', sold: -110 }
            ]

            const App = (
                <Canvas pixelRatio={1} height="70px">
                    <Chart data={data}>
                        <Legend />
                        <Geometry x="genre" y="sold" color="genre" />
                    </Chart>
                </Canvas>
            )

            const context = createContext(App)
            await delay(3000)
            expect(context).toMatchImageSnapshot()
        })

        it('position = bottom', async () => {
            const data = [
                { genre: 'Sports', sold: 275 },
                { genre: 'Strategy', sold: 115 },
                { genre: 'Action', sold: 120 }
            ]

            const App = (
                <Canvas pixelRatio={1} height="70px">
                    <Chart data={data}>
                        <Legend position="bottom" />
                        <Geometry x="genre" y="sold" color="genre" />
                    </Chart>
                </Canvas>
            )

            const context = createContext(App)
            await delay(3000)
            expect(context).toMatchImageSnapshot()
        })

        it('position = left', async () => {
            const data = [
                { genre: 'Sports', sold: 275 },
                { genre: 'Strategy', sold: 115 },
                { genre: 'Action', sold: 120 }
            ]

            const App = (
                <Canvas pixelRatio={1} height="100px">
                    <Chart data={data}>
                        <Legend position="left" />
                        <Geometry x="genre" y="sold" color="genre" />
                    </Chart>
                </Canvas>
            )

            const context = createContext(App)
            await delay(3000)
            expect(context).toMatchImageSnapshot()
        })

        it('position = right', async () => {
            const data = [
                { genre: 'Sports', sold: 275 },
                { genre: 'Strategy', sold: 115 },
                { genre: 'Action', sold: 120 }
            ]

            const App = (
                <Canvas pixelRatio={1} height="100px">
                    <Chart data={data}>
                        <Legend position="right" />
                        <Geometry x="genre" y="sold" color="genre" />
                    </Chart>
                </Canvas>
            )

            const context = createContext(App)
            await delay(3000)
            expect(context).toMatchImageSnapshot()
        })

        it('设置 nameStyle', async () => {
            const data = [
                { genre: 'Sports', sold: 275 },
                { genre: 'Strategy', sold: 115 },
                { genre: 'Action', sold: 120 }
            ]

            const App = (
                <Canvas pixelRatio={1} height="100px">
                    <Chart data={data}>
                        <Legend
                            position="left"
                            nameStyle={{
                                fontSize: '40px',
                                fill: 'red'
                            }}
                        />
                        <Geometry x="genre" y="sold" color="genre" />
                    </Chart>
                </Canvas>
            )

            const context = createContext(App)
            await delay(3000)
            expect(context).toMatchImageSnapshot()
        })
    })
})
