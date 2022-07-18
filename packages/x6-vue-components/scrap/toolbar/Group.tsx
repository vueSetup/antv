import { defineComponent, computed } from 'vue'
import { useToolbarContext } from './context'

export const ToolbarGroup = defineComponent({
    setup(props, { slots }) {
        const context = useToolbarContext()

        return () => {
            const children = slots.default?.()

            const baseClassName = [`${context.prefixCls}-group`]

            return <div class={baseClassName}>{children}</div>
        }
    }
})
