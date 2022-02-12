import { defineComponent, toRefs, PropType, isVNode, ExtractPropTypes, VNode, ref } from 'vue'
import { Tooltip, Dropdown } from 'ant-design-vue'
import { TooltipProps } from 'ant-design-vue/es/tooltip/Tooltip'
import { DropdownProps } from "ant-design-vue/es/dropdown/dropdown"
import addEventListenerWrap from './addEventListener'

import { useMenubarContext } from './context'


export const MenubarItemProps = {
    className: String,
    hidden: Boolean,
    disabled: Boolean,
    active: Boolean,
    icon: Object as PropType<VNode>,
    text: String,
    tooltip: Object as PropType<VNode>,
    tooltipProps: Object as PropType<TooltipProps>,
    tooltipAsTitle: Boolean,
    dropdown: Object as PropType<VNode>,
    dropdownArrow: Boolean,
    dropdownProps: Object as PropType<ExtractPropTypes<typeof DropdownProps>>
}

export const MenubarItem = defineComponent({
    props: MenubarItemProps,
    setup() {
        const context = useMenubarContext()

        const actived = ref(false)

        return { ...toRefs(context), actived }
    },
    render() {
        const cacheDeactiveMap = new WeakMap()
        let removeDocClickEvent: (() => void) | null

        const onDocumentClick = () => {
            this.deactive()
        }
        const onClick = (e: MouseEvent) => {
            this.activeMenubar()
            this.removeDeactive(e.currentTarget.parentElement)
            this.active()
        }

        const isPrevMenuHiddening = (e: MouseEvent): boolean => {
            const toElement = (e.nativeEvent as any).toElement
            if (toElement && toElement.className === this.popupClassName) {
                return true
            }

            const currentTarget = e.currentTarget as HTMLDivElement
            const childNodes = currentTarget.parentElement!.childNodes
            for (let i = 0, l = childNodes.length; i < l; i += 1) {
                const child = childNodes[i] as HTMLDivElement
                const popupElem = child.querySelector(`.${this.popupClassName}`)!
                if (popupElem.contains(toElement)) {
                    return true
                }
            }

            return false
        }

        const onMouseEnter = (e: MouseEvent) => {
            if (
                this.menubarActived &&
                !this.actived &&
                !isPrevMenuHiddening(e)
            ) {
                const currentTarget = e.currentTarget as HTMLDivElement
                const childNodes = currentTarget.parentElement!.childNodes

                childNodes.forEach((child) => {
                    if (child === currentTarget) {
                        this.removeDeactive(child)
                    } else {
                        this.callDeactive(child)
                    }
                })

                active()
            }
        }

        const onMouseLeave = (e: MouseEvent) => {
            const relatedTarget = e.relatedTarget
            const currentTarget = e.currentTarget as HTMLDivElement

            if (this.menubarActived && this.actived) {
                const childNodes = currentTarget.parentElement!.childNodes
                let shoudDeactive = false
                if (relatedTarget !== window) {
                    for (let i = 0, l = childNodes.length; i < l; i += 1) {
                        const child = childNodes[i]
                        if (
                            child === relatedTarget ||
                            child.contains(relatedTarget as HTMLDivElement)
                        ) {
                            shoudDeactive = true
                            break
                        }
                    }
                }

                if (shoudDeactive) {
                    this.deactive()
                } else {
                    // 缓存一下，当再次 hover 到其他菜单时被调用
                    this.cacheDeactive(currentTarget)
                }
            }
        }

        const active = () => {
            this.actived = true
            if (!removeDocClickEvent) {
                removeDocClickEvent = addEventListenerWrap(
                    document.documentElement,
                    'click',
                    this.onDocumentClick,
                ).remove
            }
        }









        const { text, hidden } = this.$props
        const children = this.$slots.default?.()
        const baseCls = `${this.prefixCls}-item`
        const popupClassName = `${this.prefixCls}-item-dropdown`
        const classNames = {
            ['baseCls']: true,
            [`${baseCls}-hidden`]: hidden,
            [`${baseCls}-hover`]: menubarActived,
            [`${baseCls}-active`]: currentMenuActived,
        }
        return (
            <div
                class={classNames}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <div
                    class={{
                        [`${baseCls}-text`]: true,
                        [`${baseCls}-text-active`]: currentMenuActived
                    }}
                    onClick={this.onClick}
                >
                    {text}
                </div>
                <div class={popupClassName}>{children}</div>
            </div >
        )
        const renderButton = () => {
            const {
                className,
                hidden,
                disabled,
                active,
                icon,
                text,
                dropdown,
                dropdownArrow,
                tooltip,
                tooltipProps,
                tooltipAsTitle,
            } = this.$props

            const children = this.$slots.default?.()

            const baseCls = `${this.prefixCls}-item`
            //TO DO:classsName
            const classNames = {
                ['baseCls']: true,
                [`${baseCls}-hidden`]: hidden,
                [`${baseCls}-active`]: active,
                [`${baseCls}-disabled`]: disabled,
                [`${baseCls}-dropdown`]: dropdown,
            }

            const buttonProps: any = {
                class: classNames,
                onClick: this.handleClick
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
        }
    }
})