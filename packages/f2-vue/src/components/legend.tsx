import {
    defineComponent,
    watchEffect,
    inject,
    type PropType,
    type ExtractPropTypes
} from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Legend, withLegend, LegendView, type Types } from '@antv/f2'
import { canvasContextKey, type CanvasContext } from '../context'

/**
 * import type { LegendProps } from '@antv/f2/es/components/legend/withLegend'
 */
export interface LegendItem {
    /**
     * 标记颜色。
     */
    color: string
    /**
     * 名称。
     */
    name: string
    /**
     * 值。
     */
    value?: string | number
    /**
     * 图例标记。
     */
    marker?: string
}

export const legendProps = {
    field: String,
    position: {
        type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
        default: 'top'
    },
    width: [Number, String],
    height: [Number, String],
    margin: [Number, String],
    items: Array as PropType<LegendItem[]>,
    style: Object as PropType<Types.Style>,
    marker: {
        type: String as PropType<'circle' | 'square'>,
        default: 'circle'
    },
    nameStyle: Object as PropType<Types.TextAttrs>,
    valueStyle: Object as PropType<Types.TextAttrs>,
    itemFormatter: Function as PropType<(value: string) => string>
}

export type LegendProps = ExtractPropTypes<typeof legendProps>

export default defineComponent({
    props: legendProps,
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

export { withLegend, LegendView }
