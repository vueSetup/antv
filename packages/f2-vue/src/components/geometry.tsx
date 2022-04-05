import {
    defineComponent,
    watchEffect,
    inject,
    type PropType,
    type ExtractPropTypes
} from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Chart, Types, Legend } from '@antv/f2'
import type { AdjustConfig } from '@antv/f2/es/components/geometry/interface'
import type { AnimationCycle } from '@antv/f2/es/canvas/animation/interface'
import Coord from '../coord'
import { canvasContextKey, type CanvasContext } from '../context'

type StyleType = (record: any) => Types.ShapeAttrs
export const selectionProps = {
    selection: Object as PropType<{
        triggerOn?: 'click' | 'press' | string
        type?: 'single' | 'multiple'
        defaultSelected?: any[]
        selectedStyle?: Types.ShapeAttrs | StyleType
        unSelectedStyle?: Types.ShapeAttrs | StyleType
        cancelable?: boolean
    }>
}

// import type { SelectionProps } from "@antv/f2/es/components/geometry/selection"
export type SelectionProps = ExtractPropTypes<typeof selectionProps>

export const geometryProps = {
    ...selectionProps,
    adjust: Object as PropType<AdjustConfig>,
    chart: Object as PropType<typeof Chart>,
    coord: Object as PropType<typeof Coord>,
    startOnZero: Boolean,
    style: Object as PropType<Record<string, any>>,
    animation: Object as PropType<AnimationCycle>,
    x: String,
    y: String,
    shape: [String, Object],
    lineWidth: String,
    color: [String, Object],
    size: String,
    connectNulls: Boolean
}

// import type { GeometryProps } from '@antv/f2/es/components/geometry/interface'
export type GeometryProps = ExtractPropTypes<typeof geometryProps>

export default defineComponent({
    props: geometryProps,
    setup(props) {
        watchEffect(() => {
            const component = jsx(Legend, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})
