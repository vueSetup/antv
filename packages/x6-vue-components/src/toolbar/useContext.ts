import {
    defineComponent,
    reactive,
    provide,
    inject,
    readonly,
    watchEffect,
    DefineComponent,
    SetupContext,
    InjectionKey,
    PropType,
    VNode
} from 'vue'

export type ContextType<T> = any

export type CreateContext<T> = DefineComponent<
    {},
    () => VNode | VNode[] | undefined,
    any
>

export const createContext = <T>(
    contextKey: InjectionKey<ContextType<T>> = Symbol(),
    componentName: string = 'Context.Provider',
    isReadonly: boolean = true
): CreateContext<T> => {
    const ContextProvider = defineComponent({
        name: componentName,
        props: {
            value: {
                type: Object as PropType<ContextType<T>>,
                required: true
            }
        },
        setup(props: { value: ContextType<T> }, { slots }: SetupContext) {
            const context = reactive<ContextType<T>>(props.value)

            watchEffect(() => {
                Object.assign(context, props.value)
            })

            provide(contextKey, isReadonly ? readonly(context) : context)
        },render(){
            return (this.$slots.default?.())
        }
    })

    return ContextProvider as any
}

export const useContext = <T>(
    contextKey: string | InjectionKey<ContextType<T>> = Symbol(),
    defaultValue?: ContextType<T>
): T => {
    return inject(contextKey, defaultValue || ({} as T))
}

// :: examples ::
//
// interface MyContextProps {
//   param1: string;
//   param2: boolean;
//   someData?: string[];
// }
//
// const [ state, ContextProvider ] = createContext<MyContextProps>({
//   param1: 'abc',
//   param2: false,
//   someData: ['a', 'b', 'c', 'd']
// });
//
// const value = useContext<MyContextProps>();
//
// console.log('value', toRaw(value));
// console.log('param1', value.param1); // 'abc'
// console.log('param2', value.param2); // false
// console.log('someData', value.someData); // ['a', 'b', 'c', 'd']
