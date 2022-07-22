// Fork from https://github.com/vueComponent/pro-components/blob/next/packages/pro-layout/src/hooks/context/index.ts
import { defineComponent, provide, inject, readonly } from 'vue'
import type { DefineComponent, VNode, InjectionKey, PropType } from 'vue'

export type ContextType<T> = any

export type CreateContext<T> = DefineComponent<{}, () => VNode | VNode[] | undefined, any>

export const createContext = <T>(
    contextKey: InjectionKey<ContextType<T>> = Symbol(),
    componentName: string = 'Context.Provider'
): CreateContext<T> => {
    const ContextProvider = defineComponent({
        name: componentName,
        props: {
            value: {
                type: Object as PropType<ContextType<T>>,
                required: true
            }
        },
        setup(props: { value: ContextType<T> }, { slots }) {
            provide(contextKey, readonly(props.value))
            return () => slots.default?.()
        }
    })

    return ContextProvider as any
}

export const useContext = <T>(
    contextKey: string | InjectionKey<ContextType<T>> = Symbol(),
    defaultValue?: ContextType<T>
): T => {
    return inject(contextKey, defaultValue ?? ({} as T))
}

// :: examples ::
// import { defineComponent, InjectionKey, isReactive, reactive, toRefs } from 'vue'
//
// interface CustomContext {
//     param1?: string
//     param2?: boolean
//     someData?: string[]
// }
//
// const contextKey: InjectionKey<CustomContext> = Symbol()
//
// const ContextProvider = createContext<CustomContext>(contextKey)
//
// const ContextConsumer = defineComponent({
//     setup() {
//         const state = useContext<CustomContext>(contextKey, {
//             param1: 'param1',
//             param2: true,
//             someData: ['param1', 'param2']
//         })
//         return () => JSON.stringify(state)
//     }
// })
//
// export default defineComponent({
//     setup() {
//         const state = reactive<CustomContext>({
//             param1: 'param111',
//             param2: false,
//             someData: ['param111', 'param222']
//         })
//
//         return () => (
//             <>
//                 <ContextConsumer />
//                 <ContextProvider value={state}>
//                     <ContextConsumer />
//                 </ContextProvider>
//             </>
//         )
//     }
// })
