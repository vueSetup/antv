import { defineComponent, onMounted, onUnmounted, isVNode } from 'vue'
import type { PropType, VNodeChild, ExtractPropTypes } from 'vue'
import { useMenuContext } from './context'

export const menuItemProps = {
  name: String,
  text: [String, Object] as PropType<string | VNodeChild>,
  icon: [String, Object] as PropType<VNodeChild>,
  hotkey: String,
  active: Boolean,
  hidden: Boolean,
  disabled: Boolean,
  onClick: Function as PropType<() => void>,
}

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>

export default defineComponent({
  props: menuItemProps,
  emits: ['click'],
  slots: ['innerExtra', 'outerExtra'],
  setup(props, { slots, emit }) {
    const context = useMenuContext()

    const triggerHandler = (e?: MouseEvent) => {
      if (!props.disabled && !props.hidden) {
        props.name && context.onClick(props.name, e)
        emit('click')
      }
    }

    const onHotkey = () => triggerHandler()

    const onClick = (e: MouseEvent) => triggerHandler(e)

    onMounted(() => {
      props.hotkey && context.registerHotkey(props.hotkey, onHotkey)
    })

    onUnmounted(() => {
      props.hotkey && context.unregisterHotkey(props.hotkey, onHotkey)
    })

    return () => {
      const { active, disabled, hidden, text, icon, hotkey } = props

      const baseClassName = `${context.prefixCls}-item`

      const className = [
        baseClassName,
        {
          [`${baseClassName}-active`]: active,
          [`${baseClassName}-hidden`]: hidden,
          [`${baseClassName}-disabled`]: disabled,
        },
      ]

      const children = slots.default?.()

      return (
        <div class={className}>
          <button
            type="button"
            class={`${baseClassName}-button`}
            onClick={onClick}
          >
            {icon && isVNode(icon) && (
              <span class={`${baseClassName}-icon`}>{icon}</span>
            )}
            <span class={`${baseClassName}-text`}>{text ?? children}</span>
            {hotkey && <span class={`${baseClassName}-hotkey`}>{hotkey}</span>}
            {slots.innerExtra?.()}
          </button>
          {slots.outerExtra?.()}
        </div>
      )
    }
  },
})
