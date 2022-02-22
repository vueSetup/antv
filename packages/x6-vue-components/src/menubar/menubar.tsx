import { defineComponent, computed, reactive, watchEffect, watch } from 'vue'
import type { PropType, VNodeChild, ExtractPropTypes } from 'vue'
import { IMenubarContext, MenubarContextProvider } from './context'

export const menubarProps = {
    prefixCls: {
        type: String,
        default: 'x6'
    },
    extra: [String, Object] as PropType<VNodeChild>
}

export type MenubarProps = ExtractPropTypes<typeof menubarProps>

const Menubar = defineComponent({
    props: menubarProps,
    setup(props, { slots }) {
        const state = reactive<{
            active: Boolean
        }>({
            active: false
        })

        const context = reactive<IMenubarContext>({
            activeMenubar: () => {
                state.active = true
            }
        })

        watchEffect(() => {
            Object.assign(context, {
                prefixCls: `${props.prefixCls}-menubar`,
                menubarActived: state.active === true
            })
        })

        return () => {
            const { prefixCls, extra } = props

            const className = `${prefixCls}-menubar`

            return (
                <div class={className}>
                    <div class={`${className}-content`}>
                        <div class={`${className}-content-inner`}>
                            <MenubarContextProvider value={context}>
                                {slots.default?.()}
                            </MenubarContextProvider>
                        </div>
                        {extra && <div class={`${className}-content-extras`}>{extra}</div>}
                    </div>
                </div>
            )
        }
    }
})

export default Menubar as typeof Menubar
