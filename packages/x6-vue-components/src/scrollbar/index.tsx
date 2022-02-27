import { computed, defineComponent, PropType, reactive, ref, watchEffect } from 'vue'
import clamp from 'clamp'

export const scrollbarProps = {
    prefixCls: {
        type: String,
        default: 'x6'
    },
    orientation: {
        type: String as PropType<'vertical' | 'horizontal'>,
        default: 'orientation'
    },
    contentSize: {
        type: Number,
        default: 0
    },
    containerSize: {
        type: Number,
        default: 0
    },
    scrollPosition: {
        type: Number,
        default: 0
    },
    scrollbarSize: {
        type: Number,
        default: 4
    },
    miniThumbSize: {
        type: Number,
        default: 16
    },
    keyboardScrollAmount: {
        type: Number,
        default: 40
    },
    zIndex: Number,
    stopPropagation: [Boolean, Function] as PropType<boolean | (() => boolean)>,
    onScroll: Function as PropType<(delta: number) => void>
}
export default defineComponent({
    props: scrollbarProps,
    setup(props) {
        const state = reactive({
            scale: 0,
            thumbSize: 0
        })
        const thumbRef = ref<HTMLDivElement | null>(null)
        const horizontal = computed(() => props.orientation === 'horizontal')

        watchEffect(() => {
            if (props.containerSize < 1 || props.contentSize <= props.containerSize) {
                return null
            }
            state.scale = props.containerSize / props.contentSize
            state.thumbSize = props.containerSize * state.scale

            if (state.thumbSize < props.miniThumbSize!) {
                state.scale = (props.containerSize - props.miniThumbSize!) / (props.contentSize - props.containerSize)
                state.thumbSize = props.miniThumbSize!
            }
        })

        const triggerCallback = (nextPosition: number) => {
            const max = props.contentSize - props.containerSize
            const position = clamp(nextPosition, 0, max)
            if (position !== props.scrollPosition) {
                props.onScroll?.(position)
            }
        }

        const onWheel = (delta: number) => {
            triggerCallback(props.scrollPosition + delta)
        }

        const onWheelX = (deltaX: number, deltaY: number) => {
            if (Math.abs(deltaX) >= Math.abs(deltaY)) {
                onWheel(deltaX)
            }
        }

        const onWheelY = (deltaX: number, deltaY: number) => {
            if (Math.abs(deltaX) <= Math.abs(deltaY)) {
                onWheel(deltaY)
            }
        }

        const onKeyDown = (e: KeyboardEvent) => {
            const keyCode = e.key

            // let focus move off the scrollbar
            if (keyCode === 'Tab') {
                return
            }

            let distance = props.keyboardScrollAmount
            let direction = 0

            if (horizontal.value) {
                switch (keyCode) {
                    case 'Home':
                        direction = -1
                        distance = props.contentSize
                        break

                    case 'ArrowLeft':
                        direction = -1
                        break

                    case 'ArrowRight':
                        direction = 1
                        break

                    default:
                        return
                }
            } else {
                switch (keyCode) {
                    case ' ':
                        if (e.shiftKey) {
                            direction = -1
                        } else {
                            direction = 1
                        }
                        break

                    case 'Home':
                        direction = -1
                        distance = props.contentSize
                        break

                    case 'ArrowUp':
                        direction = -1
                        break

                    case 'ArrowDown':
                        direction = 1
                        break

                    case 'PageUp':
                        direction = -1
                        distance = props.containerSize
                        break

                    case 'PageDown':
                        direction = 1
                        distance = props.containerSize
                        break

                    default:
                        return
                }
            }

            e.preventDefault()

            triggerCallback(props.scrollPosition + distance! * direction)
        }

        const onMouseDown = (e: MouseEvent) => {
            if (e.target !== thumbRef.value) {
                const nativeEvent = e.nativeEvent as any
                const position = horizontal.value
                    ? nativeEvent.offsetX || nativeEvent.layerX
                    : nativeEvent.offsetY || nativeEvent.layerY

                // mousedown on the scroll-track directly, move the
                // center of the scroll-face to the mouse position.
                triggerCallback((position - state.thumbSize * 0.5) / state.scale)
            } else {
                this.mouseMoveTracker.capture(e)
            }

            if (this.props.stopPropagation) {
                e.stopPropagation()
            }

            // focus the container so it may receive keyboard events
            this.containerElem.focus()
        }

        return () => {
            const { containerSize, scrollbarSize, zIndex, scrollPosition } = props

            const baseClassName = `${props.prefixCls}-scrollbar`
            const classNames = computed(() => [
                baseClassName,
                {
                    [`${baseClassName}-vertical`]: !horizontal.value,
                    [`${baseClassName}-horizontal`]: horizontal.value,
                }
            ])

            const trackStyle = {
                width: horizontal.value ? containerSize : scrollbarSize,
                height: horizontal.value ? scrollbarSize : containerSize,
                zIndex
            }

            const thumbStyle = {
                height: state.thumbSize,
                transform: horizontal.value ? `translate(${scrollPosition * state.scale}px, 0)` : `translate(0, ${scrollPosition * state.scale}px)`
            }
            return (
                <div
                    role="button"
                    class={classNames}
                    style={trackStyle}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    onMouseDown={onMouseDown}
                    onWheel={wheelHandler.onWheel}
                >
                    <div
                        ref={thumbRef}
                        style={thumbStyle}
                        class={`${baseClassName}-thumb`}
                    />
                </div>
            )
        }
    }
})