import {
    defineComponent,
    watchEffect,
    inject,
    type PropType,
    type ExtractPropTypes
} from 'vue-demi'
import { jsx } from '@antv/f2/jsx-runtime'
import { Line, withLine, LineView } from '@antv/f2'
import { geometryProps } from './geometry'
import { canvasContextKey, type CanvasContext } from '../context'

export const lineProps = {
    ...geometryProps,
    connectNulls: Boolean,
    endView: Function as PropType<(origin: any) => JSX.Element>
}

// import { LineProps } from "@antv/f2/es/components/line/types"
export type LineProps = ExtractPropTypes<typeof lineProps>

export default defineComponent({
    props: geometryProps,
    setup(props) {
        watchEffect(() => {
            const component = jsx(Line, { ...props })
            const { push } = inject<CanvasContext>(canvasContextKey, {
                children: [],
                push: () => {}
            })
            push(component)
        })
        return () => null
    }
})

export { withLine, LineView }
