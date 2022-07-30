import { defineComponent, onMounted, ref } from "vue"
import { Canvas, Chart, Interval, Axis, Tooltip, Legend } from "@antv/f2"
import { jsx as _jsx } from "@antv/f2/jsx-runtime"
import { jsxs as _jsxs } from "@antv/f2/jsx-runtime"

const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
]

export default defineComponent({
  setup() {
    const containerRef = ref<HTMLCanvasElement>()

    onMounted(() => {
      const context = containerRef.value!.getContext('2d')
      const { props } = _jsx(Canvas, {
        context: context,
        pixelRatio: window.devicePixelRatio,
        children: _jsxs(Chart, {
          data: data,
          children: [
            _jsx(Legend, {}),
            _jsx(Axis, {
              field: "genre",
            }),
            _jsx(Axis, {
              field: "sold",
            }),
            _jsx(Tooltip, {
              showTooltipMarker: true,
            }),
            _jsx(Interval, {
              x: "genre",
              y: "sold",
              color: "genre",
            }),
          ],
        }),
      })
      const canvas = new Canvas(props)
      canvas.render()
    })

    return () => <canvas ref={containerRef} />
  },
})
