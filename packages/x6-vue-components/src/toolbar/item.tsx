import { defineComponent, computed, isVNode, cloneVNode } from 'vue'
import type { PropType, VNode, VNodeChild, ExtractPropTypes } from 'vue'
import { Tooltip, TooltipProps, Menu } from 'ant-design-vue'
import 'ant-design-vue/es/tooltip/style/index'
import { Dropdown, DropdownProps } from '../dropdown'
import { useToolbarContext } from './context'

const toolbarItemProps = {
    name: String,
    icon: [String, Object] as PropType<VNodeChild>,
    text: [String, Object] as PropType<string | VNodeChild>,
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

export type ToolbarItemProps = ExtractPropTypes<typeof toolbarItemProps>

export const ToolbarItem = defineComponent({
    props: toolbarItemProps,
    emits: ['click'],
    setup(props, { slots, emit }) {
        const context = useToolbarContext()

        const processClick = (name = props.name, dropdown = props.dropdown) => {
            if (!props.disabled && !dropdown) {
                if (name) {
                    context.onClick(name)
                }
                emit('click', name)
            }
        }

        const onClick = () => processClick()

        const onDropdownItemClick = (name?: string) => {
            processClick(name, undefined)
        }

        return () => {
            const baseClassName = `${context.prefixCls}-item`

            const className = [
                baseClassName,
                {
                    [`${baseClassName}-hidden`]: props.hidden,
                    [`${baseClassName}-active`]: props.active,
                    [`${baseClassName}-disabled`]: props.disabled,
                    [`${baseClassName}-dropdown`]: props.dropdown
                }
            ]

            const children = slots.default?.()

            const renderButton = () => {
                const button = (
                    <button type="button" class={className} onClick={onClick}>
                        {props.icon && isVNode(props.icon) && (
                            <span class={`${baseClassName}-icon`}>{props.icon}</span>
                        )}
                        {(props.text || children) && (
                            <span class={`${baseClassName}-text`}>{props.text || children}</span>
                        )}
                        {props.dropdown && props.dropdownArrow && (
                            <span class={`${baseClassName}-dropdown-arrow`} />
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
