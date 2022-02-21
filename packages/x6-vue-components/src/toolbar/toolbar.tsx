import { defineComponent, computed, reactive, watchEffect } from 'vue'
import type { PropType, VNodeChild, ExtractPropTypes } from 'vue'
import { IToolbarContext, ToolbarContextProvider } from './context'
import { ToolbarItem } from './item'
import { ToolbarGroup } from './group'

const toolbarProps = {
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

export type ToolbarProps = ExtractPropTypes<typeof toolbarProps>

const Toolbar = defineComponent({
    props: toolbarProps,
    emits: ['click'],
    setup(props, { slots, emit }) {
        const baseClassName = computed(() => `${props.prefixCls}-toolbar`)

        const className = computed(() => [
            baseClassName.value,
            {
                [`${baseClassName.value}-${props.size}`]: props.size,
                [`${baseClassName.value}-align-right`]: props.align === 'right',
                [`${baseClassName.value}-hover-effect`]: props.hoverEffect
            }
        ])

        const onClick = (name: string, value?: any) => {
            emit('click', name, value)
        }

        const context = reactive<IToolbarContext>({
            onClick
        })

        watchEffect(() => {
            context.prefixCls = baseClassName.value
        })

        return () => (
            <div class={className.value}>
                <div class={`${baseClassName.value}-content`}>
                    <div class={`${baseClassName.value}-content-inner`}>
                        <ToolbarContextProvider value={context}>
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
