import { computed, defineComponent, reactive } from 'vue'
import type { PropType, VNodeChild } from 'vue'
import { ToolbarContextProvider } from './context'
import { ToolbarItem } from './item'
import { ToolbarGroup } from './group'

const props = {
    prefixCls: {
        type: String,
        default: 'x6'
    },
    extra: [Object, Array] as PropType<VNodeChild>,
    size: String as PropType<'small' | 'big'>,
    hoverEffect: Boolean,
    align: String as PropType<'left' | 'right'>,
    onClick: Function as PropType<(name: string, value?: any) => void>
}

const Toolbar = defineComponent({
    props,
    setup(props, { slots, emit }) {
        const baseClassName = computed(() => `${props.prefixCls}-toolbar`)

        const className = computed(() => [
            baseClassName.value,
            {
                [`${baseClassName}-${props.size}`]: props.size,
                [`${baseClassName}-align-right`]: props.align === 'right',
                [`${baseClassName}-hover-effect`]: props.hoverEffect
            }
        ])

        const onClick = (name: string, value?: any) => {
            emit('click', name, value)
        }

        return () => (
            <div class={className.value}>
                <div class={`${baseClassName.value}-content`}>
                    <div class={`${baseClassName.value}-content-inner`}>
                        <ToolbarContextProvider
                            value={{
                                prefixCls: baseClassName.value,
                                onClick
                            }}
                        >
                            {slots.default?.()}
                        </ToolbarContextProvider>
                    </div>
                    {props.extra && (
                        <div class={`${baseClassName.value}-content-extras`}>{props.extra}</div>
                    )}
                </div>
            </div>
        )
    }
})

export default Toolbar as typeof Toolbar & {
    readonly Item: typeof ToolbarItem
    readonly Group: typeof ToolbarGroup
}
