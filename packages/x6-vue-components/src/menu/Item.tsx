import {
    defineComponent,
    computed,
    onMounted,
    onUnmounted,
    reactive,
    watchEffect,
    toRefs,
    isVNode
} from 'vue'
import type { PropType, VNodeChild, ExtractPropTypes } from 'vue'
import { useMenuContext } from './context'

export const menuItemProps = {
    name: String,
    text: [String, Object] as PropType<String | VNodeChild>,
    icon: [String, Object] as PropType<VNodeChild>,
    hotkey: String,
    active: Boolean,
    hidden: Boolean,
    disabled: Boolean,
    onClick: Function as PropType<() => void>
}

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>

export const MenuItem = defineComponent({
    props: menuItemProps,
    setup(props, { slots, emit }) {
        const context = useMenuContext()

        const baseClassName = computed(() => `${context.prefixCls}-item`)

        const className = computed(() => [
            baseClassName.value,
            {
                [`${baseClassName.value}-active`]: props.active,
                [`${baseClassName.value}-hidden`]: props.hidden,
                [`${baseClassName.value}-disabled`]: props.disabled
            }
        ])

        const triggerHandler = (e?: MouseEvent) => {
            if (!props.disabled && !props.hidden) {
                if (props.name) {
                    context.onClick(props.name, e)
                }
                emit('click')
            }
        }

        const onHotkey = () => triggerHandler()

        const onClick = (e: MouseEvent) => triggerHandler(e)

        onMounted(() => {
            if (props.hotkey) {
                context.registerHotkey(props.hotkey, onHotkey)
            }
        })

        onUnmounted(() => {
            if (props.hotkey) {
                context.unregisterHotkey(props.hotkey, onHotkey)
            }
        })

        return () => (
            <div class={className.value}>
                <button type="button" class={`${baseClassName.value}-button`} onClick={onClick}>
                    {props.icon && isVNode(props.icon) && (
                        <span class={`${baseClassName.value}-icon`}>{props.icon}</span>
                    )}
                    <span class={`${baseClassName.value}-text`}>
                        {props.text || slots.default?.()}
                    </span>
                    {props.hotkey && (
                        <span class={`${baseClassName.value}-hotkey`}>{props.hotkey}</span>
                    )}
                    {slots.innerExtra?.()}
                </button>
                {slots.outerExtra?.()}
            </div>
        )
    }
})
