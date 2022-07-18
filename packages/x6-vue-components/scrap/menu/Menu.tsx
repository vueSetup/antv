import { defineComponent, computed, reactive, watchEffect } from 'vue'
import type { PropType, ExtractPropTypes, Plugin } from 'vue'
import { MenuItem } from './item'
import { MenuDivider } from './Divider'
import { IMenuContext, MenuContextProvider } from './context'
import { MenuSubMenu } from './SubMenu'

export const menuProps = {
    prefixCls: {
        type: String,
        default: 'x6'
    },
    hasIcon: Boolean,
    stopPropagation: Boolean,
    registerHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>,
    unregisterHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>,
    onClick: Function as PropType<(name: string) => void>
}

export type MenuProps = ExtractPropTypes<typeof menuProps>

const Menu = defineComponent({
    props: menuProps,
    emits: ['click'],
    setup(props, { slots, emit }) {
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

        const context = reactive<IMenuContext>({
            onClick,
            registerHotkey,
            unregisterHotkey
        })

        watchEffect(() => {
            context.prefixCls = `${props.prefixCls}-menu`
        })

        return () => {
            const { prefixCls, hasIcon } = props

            const children = slots.default?.()

            const baseClassName = `${prefixCls}-menu`

            const className = [baseClassName, { [`${baseClassName}-has-icon`]: hasIcon }]

            return (
                <div class={className}>
                    <MenuContextProvider value={context}>{children}</MenuContextProvider>
                </div>
            )
        }
    }
})

export default Menu as typeof Menu & {
    readonly Item: typeof MenuItem
    readonly Divider: typeof MenuDivider
    readonly SubMenu: typeof MenuSubMenu
}
