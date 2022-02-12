import { defineComponent, isVNode, PropType, VNode, VNodeChild } from "vue"
import MenuItem from './Item'

const MenuSubMenuProps = {
    text: [String, Object] as PropType<String | VNode>,
    icon: Object as PropType<VNode>,
}

const MenuSubMenu = defineComponent({
    props: MenuSubMenuProps,
    setup(props, { slots }) {
        const children = slots.default?.()
        const prefixCls = "x6-menu"
        return () => (
            <MenuItem
                class={`${prefixCls}-submenu`}
                innerExtra={
                    <span class={`${prefixCls}-submenu-arrow`} />
                }
                outerExtra={
                    <div class={`${prefixCls}-submenu-menu`}>{children}</div>
                }
                {...props}
            />
        )
    }
})

export default MenuSubMenu