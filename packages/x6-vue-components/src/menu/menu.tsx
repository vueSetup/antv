import { defineComponent, computed } from 'vue'
import type { PropType, ExtractPropTypes, Plugin } from 'vue'
import { MenuItem } from './item'
import { MenuDivider } from './divider'
import { MenuContextProvider } from './context'
import { MenuSubMenu } from './submenu'

export const menuProps = {
    prefixCls: {
        type: String,
        default: 'x6'
    },
    hasIcon: Boolean,
    stopPropagation: Boolean,
    onClick: Function as PropType<(name: string) => void>,
    registerHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>,
    unregisterHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>
}

export type MenuProps = ExtractPropTypes<typeof menuProps>

const Menu = defineComponent({
    props: menuProps,
    setup(props, { slots, emit }) {
        const baseClassName = computed(() => `${props.prefixCls}-menu`)

        const className = computed(() => [
            baseClassName.value,
            { [`${baseClassName.value}-has-icon`]: props.hasIcon }
        ])

        const registerHotkey = (hotkey: string, handler: () => any) => {
            props.registerHotkey && props.registerHotkey(hotkey, handler)
        }

        const unregisterHotkey = (hotkey: string, handler: () => any) => {
            props.unregisterHotkey && props.unregisterHotkey(hotkey, handler)
        }

        const onClick = (name: string, e?: MouseEvent) => {
            if (props.stopPropagation && e) {
                e.stopPropagation()
            }
            emit('click', name)
        }

        return () => (
            <div class={className.value}>
                <MenuContextProvider
                    value={{
                        prefixCls: baseClassName.value,
                        onClick,
                        registerHotkey,
                        unregisterHotkey
                    }}
                >
                    {slots.default?.()}
                </MenuContextProvider>
            </div>
        )
    }
})

export default Menu as typeof Menu & {
    readonly Item: typeof MenuItem
    readonly Divider: typeof MenuDivider
    readonly SubMenu: typeof MenuSubMenu
}
