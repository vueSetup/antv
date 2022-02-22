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
        const onClick = (name: string, value?: any) => {
            emit('click', name, value)
        }

        const context = reactive<IToolbarContext>({
            onClick
        })

        watchEffect(() => {
            context.prefixCls = `${props.prefixCls}-toolbar`
        })

        return () => {
            const baseClassName = `${props.prefixCls}-toolbar`

            const className = [
                baseClassName,
                {
                    [`${baseClassName}-${props.size}`]: props.size,
                    [`${baseClassName}-align-right`]: props.align === 'right',
                    [`${baseClassName}-hover-effect`]: props.hoverEffect
                }
            ]

            return (
                <div class={className}>
                    <div class={`${baseClassName}-content`}>
                        <div class={`${baseClassName}-content-inner`}>
                            <ToolbarContextProvider value={context}>
                                {slots.default?.()}
                            </ToolbarContextProvider>
                        </div>
                        {props.extra && (
                            <div class={`${baseClassName}-content-extras`}>{props.extra}</div>
                        )}
                    </div>
                </div>
            )
        }
    }
})

export default Toolbar as typeof Toolbar & {
    readonly Item: typeof ToolbarItem
    readonly Group: typeof ToolbarGroup
}
