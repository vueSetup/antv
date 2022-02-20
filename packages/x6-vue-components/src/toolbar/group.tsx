import { defineComponent, computed } from 'vue'
import { useToolbarContext } from './context'

export const ToolbarGroup = defineComponent({
    setup(props, { slots }) {
        const context = useToolbarContext()

        const className = computed(() => [`${context.prefixCls}-group`])

        return () => <div class={className.value}>{slots.default?.()}</div>
    }
})
