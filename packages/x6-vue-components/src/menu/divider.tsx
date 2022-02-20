import { defineComponent, computed } from 'vue'
import { useMenuContext } from './context'

export const MenuDivider = defineComponent({
    setup() {
        const context = useMenuContext()
        const baseClassName = computed(() => `${context.prefixCls}-item`)
        const className = computed(() => [baseClassName.value, `${baseClassName.value}-divider`])

        return () => <div class={className.value} />
    }
})
