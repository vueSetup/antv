import { defineComponent, reactive, watchEffect } from "vue"
import type { PropType, VNodeChild, ExtractPropTypes } from "vue"
import { IToolbarContext, ToolbarContextProvider } from "./context"

export const toolbarProps = {
  prefixCls: {
    type: String,
    default: "x6",
  },
  extra: [Object, Array] as PropType<VNodeChild>,
  size: String as PropType<"small" | "big">,
  hoverEffect: Boolean,
  align: String as PropType<"left" | "right">,
  onClick: Function as PropType<(name: string, value?: unknown) => void>,
}

export type ToolbarProps = ExtractPropTypes<typeof toolbarProps>

export default defineComponent({
  props: toolbarProps,
  emits: ["click"],
  setup(props, { slots, emit }) {
    const onClick = (name: string, value?: any) => {
      emit("click", name, value)
    }

    const context = reactive<IToolbarContext>({
      onClick,
    })

    watchEffect(() => {
      context.prefixCls = `${props.prefixCls}-toolbar`
    })

    return () => {
      const { prefixCls, size, align, hoverEffect, extra } = props

      const baseClassName = `${prefixCls}-toolbar`

      const classNames = [
        baseClassName,
        {
          [`${baseClassName}-${size}`]: size,
          [`${baseClassName}-align-right`]: align === "right",
          [`${baseClassName}-hover-effect`]: hoverEffect,
        },
      ]

      const children = slots.default?.()

      return (
        <div class={classNames}>
          <div class={`${baseClassName}-content`}>
            <div class={`${baseClassName}-content-inner`}>
              <ToolbarContextProvider value={context}>
                {children}
              </ToolbarContextProvider>
            </div>
            {extra && (
              <div class={`${baseClassName}-content-extras`}>{extra}</div>
            )}
          </div>
        </div>
      )
    }
  },
})
