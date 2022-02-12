import { defineComponent, PropType, Plugin } from "vue"
import MenuItem from './Item'
import MenuSubMenu from './SubMenu'
import MenuDivider from './Divider'

export const MenuProps = {
    prefixCls: String,
    hasIcon: Boolean,
    stopPropagation: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    registerHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>,
    unregisterHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>
}

const Menu = defineComponent({
    props: MenuProps,
    setup(props, { slots }) {
        const { prefixCls = "x6", hasIcon } = props;
        const baseClassName = `${prefixCls}-menu`
        const classNames = { [baseClassName]: true, [`${baseClassName}-has-icon`]: hasIcon }

        const children = slots.default?.()
        return () => <div class={classNames}>{children}</div>
    }
})

Menu.Item = MenuItem
Menu.SubMenu = MenuSubMenu
Menu.Divider = MenuDivider

export default Menu as typeof Menu &
    Plugin & {
        readonly Item: typeof MenuItem
        readonly SubMenu: typeof MenuSubMenu
        readonly Divider: typeof MenuDivider
    }
