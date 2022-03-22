import {
    defineComponent,
    shallowRef,
    shallowReactive,
    onMounted,
    onBeforeUnmount,
    watch,
    provide
} from 'vue'
import type { PropType, ExtractPropTypes } from 'vue'
import { Canvas } from '@antv/f2'
import { type CanvasContext, canvasContextKey } from './context'

export const canvasProps = {
    pixelRatio: Number,
    width: [Number, String],
    height: [Number, String],
    padding: Array as PropType<number | string | (number | string)[]>,
    animate: Boolean
}

export type CanvasProps = ExtractPropTypes<typeof canvasProps>

export default defineComponent({
    props: {
        ...canvasProps,
        children: Array as PropType<JSX.Element[]>
    },
    setup(props, { slots, emit }) {
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
                pixelRatio = window.devicePixelRatio,
                width = container.parentElement?.clientWidth
            } = props

            console.log('children', context.children)

            state.canvas = new Canvas({
                ...props,
                pixelRatio,
                width,
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
