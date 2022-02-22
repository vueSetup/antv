import { computed, defineComponent } from 'vue'
import { MenuItem, menuItemProps } from './Item'
import { useMenuContext } from './context'

export const MenuSubMenu = defineComponent({
    props: menuItemProps,
    setup(props, { slots }) {
        const context = useMenuContext()

        return () => {
            const className = `${context.prefixCls}-submenu`

            return (
                <MenuItem {...props} class={className}>
                    {{
                        innerExtra: () => <span class={`${className}-arrow`} />,
                        outerExtra: () => <div class={`${className}-menu`}>{slots.default?.()}</div>
                    }}
                </MenuItem>
            )
        }
    }
})
