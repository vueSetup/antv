import { computed, defineComponent } from 'vue'
import { MenuItem, menuItemProps } from './Item'
import { useMenuContext } from './context'

export const MenuSubMenu = defineComponent({
    props: menuItemProps,
    setup(props, { slots }) {
        const context = useMenuContext()

        const baseClassName = computed(() => `${context.prefixCls}-submenu`)

        return () => (
            <MenuItem {...props} class={baseClassName.value}>
                {{
                    innerExtra: <span class={`${baseClassName.value}-arrow`} />,
                    outerExtra: <div class={`${baseClassName.value}-menu`}>{slots.default?.()}</div>
                }}
            </MenuItem>
        )
    }
})
