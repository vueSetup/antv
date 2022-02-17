// https://github.com/antvis/XFlow/blob/master/packages/xflow-core/src/xflow-main/components/app-context.tsx
import { computed, defineComponent, onBeforeMount, onMounted, reactive, watchEffect } from 'vue'
import type { PropType, InjectionKey } from 'vue'
import { createContext, useContext } from '../composables'
import type { FrontendApplication } from '../application'

interface IAppContainer {
    getApp: () => FrontendApplication | null
    setApp: (app: FrontendApplication) => void
    onAppChange: (callback: (app: FrontendApplication) => void) => void
    isUserDefined: () => boolean
    dispose: () => void
}

class AppContainer implements IAppContainer {
    private cache: FrontendApplication | null = null
    private isUserDefinedFlag: boolean
    private onAppChangeCallback: (app: FrontendApplication) => void

    constructor(isUserDefined: boolean = false) {
        this.isUserDefinedFlag = isUserDefined
    }

    getApp() {
        return this.cache
    }

    setApp(app: FrontendApplication) {
        this.cache = app
        if (this.onAppChangeCallback) {
            this.onAppChangeCallback(app)
        }
    }

    onAppChange(callback: (app: FrontendApplication) => void) {
        this.onAppChangeCallback = callback
    }

    isUserDefined() {
        return this.isUserDefinedFlag
    }

    dispose() {
        this.cache = null
    }
}

/** AppContext */
const contextKey: InjectionKey<IAppContainer> = Symbol('XFlow.App')
const ContextProvider = createContext<IAppContainer>(contextKey)

/** AppContext: 获取 appContainer */
const useXFlowAppContainer = () => useContext<IAppContainer>(contextKey)

/** AppContext:获取 app */
export const useXFlowApp = () => {
    const container = useContext<IAppContainer>(contextKey)
    return container && container.getApp ? container.getApp() : null
}

/** XFlow内部使用 */
export const XFlowAppInternalProvider = defineComponent({
    props: {
        app: Object as PropType<FrontendApplication>
    },
    setup(props, { slots }) {
        const state = reactive<{
            appContainer: IAppContainer
        }>({
            appContainer: new AppContainer()
        })

        const isUserDefined = computed(() => state.appContainer.isUserDefined())

        onBeforeMount(() => {
            const userDefinedAppContainer = useXFlowAppContainer()
            if (userDefinedAppContainer && userDefinedAppContainer.isUserDefined()) {
                state.appContainer = userDefinedAppContainer
            }
        })

        watchEffect(() => {
            if (props.app) {
                state.appContainer.setApp(props.app)
            }
        })

        return () =>
            isUserDefined.value ? (
                <>{slots.default?.()} </>
            ) : (
                <ContextProvider value={{ ...state.appContainer }}>
                    {slots.default?.()}
                </ContextProvider>
            )
    }
})

/** XFlow外部使用 */
export const XFlowAppProvider = defineComponent({
    setup(props, { slots }) {
        const state = reactive<{
            appContainer: IAppContainer
        }>({
            appContainer: new AppContainer(true)
        })

        // TODO :: add callback
        /**
         * const [, setTick] = React.useState<number>(null)
         * appContainer.onAppChange(() => setTick(0))
         */
        state.appContainer.onAppChange(() => {})

        return () => <ContextProvider>{slots.default?.()}</ContextProvider>
    }
})
