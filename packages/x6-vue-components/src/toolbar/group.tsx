import { defineComponent } from 'vue'
import { useToolbarContext } from './context'

export default defineComponent({
  setup(props, { slots }) {
    const context = useToolbarContext()

    return () => {
      const baseClassName = [`${context.prefixCls}-group`]

      const children = slots.default?.()

      return <div class={baseClassName}>{children}</div>
    }
  },
})
