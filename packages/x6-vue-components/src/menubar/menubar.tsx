import { defineComponent, PropType, VNode } from 'vue'
import MenubarContextProvider, { MenubarContexts } from './context'

export const MenubarProps = {
    prefixCls: String,
    className: String,
    extra: Object as PropType<VNode>
}

export default defineComponent({
    props: MenubarProps,
    setup() {

    },
    render() {
        const { prefixCls = 'x6', className, extra } = this.$props
        const children = this.$slots.default?.()
        const baseCls = `${prefixCls}-menubar`
        const classNames = {
            [baseCls]: true,
            [className]: true
        }
        const contextValue: MenubarContexts = {
            prefixCls: baseCls,
            activeMenubar: this.activeMenubar,
            menubarActived: this.state.active === true,
        }
        return (
            <div class={classNames}>
                <div class={`${baseCls}-content`}>
                    <div class={`${baseCls}-content-inner`}>
                        <MenubarContextProvider value={contextValue}>
                            {children}
                        </MenubarContextProvider>
                    </div>
                    {extra && <div class={`${baseCls}-content-extras`}>{extra}</div>}
                </div>
            </div>
        )
    }
})