import {
    defineComponent,
    shallowRef,
    shallowReactive,
    onMounted,
    onBeforeUnmount,
    watch,
    provide
} from 'vue-demi'
import type { PropType, ExtractPropTypes } from 'vue-demi'
import { Canvas } from '@antv/f2'
import { type CanvasContext, canvasContextKey } from './context'

export const canvasProps = {
    pixelRatio: Number,
    width: {
        type: [Number, String],
        default: 300
    },
    height: {
        type: [Number, String],
        default: 225
    },
    padding: Array as PropType<number | string | (number | string)[]>,
    animate: Boolean,
    theme: Object
}

export type CanvasProps = ExtractPropTypes<typeof canvasProps>

export default defineComponent({
    props: canvasProps,
    setup(props, { slots, expose }) {
        const containerRef = shallowRef<HTMLCanvasElement>()
        const state = shallowReactive<{ canvas: Canvas | null }>({
            canvas: null
        })

        const context: CanvasContext = {
            children: [],
            push: (component: JSX.Element) => {
                context.children.push(component)
            }
        }

        provide(canvasContextKey, context)

        // const resizeObserver = new ResizeObserver(
        //     throttle((entries: ResizeObserverEntry[]) => {
        //         entries.forEach((entry) => {
        //             state.canvas?.update({
        //                 width: entry.contentRect.width
        //             })
        //         })
        //     }, 500)
        // )

        onMounted(() => {
            const container = containerRef.value
            if (container === undefined)
                throw new Error(`The Antv f2 chart's container wasn't mounted.`)
            if (container.tagName !== 'CANVAS')
                throw new Error(`The Antv f2 chart's container must be Canvas Element.`)

            // resizeObserver.observe(container.parentElement!)

            const {
                pixelRatio = window.devicePixelRatio
                // width = container.parentElement?.clientWidth
            } = props

            // console.log('children', context.children)

            state.canvas = new Canvas({
                ...props,
                pixelRatio,
                // width,
                children: context.children,
                context: container.getContext('2d') ?? undefined
            })
            state.canvas.render()
        })

        watch(props, () => {
            state.canvas?.update(props)
        })

        onBeforeUnmount(() => {
            state.canvas?.destroy()
        })

        return () => (
            <>
                {slots.default?.()}
                <canvas ref={containerRef} />
            </>
        )
    }
})
