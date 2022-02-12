import { defineComponent, toRefs, VNode } from "vue"
import { useToolbarContext } from "./context"
import './style'

export const ToolbarGroup = defineComponent({
    setup() {
        const context = useToolbarContext()
        return { ...toRefs(context) }
    },
    render() {
        const children = this.$slots.default?.()
        
        return (
            <div class={`${this.prefixCls}-group`}>
                {children}
            </div>
        )
    }
})

// export default ToolbarGroup