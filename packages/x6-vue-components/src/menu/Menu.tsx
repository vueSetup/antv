import { defineComponent, computed } from 'vue'
import type { PropType, ExtractPropTypes } from 'vue'
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
    onClick: Function as PropType<(e: MouseEvent) => void>,
    registerHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>,
    unregisterHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>
}

export type MenuProps = ExtractPropTypes<typeof menuProps>

const Menu = defineComponent({
    props: menuProps,
    setup(props, { slots, emit }) {
        const baseClassName = computed(() => `${props.prefixCls}-item`)

        const className = computed(() => [
            baseClassName.value,
            { [`${baseClassName.value}-has-icon`]: props.hasIcon }
        ])

        const onClick = (name: string, e?: MouseEvent) => {
            if (props.stopPropagation && e) {
                e.stopPropagation()
            }
            emit('click', name)
        }

        return () => (
            <div class={className}>
                <MenuContextProvider
                    value={{
                        prefixCls: baseClassName.value,
                        onClick,
                        registerHotkey: props.registerHotkey,
                        unregisterHotkey: props.unregisterHotkey
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
