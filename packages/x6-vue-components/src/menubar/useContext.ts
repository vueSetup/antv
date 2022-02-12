import { defineComponent, InjectionKey, VNode, PropType, SetupContext, DefineComponent, provide, inject, readonly } from 'vue'

export type ContextType<T> = any

export type CreateContext<T> = DefineComponent<{}, () => VNode | VNode[] | undefined, any>

export const createContext = <T>(
    contextKey: string | InjectionKey<ContextType<T>> = Symbol(),
    providerName: string = 'Context.Provider',
    isReadonly: boolean = true
) => {
    const ContextProvider = defineComponent({
        name: providerName,
        props: {
            value: {
                type: Object as PropType<ContextType<T>>,
                required: true
            }
        },
        setup(props: { value: ContextType<T> }, { slots }: SetupContext) {
            provide(contextKey, isReadonly ? readonly(props.value) : props.value)
            return () => slots.default?.()
        }
    })
    return ContextProvider as any
}

export const useContext = <T>(
    contextKey: string | InjectionKey<ContextType<T>> = Symbol(),
    defaultValue?: ContextType<T>
) => {
    return inject(contextKey, defaultValue || ({} as T))
}