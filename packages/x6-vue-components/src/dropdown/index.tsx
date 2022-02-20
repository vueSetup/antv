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
        const prefixCls = computed(() => `${props.prefixCls}-dropdown`)

        return () => {
            const children = slots.default?.() || []
            const child = children.length === 1 ? children[0] : null
            if (!child) {
                throw Error(`Vue.Children.only`)
            }

            const fixedOverlay = <div class={`${prefixCls.value}-overlay`}>{props.overlay}</div>

            const dropdownTrigger = cloneVNode(child, {
                class: `${prefixCls.value}-trigger`,
                disabled: props.disabled
            }, true)

            return (
                <AntdvDropdown {...props} prefixCls={prefixCls.value} overlay={fixedOverlay}>
                    {dropdownTrigger}
                </AntdvDropdown>
            )
        }
    }
})
