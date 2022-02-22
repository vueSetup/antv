import { defineComponent, computed, cloneVNode } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { Dropdown as AntdvDropdown } from 'ant-design-vue'
import { dropdownProps as props } from 'ant-design-vue/es/dropdown/props'

export const dropdownProps = {
    ...props(),
    prefixCls: {
        type: String,
        default: 'x6'
    }
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>

export const Dropdown = defineComponent({
    props: dropdownProps,
    setup(props, { slots }) {
        return () => {
            const prefixCls = `${props.prefixCls}-dropdown`

            const fixedOverlay = <div class={`${prefixCls}-overlay`}>{props.overlay}</div>

            const children = slots.default?.() || []

            const child = children.length === 1 ? children[0] : null

            if (!child) {
                // TODO :: React.Children.only
                throw Error(`Vue.Children.only`)
            }
            
            const dropdownTrigger = cloneVNode(child, {
                class: `${prefixCls}-trigger`,
                disabled: props.disabled
            }, true)

            return (
                <AntdvDropdown {...props} prefixCls={prefixCls} overlay={fixedOverlay}>
                    {dropdownTrigger}
                </AntdvDropdown>
            )
        }
    }
})
