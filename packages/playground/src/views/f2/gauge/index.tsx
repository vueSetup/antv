import { defineComponent } from 'vue'
import Canvas from '@antv/f2-vue'
import { Gauge } from '@antv/f2'

const data = [
    { genre: 'Sports', sold: 275, type: 'a' },
    { genre: 'Strategy', sold: 115, type: 'a' },
    { genre: 'Action', sold: 120, type: 'a' },
    { genre: 'Shooter', sold: 350, type: 'a' },
    { genre: 'Other', sold: 150, type: 'a' }
]
//issues:木有标蓝部分
export default defineComponent({
    setup() {
        return () => (
            <Canvas pixelRatio={1}>
                <Gauge
                    center={{ x: 150, y: 150 }}
                    startAngle={Math.PI}
                    endAngle={Math.PI * 2}
                    percent={0.5}
                    r="200px"
                    tickCount={6}
                    tickOffset="-40px"
                    tickLength="20px"
                />
            </Canvas>
        )
    }
})
