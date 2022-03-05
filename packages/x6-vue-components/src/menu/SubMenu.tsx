import { computed, defineComponent } from 'vue'
import { MenuItem, menuItemProps } from './Item'
import { useMenuContext } from './context'

export const MenuSubMenu = defineComponent({
    props: menuItemProps,
    setup(props, { slots }) {
        const context = useMenuContext()

        return () => {
            const children = slots.default?.()

            const baseClassName = `${context.prefixCls}-submenu`

            return (
                <MenuItem {...props} class={baseClassName}>
                    {{
                        innerExtra: () => <span class={`${baseClassName}-arrow`} />,
                        outerExtra: () => <div class={`${baseClassName}-menu`}>{children}</div>
                    }}
                </MenuItem>
            )
        }
    }
})
