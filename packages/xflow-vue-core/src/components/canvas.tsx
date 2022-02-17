// https://github.com/antvis/XFlow/blob/master/packages/xflow-core/src/xflow-main/components/canvas.tsx
import { defineComponent, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

const props = {
    // config: Object as PropType<GraphConfig>,
    style: Object as PropType<CSSProperties>,
    className: String,
    isXFlowCanvas: Boolean
    // position: Object as PropType<IPosition>
}

export type XFlowCanvasProps = ExtractPropTypes<typeof props>

export const XFlowCanvas = defineComponent({
    props,
    setup(props, { slots }) {
        /** x6画布parent的dom节点 */
        const rootRef = ref<HTMLDivElement>()
        /** x6画布的dom节点 */
        const canvasRef = ref<HTMLDivElement>()

        const children = slots.default?.()

        return () => (
            <>
                <div ref={rootRef}>
                    <div ref={canvasRef}>{children}</div>
                </div>
            </>
        )
    }
})
