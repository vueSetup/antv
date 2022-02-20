import { defineComponent, computed, reactive, watchEffect } from 'vue'
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

        const baseClassName = computed(() => `${props.prefixCls}-menubar`)

        const activeMenubar = () => {
            state.active = true
        }

        const context = reactive<IMenubarContext>({
            prefixCls: baseClassName.value,
            menubarActived: state.active === true,
            activeMenubar
        })

        watchEffect(() => {
            Object.assign(context, {
                prefixCls: baseClassName.value,
                menubarActived: state.active === true
            })
        })

        return () => (
            <div class={baseClassName.value}>
                <div class={`${baseClassName.value}-content`}>
                    <div class={`${baseClassName.value}-content-inner`}>
                        <MenubarContextProvider value={context}>
                            {slots.default?.()}
                        </MenubarContextProvider>
                    </div>
                    {props.extra && (
                        <div class={`${baseClassName.value}-content-extras`}>{props.extra}</div>
                    )}
                </div>
            </div>
        )
    }
})

export default Menubar as typeof Menubar
