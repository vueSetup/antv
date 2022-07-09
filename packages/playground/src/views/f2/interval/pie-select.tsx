import { defineComponent } from 'vue'
import Canvas from '@antv/f2-vue'
import { Chart, Interval } from '@antv/f2'

const data = [
    { a: '1', genre: 'Sports', sold: 275 },
    { a: '1', genre: 'Strategy', sold: 115 },
    { a: '1', genre: 'Action', sold: 120 },
    { a: '1', genre: 'Shooter', sold: 350 },
    { a: '1', genre: 'Other', sold: 110 }
]
// issue:test时没有选中状态，demo可以，可能test未成功触发点击事件
export default defineComponent({
    setup() {
        return () => (
            <Canvas pixelRatio={1} animate={false}>
                <Chart
                    data={data}
                    coord={{
                        radius: 0.8,
                        type: 'polar',
                        transposed: true
                    }}
                >
                    <Interval
                        x="a"
                        y="sold"
                        adjust="stack"
                        color="genre"
                        selection={{
                            defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
                            selectedStyle: (record) => {
                                const { yMax, yMin } = record
                                return {
                                    r: (yMax - yMin) * 1.1
                                }
                            },
                            unSelectedStyle: {},
                            cancelable: true
                        }}
                    />
                </Chart>
            </Canvas>
        )
    }
})
