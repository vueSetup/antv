import { defineComponent, computed } from 'vue'
import { useToolbarContext } from './context'

export const ToolbarGroup = defineComponent({
    setup(props, { slots }) {
        const context = useToolbarContext()

        return () => {
            const className = [`${context.prefixCls}-group`]

            return <div class={className}>{slots.default?.()}</div>
        }
    }
})
