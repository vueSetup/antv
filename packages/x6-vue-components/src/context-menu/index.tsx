import { defineComponent } from "vue"
import type { PropType, VNode, ExtractPropTypes } from "vue"
import { Dropdown, dropdownProps } from "../dropdown"

export const contextMenuProps = {
  ...dropdownProps,
  menu: [String, Object] as PropType<string | VNode>,
}

export type ContextMenuProps = ExtractPropTypes<typeof contextMenuProps>

export const ContextMenu = defineComponent({
  props: contextMenuProps,
  setup(props, { slots }) {
    return () => (
      <Dropdown
        {...props}
        overlay={props.menu ?? props.overlay}
        trigger="contextmenu"
      >
        {slots.default?.()}
      </Dropdown>
    )
  },
})
