import { defineComponent, computed, reactive, watchEffect } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useMenubarContext } from './context'

export const menubarItemProps = {
    text: String,
    hidden: Boolean
}

export type MenubarItemProps = ExtractPropTypes<typeof menubarItemProps>

export const MenubarItem = defineComponent({
    props: menubarItemProps,
    setup(props, { slots }) {
        const state = reactive<{
            active: boolean
            cacheDeactiveMap: WeakMap<Object, any>
        }>({
            active: false,
            cacheDeactiveMap: new WeakMap()
        })

        const context = useMenubarContext()

        const currentMenuActived = computed(() => context.menubarActived && state.active)

        const baseClassName = computed(() => `${context.prefixCls}-item`)

        const className = computed(() => [
            baseClassName.value,
            {
                [`${baseClassName.value}-hidden`]: props.hidden,
                [`${baseClassName.value}-hover`]: context.menubarActived,
                [`${baseClassName.value}-active`]: currentMenuActived.value
            }
        ])

        const textClassName = computed(() => [
            `${baseClassName.value}-text`,
            {
                [`${baseClassName.value}-text-active`]: currentMenuActived.value
            }
        ])

        const popupClassName = computed(() => `${context.prefixCls}-item-dropdown`)

        const isPrevMenuHiddening = (e: MouseEvent) => {
            // @ts-ignore
            const toElement = e.toElement
            if (toElement && toElement.className === popupClassName.value) {
                return true
            }

            const currentTarget = e.currentTarget as HTMLDivElement
            const childNodes = currentTarget.parentElement!.childNodes
            for (let i = 0, l = childNodes.length; i < l; i += 1) {
                const child = childNodes[i] as HTMLDivElement
                if (child.querySelector) {
                    const popupElem = child.querySelector(`.${popupClassName.value}`)!
                    if (popupElem.contains(toElement)) {
                        return true
                    }
                }
            }

            return false
        }

        const active = () => {
            state.active = true
        }

        const deactive = () => {
            state.active = false
        }

        const cacheDeactive = (ele: HTMLDivElement) => {
            state.cacheDeactiveMap.set(ele, deactive)
        }

        const removeDeactive = (ele: HTMLDivElement) => {
            state.cacheDeactiveMap.delete(ele)
        }

        const callDeactive = (ele: HTMLDivElement) => {
            if (state.cacheDeactiveMap.has(ele)) {
                state.cacheDeactiveMap.get(ele)()
                state.cacheDeactiveMap.delete(ele)
            }
        }

        const onMouseEnter = (e: MouseEvent) => {
            if (context.menubarActived && !state.active && !isPrevMenuHiddening(e)) {
                const currentTarget = e.currentTarget as HTMLDivElement
                const childNodes = currentTarget.parentElement!.childNodes

                childNodes.forEach((child) => {
                    if (child === currentTarget) {
                        removeDeactive(child as HTMLDivElement)
                    } else {
                        callDeactive(child as HTMLDivElement)
                    }
                })

                active()
            }
        }

        const onMouseLeave = (e: MouseEvent) => {
            const relatedTarget = e.relatedTarget
            const currentTarget = e.currentTarget as HTMLDivElement

            if (context.menubarActived && state.active) {
                const childNodes = currentTarget.parentElement!.childNodes
                let shoudDeactive = false
                if (relatedTarget !== window) {
                    for (let i = 0, l = childNodes.length; i < l; i += 1) {
                        const child = childNodes[i]
                        if (
                            child === relatedTarget ||
                            child.contains(relatedTarget as HTMLDivElement)
                        ) {
                            shoudDeactive = true
                            break
                        }
                    }
                }

                if (shoudDeactive) {
                    deactive()
                } else {
                    // 缓存一下，当再次 hover 到其他菜单时被调用
                    cacheDeactive(currentTarget)
                }
            }
        }

        const onClick = (e: MouseEvent) => {
            context.activeMenubar()
            const currentTarget = e.currentTarget as HTMLDivElement
            removeDeactive(currentTarget.parentElement as HTMLDivElement)
            active()
        }

        return () => (
            <div class={className.value} onMouseenter={onMouseEnter} onMouseleave={onMouseLeave}>
                <div class={textClassName.value} onClick={onClick}>
                    {props.text}
                </div>
                <div class={popupClassName.value}>{slots.default?.()}</div>
            </div>
        )
    }
})
