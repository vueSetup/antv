import { defineComponent } from "vue"
import { useMenuContext } from "./context"
import MenuItem, { menuItemProps } from "./item"

export const MenuSubMenu = defineComponent({
  props: menuItemProps,
  setup(props, { slots }) {
    const context = useMenuContext()

    return () => {
      const baseClassName = `${context.prefixCls}-submenu`

      const children = slots.default?.()

      return (
        <MenuItem {...props} class={baseClassName}>
          {{
            innerExtra: () => <span class={`${baseClassName}-arrow`} />,
            outerExtra: () => (
              <div class={`${baseClassName}-menu`}>{children}</div>
            ),
          }}
        </MenuItem>
      )
    }
  },
})
