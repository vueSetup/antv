import { defineComponent, cloneVNode } from 'vue'
import { Dropdown } from 'ant-design-vue'
import { DropdownProps } from 'ant-design-vue/es/dropdown'
import './style'


export const DropDown = defineComponent({
    props: DropdownProps,
    render() {
        const { prefixCls = 'x6', trigger, disabled, overlay, ...others } = this.$props
        const baseCls = `${prefixCls}-dropdown`

        const triggers = disabled
            ? []
            : Array.isArray(trigger)
                ? trigger
                : [trigger]

        const children = this.$slots.default?.()
        const dropdownTrigger = cloneVNode(children[0], {
            class: `${prefixCls}-trigger`,
            disabled
        })
        const fixedOverlay = <div class={`${baseCls}-overlay`}>{overlay}</div>

        return (
            <Dropdown
                {...others}
                prefixCls={baseCls}
                overlay={fixedOverlay}
                trigger={triggers}
            >
                {dropdownTrigger}
            </Dropdown>
        )
    }
})