import { defineComponent, onMounted, ref } from 'vue'
import { Component } from '@antv/f2'
import Canvas from '@antv/f2-vue'

class Text extends Component {
    width: number

    constructor(props, context) {
        super(props, context)
        const { width } = this.context.measureText('0.123', {})
        this.width = width
    }
}

export default defineComponent({
    setup() {
        const textRef = ref()

        onMounted(() => {
            console.log(textRef.value)
        })

        return () => (
            <Canvas pixelRatio={1}>
                <Text ref={textRef} />
            </Canvas>
        )
    }
})
