import { FunctionalComponent } from 'vue'
import { useToolbarContext } from './context'

export namespace ToolbarGroup {
    export interface Props {
        className?: string
    }
}

export const ToolbarGroup: FunctionalComponent<ToolbarGroup.Props> = (props, { slots }) => {
    const context = useToolbarContext()
    const classNames = [`${context.prefixCls}-group`, props.className]
    return <div class={classNames}>{slots.default?.()}</div>
}
