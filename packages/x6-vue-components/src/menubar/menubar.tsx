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

export const Menubar = defineComponent({
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

            const children = slots.default?.()

            const baseClassName = `${prefixCls}-menubar`

            return (
                <div class={baseClassName}>
                    <div class={`${baseClassName}-content`}>
                        <div class={`${baseClassName}-content-inner`}>
                            <MenubarContextProvider value={context}>
                                {children}
                            </MenubarContextProvider>
                        </div>
                        {extra && <div class={`${baseClassName}-content-extras`}>{extra}</div>}
                    </div>
                </div>
            )
        }
    }
})
