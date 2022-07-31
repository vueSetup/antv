import { defineComponent, cloneVNode } from "vue"
import type { ExtractPropTypes } from "vue"
import { Dropdown as RcDropdown } from "ant-design-vue"
import { dropdownProps as props } from "ant-design-vue/es/dropdown/props"

export const dropdownProps = {
  ...props(),
  prefixCls: {
    type: String,
    default: "x6",
  },
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>

export const Dropdown = defineComponent({
  props: dropdownProps,
  setup(props, { slots }) {
    return () => {
      const { prefixCls = "x6", disabled, overlay } = props

      const baseClassName = `${prefixCls}-dropdown`

      const fixedOverlay = (
        <div class={`${baseClassName}-overlay`}>{overlay}</div>
      )

      const children = slots.default?.()

      const child = children && children.length === 1 ? children[0] : null

      if (child === null) {
        throw Error(`Vue.Children.only`)
      }

      const dropdownTrigger = cloneVNode(
        child,
        {
          class: `${baseClassName}-trigger`,
          disabled,
        },
        true
      )

      return (
        <RcDropdown {...props} prefixCls={baseClassName} overlay={fixedOverlay}>
          {dropdownTrigger}
        </RcDropdown>
      )
    }
  },
})
