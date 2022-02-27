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
            const {
                hidden,
                active,
                disabled,
                dropdown,
                dropdownArrow,
                dropdownProps,
                icon,
                text,
                tooltip,
                tooltipAsTitle,
                tooltipProps
            } = props

            const children = slots.default?.()

            const baseClassName = `${context.prefixCls}-item`

            const className = [
                baseClassName,
                {
                    [`${baseClassName}-hidden`]: hidden,
                    [`${baseClassName}-active`]: active,
                    [`${baseClassName}-disabled`]: disabled,
                    [`${baseClassName}-dropdown`]: dropdown
                }
            ]

            const renderButton = () => {
                const button = (
                    <button type="button" class={className} onClick={onClick}>
                        {icon && isVNode(icon) && (
                            <span class={`${baseClassName}-icon`}>{icon}</span>
                        )}
                        {(text || children) && (
                            <span class={`${baseClassName}-text`}>{text || children}</span>
                        )}
                        {dropdown && dropdownArrow && (
                            <span class={`${baseClassName}-dropdown-arrow`} />
                        )}
                    </button>
                )

                if (tooltip && !tooltipAsTitle && !disabled) {
                    return (
                        <Tooltip
                            title={tooltip}
                            placement="bottom"
                            mouseEnterDelay={0}
                            mouseLeaveDelay={0}
                            {...tooltipProps}
                        >
                            {button}
                        </Tooltip>
                    )
                }

                return button
            }

            const content = renderButton()

            if (dropdown != null && !disabled) {
                const overlay = (
                    <div>
                        {dropdown.type === Menu
                            ? cloneVNode(dropdown, {
                                  onClick: onDropdownItemClick
                              })
                            : dropdown}
                    </div>
                )

                return (
                    <Dropdown
                        trigger="click"
                        {...{
                            ...dropdownProps,
                            disabled: disabled,
                            overlay
                        }}
                    >
                        {content}
                    </Dropdown>
                )
            }

            return content
        }
    }
})
