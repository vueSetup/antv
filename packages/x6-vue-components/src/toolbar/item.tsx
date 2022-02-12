import { defineComponent, toRefs, isVNode, ExtractPropTypes, FunctionalComponent, cloneVNode, VNode, PropType } from "vue"
import { useToolbarContext } from "./context"
import Tooltip, { TooltipProps } from "ant-design-vue/es/tooltip/Tooltip"
import { DropdownProps } from "ant-design-vue/es/dropdown/dropdown"
import { DropDown } from '../dropdown'
import Menu from '../menu'
import './style'

export const ToolbarItemProps = {
    name: String,
    icon: Object as PropType<VNode>,
    text: [String, Object] as PropType<String | VNode>,
    hidden: Boolean,
    disabled: Boolean,
    active: Boolean,
    tooltip: String,
    tooltipProps: Object as PropType<TooltipProps>,
    tooltipAsTitle: Boolean,
    dropdown: Object as PropType<VNode>,
    dropdownArrow: Boolean,
    dropdownProps: Object as PropType<ExtractPropTypes<typeof DropdownProps>>,
    onClick: Function as PropType<(name?: string) => void>
}

export const ToolbarItem = defineComponent({
    props: ToolbarItemProps,
    setup() {
        const context = useToolbarContext()
        return { ...toRefs(context) }
    },
    render() {
        const {
            name,
            hidden,
            disabled,
            active,
            icon,
            text,
            dropdown,
            dropdownArrow,
            dropdownProps,
            tooltip,
            tooltipProps,
            tooltipAsTitle,
            onClick
        } = this.$props
        const children = this.$slots.default?.()


        const handleClick = () => {
            processClick(name, dropdown)
        }

        const handleDropdownItemClick = (name?: string) => {
            processClick(name, false)
        }

        const processClick = (name, dropdown) => {
            if (!disabled && !dropdown) {
                if (name) {
                    this.onClick(name)
                }

                if (onClick) {
                    onClick(name)
                }
            }
        }

        const renderButton = () => {
            const baseCls = `${this.prefixCls}-item`
            const classNames = {
                [baseCls]: true,
                [`${baseCls}-hidden`]: hidden,
                [`${baseCls}-active`]: active,
                [`${baseCls}-disabled`]: disabled,
                [`${baseCls}-dropdown`]: dropdown,
            }
            //TO DO:className

            const buttonProps: Record<string, any> = {
                class: classNames,
                // onClick: (payload: MouseEvent) => { }
                onClick: handleClick
            }

            if (tooltip && tooltipAsTitle) {
                buttonProps.title = tooltip
            }

            const button = (
                <button type="button" {...buttonProps}>
                    {icon && isVNode(icon) && (
                        <span class={`${baseCls}-icon`}>{icon}</span>
                    )}
                    {(text || children) && (
                        <span class={`${baseCls}-text`}>{text || children}</span>
                    )}
                    {dropdown && dropdownArrow && (
                        <span class={`${baseCls}-dropdown-arrow`} />
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

        // TODO :: dropdown
        if (dropdown != null && !disabled) {
            const overlay = (
                <div>
                    {dropdown.type === Menu
                        ? cloneVNode(dropdown, {
                            onClick: handleDropdownItemClick,
                        })
                        : dropdown}
                </div>
            )

            const props = {
                trigger: ['click'],
                ...dropdownProps,
                disabled,
                overlay,
            } as ExtractPropTypes<typeof DropdownProps>

            return <DropDown {...props}>{content}</DropDown>
        }

        return content
    }
})

// export default ToolbarItem