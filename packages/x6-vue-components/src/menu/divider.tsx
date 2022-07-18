import { defineComponent } from 'vue'
import { useMenuContext } from './context'

export const MenuDivider = defineComponent({
    setup() {
        const context = useMenuContext()

        return () => {
            const baseClassName = `${context.prefixCls}-item`

            const className = [baseClassName, `${baseClassName}-divider`]

            return <div class={className} />
        }
    }
})
