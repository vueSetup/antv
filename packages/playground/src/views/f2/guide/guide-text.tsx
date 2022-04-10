import { defineComponent } from 'vue'
import { Canvas, Chart, Interval, TextGuide, Axis } from '@antv/f2-vue'

const data = [
    { genre: 'Sports', sold: 275, type: 'a' },
    { genre: 'Strategy', sold: 115, type: 'a' },
    { genre: 'Action', sold: 120, type: 'a' },
    { genre: 'Shooter', sold: 350, type: 'a' },
    { genre: 'Other', sold: 150, type: 'a' }
]

export default defineComponent({
    setup() {
        return () => (
            <Canvas pixelRatio={1}>
                <Chart
                    data={data}
                    coord={{
                        transposed: true
                    }}
                >
                    <Axis field="genre" />
                    <Axis field="sold" min={0} />
                    <Interval
                        x="genre"
                        y="sold"
                        color="type"
                        animation={{
                            appear: {
                                duration: 1000,
                                easing: 'quinticIn',
                                property: ['width']
                            }
                        }}
                    />

                    {data.map((item) => {
                        const { sold } = item
                        return (
                            <TextGuide
                                records={[item]}
                                onClick={(ev) => {
                                    console.log('ev: ', ev.points)
                                }}
                                content={`${sold}`}
                                attrs={{
                                    fill: '#000',
                                    fontSize: '24px'
                                }}
                                animation={(points, props) => {
                                    return {
                                        appear: {
                                            easing: 'quinticIn',
                                            duration: 1000,
                                            property: ['x'],
                                            start: {
                                                x: props.coord.left
                                            }
                                        }
                                    }
                                }}
                            />
                        )
                    })}
                </Chart>
            </Canvas>
        )
    }
})