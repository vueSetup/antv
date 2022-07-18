import { FunctionalComponent, cloneVNode } from 'vue'
import { Dropdown as RcDropdown, type DropdownProps } from 'ant-design-vue'

export const Dropdown: FunctionalComponent<DropdownProps> = (props, { slots }) => {
    const { prefixCls = 'x6', disabled, overlay } = props

    const baseClassName = `${prefixCls}-dropdown`

    const fixedOverlay = <div class={`${baseClassName}-overlay`}>{overlay}</div>

    const children = slots.default?.()
    const child = children && children.length === 1 ? children[0] : null
    if (child === null) {
        throw Error(`Vue.Children.only`)
    }
    const dropdownTrigger = cloneVNode(
        child,
        {
            class: `${baseClassName}-trigger`,
            disabled
        },
        true
    )

    return (
        <RcDropdown {...props} prefixCls={baseClassName} overlay={fixedOverlay}>
            {dropdownTrigger}
        </RcDropdown>
    )
}
