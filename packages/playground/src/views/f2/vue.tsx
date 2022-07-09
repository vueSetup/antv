import { defineComponent, reactive } from 'vue'
import Canvas from '@antv/f2-vue'
import { Chart, Interval, Axis, Tooltip } from '@antv/f2'
import { Graphic, GraphicJSX, Legend } from './graphic'

const data1 = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
]

const data2 = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 20 },
    { genre: 'Shooter', sold: 50 },
    { genre: 'Other', sold: 50 }
]

export default defineComponent({
    setup() {
        const state = reactive<{
            landscape: Boolean
            year: string
            data: Array<Record<string, any>>
            count: number
        }>({
            landscape: false,
            year: '2021',
            data: data1,
            count: 1
        })

        const Increase = () => {
            state.count += 1
            if (state.count % 2 === 0) {
                state.landscape = true
                state.year = '2022'
                state.data = data2
                console.log('data2')
            } else {
                state.landscape = false
                state.year = '2021'
                state.data = data1
                console.log('data1')
            }
        }

        return () => {
            return (
                <>
                    <span>{state.count}</span>
                    <button onClick={Increase}>Increase++</button>
                    <Canvas>
                        <Chart data={state.data}>
                            <Graphic year={state.year} />
                            <Legend style={{ with: '100px' }} />
                            <Axis field="genre" />
                            <Axis field="sold" />
                            <Tooltip showTooltipMarker={true} />
                            <Interval x="genre" y="sold" color="genre" />
                        </Chart>
                    </Canvas>
                </>
            )
        }
    }
})
