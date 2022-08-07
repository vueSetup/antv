// @ts-nocheck
/** @jsxImportSource @antv/f2 */
import { defineComponent, onMounted } from "vue"
import Canvas from "@antv/f2-vue"
import { Component } from "@antv/f2"

class Text extends Component {
  width: number

  constructor(props, context) {
    super(props, context)
    const { width } = this.context.measureText("0.123", {})
    this.width = width
  }
}

export default defineComponent({
  setup() {
    const textRef = { current: null }

    onMounted(() => {
      console.log(textRef.current)
    })

    return () => {
      return (
        <Canvas
          pixelRatio={1}
          theme={{
            fontFamily: '"STXIHEI"',
          }}
        >
          <Text ref={textRef} />
        </Canvas>
      )
    }
  },
})
