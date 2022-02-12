import { defineComponent, FunctionalComponent, isVNode, onMounted, onBeforeUnmount, PropType, VNodeChild, VNode } from "vue"

export const MenuItemProps = {
    class: String,
    name: String,
    text: [String, Object] as PropType<String | VNode>,
    icon: Object as PropType<VNode>,
    hotkey: String,
    active: Boolean,
    hidden: Boolean,
    disabled: Boolean,
    innerExtra: Object as PropType<JSX.Element>,
    outerExtra: Object as PropType<JSX.Element>,
    onClick: Function as PropType<(e?: MouseEvent) => void>,
    registerHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>,
    unregisterHotkey: Function as PropType<(hotkey: string, handler: () => void) => void>
}

const MenuItem = defineComponent({
    props: MenuItemProps,
    setup(props, { slots }) {
        const prefixCls = "x6-menu"
        const { class: propsClassName, hotkey } = props
        const children = slots.default?.()

        const baseClassName = `${prefixCls}-item`
        const classNames = {
            [baseClassName]: true,
            [propsClassName]: propsClassName,
            [`${baseClassName}-active`]: props.active,
            [`${baseClassName}-hidden`]: props.hidden,
            [`${baseClassName}-disabled`]: props.disabled,
        }

        onMounted(() => {
            if (hotkey && props.registerHotkey) {
                props.registerHotkey(hotkey, props.onClick)
            }
        })

        onBeforeUnmount(() => {
            if (hotkey && props.unregisterHotkey) {
                props.unregisterHotkey(hotkey, props.onClick)
            }
        })

        return () => (
            <div class={classNames}>
                <button type="button" class={`${baseClassName}-button`} onClick={props.onClick}>
                    {props.icon && isVNode(props.icon) && (
                        <span class={`${baseClassName}-icon`}>{props.icon}</span>
                    )}
                    <span class={`${baseClassName}-text`}>{props.text || children}</span>
                    {props.hotkey && <span class={`${baseClassName}-hotkey`}>{props.hotkey}</span>}
                    {props.innerExtra}
                </button>
                {props.outerExtra}
            </div>
        )
    }
})

export default MenuItem