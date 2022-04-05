import { ref } from 'vue'
import { jsx, Canvas, Chart, Line } from '../../../src'
import { createContext, delay } from '../../util'

describe('空数据', () => {
    it('空数组', async () => {
        const lineRef = ref(null)
        const App = (
            <Canvas pixelRatio={1} animate={false}>
                <Chart data={[]}>
                    <Line ref={lineRef} x="x" y="y" />
                </Chart>
            </Canvas>
        )

        const context = createContext(App)

        await delay(100)

        expect(
            lineRef.value.container
                .get('children')[0]
                .get('children')[0]
                .get('children')[0]
                .get('children').length
        ).toBe(0)
    })
})
