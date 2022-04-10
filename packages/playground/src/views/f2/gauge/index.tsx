import { defineComponent } from 'vue'
import { Canvas, Gauge } from '@antv/f2-vue'

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