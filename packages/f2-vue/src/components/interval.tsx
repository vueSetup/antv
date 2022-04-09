import { defineComponent, watchEffect, inject, type ExtractPropTypes } from 'vue-demi'
import { Interval, withInterval, IntervalView, jsx } from '@antv/f2'
import { geometryProps } from './geometry'
import { canvasContextKey, type CanvasContext } from '../context'

const intervalProps = {
    ...geometryProps,
    /**
     * 大小比例，范围 [0, 1], 比如柱状图默认为 0.5, 表示柱子和空白处各占 50%
     */
    sizeRatio: Number,
    selection: Object
}

export type IntervalProps = ExtractPropTypes<typeof intervalProps>

export default defineComponent({
    props: intervalProps,
    setup(props) {
        watchEffect(() => {
            const component = jsx(Interval, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withInterval, IntervalView }
