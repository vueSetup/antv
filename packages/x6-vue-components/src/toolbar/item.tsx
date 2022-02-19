import { defineComponent, computed, isVNode, cloneVNode } from 'vue'
import type { PropType, VNode } from 'vue'
import { Tooltip, TooltipProps, Menu } from 'ant-design-vue'
import 'ant-design-vue/es/tooltip/style/index'
import { Dropdown, DropdownProps } from '../dropdown'
import { useToolbarContext } from './context'

const props = {
    name: String,
    icon: Object as PropType<VNode>,
    text: [String, Object] as PropType<string | VNode>,
    hidden: Boolean,
    disabled: Boolean,
    active: Boolean,
    tooltip: String,
    tooltipProps: Object as PropType<TooltipProps>,
    tooltipAsTitle: Boolean,
    dropdown: Object as PropType<VNode>,
    dropdownArrow: Boolean,
    dropdownProps: Object as PropType<DropdownProps>,
    onClick: Function as PropType<(name?: string) => void>
}

export const ToolbarItem = defineComponent({
    props,
    setup(props, { slots, emit }) {
        const children = slots.default?.()

        const context = useToolbarContext()

        const baseClassName = computed(() => `${context.prefixCls}-item`)

        const className = computed(() => [
            baseClassName.value,
            {
                [`${baseClassName.value}-hidden`]: props.hidden,
                [`${baseClassName.value}-active`]: props.active,
                [`${baseClassName.value}-disabled`]: props.disabled,
                [`${baseClassName.value}-dropdown`]: props.dropdown
            }
        ])

        const processClick = (name = props.name, dropdown = props.dropdown) => {
            if (!props.disabled && !dropdown) {
                if (name) {
                    context.onClick(name)
                }
                emit('click', name)
            }
        }

        const onDropdownItemClick = (name?: string) => {
            processClick(name, undefined)
        }

        const renderButton = () => {
            const button = (
                <button type="button" class={className.value} onClick={() => processClick()}>
                    {props.icon && isVNode(props.icon) && (
                        <span class={`${baseClassName.value}-icon`}>{props.icon}</span>
                    )}
                    {(props.text || children) && (
                        <span class={`${baseClassName.value}-text`}>{props.text || children}</span>
                    )}
                    {props.dropdown && props.dropdownArrow && (
                        <span class={`${baseClassName.value}-dropdown-arrow`} />
                    )}
                </button>
            )

            if (props.tooltip && !props.tooltipAsTitle && !props.disabled) {
                return (
                    <Tooltip
                        title={props.tooltip}
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        {...props.tooltipProps}
                    >
                        {button}
                    </Tooltip>
                )
            }

            return button
        }

        return () => {
            const content = renderButton()

            if (props.dropdown != null && !props.disabled) {
                const overlay = (
                    <div>
                        {props.dropdown.type === Menu
                            ? cloneVNode(props.dropdown, {
                                  onClick: onDropdownItemClick
                              })
                            : props.dropdown}
                    </div>
                )

                const dropdownProps = {
                    ...props.dropdownProps,
                    disabled: props.disabled,
                    overlay
                }

                return (
                    <Dropdown trigger="click" {...dropdownProps}>
                        {content}
                    </Dropdown>
                )
            }
            return content
        }
    }
})
