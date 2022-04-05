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
    selection: {
        type: Object as PropType<{
            /**
             * 设置单选/多选， 默认为 single（单选），可选值： 'single' | 'multiple'
             */
            type: 'single' | 'multiple'
            /**
             * 触发的事件，默认为 click，可选 'click' | 'press'
             */
            triggerOn: 'click' | 'press' | string
            /**
             * 默认的选中项，可设置多个
             */
            defaultSelected: Record<string, any>[]
            /**
             * 选中的样式，可设置图形属性或者函数
             */
            selectedStyle?: Types.ShapeAttrs | StyleType
            /**
             * 非选中的样式，可设置图形属性或者函数
             */
            unSelectedStyle?: Types.ShapeAttrs | StyleType
            /**
             * 是否可取消，单选下表现为选择和反选，默认为 true
             */
            cancelable: boolean
        }>,
        default: {
            type: 'single',
            triggerOn: 'click',
            defaultSelected: [],
            cancelable: true
        }
    }
}

// import type { SelectionProps } from "@antv/f2/es/components/geometry/selection"
export type SelectionProps = ExtractPropTypes<typeof selectionProps>

export const geometryProps = {
    ...selectionProps,
    // TODO :: DATA ??
    data: Array as PropType<Record<string, any>>,
    adjust: [String, Object] as PropType<AdjustConfig>,
    startOnZero: Boolean,
    style: Object as PropType<Record<string, any>>,
    animation: Object as PropType<AnimationCycle>,
    coord: Object as PropType<typeof Coord>,
    chart: Object as PropType<typeof Chart>,
    // TODO :: ??
    x: String,
    y: String,
    size: [String, Object] as PropType<string | Record<string, any>>,
    color: [String, Object],
    shape: [String, Object],
    lineWidth: String
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
