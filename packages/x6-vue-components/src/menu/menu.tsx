import { defineComponent, computed, reactive, watchEffect } from 'vue'
import type { PropType, ExtractPropTypes, Plugin } from 'vue'
import { MenuItem } from './item'
import { MenuDivider } from './divider'
import { IMenuContext, MenuContextProvider } from './context'
import { MenuSubMenu } from './submenu'

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

        const context = reactive<IMenuContext>({
            onClick,
            registerHotkey,
            unregisterHotkey
        })

        watchEffect(() => {
            context.prefixCls = baseClassName.value
        })

        return () => (
            <div class={className.value}>
                <MenuContextProvider value={context}>{slots.default?.()}</MenuContextProvider>
            </div>
        )
    }
})

export default Menu as typeof Menu & {
    readonly Item: typeof MenuItem
    readonly Divider: typeof MenuDivider
    readonly SubMenu: typeof MenuSubMenu
}
