import { defineComponent, watchEffect, inject } from 'vue-demi'
import { Tooltip, withTooltip, TooltipView, jsx } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../context'

export default defineComponent({
    props: {
        alwaysShow: Boolean,
        showTooltipMarker: Boolean,
        snap: Boolean,
        showCrosshairs: Boolean,
        defaultItem: Object,
        onChange: Function,
        crosshairsType: String,
        showXTip: Boolean,
        showYTip: Boolean
    },
    setup(props) {
        watchEffect(() => {
            const component = jsx(Tooltip, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withTooltip, TooltipView }
