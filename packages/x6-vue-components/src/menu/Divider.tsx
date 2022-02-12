import { defineComponent, FunctionalComponent } from "vue"

const MenuDivider = defineComponent({
    setup() {
        const prefixCls = "x6-menu"
        return () => <div class={`${prefixCls}-item ${prefixCls}-item-divider`} />
    }
})

export default MenuDivider