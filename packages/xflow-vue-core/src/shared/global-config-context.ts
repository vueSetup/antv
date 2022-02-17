// https://github.com/antvis/XFlow/blob/master/packages/xflow-core/src/xflow-main/components/global-config-context.tsx
import type { InjectionKey } from 'vue'
import { createContext, useContext } from '../composables'
import { XFLOW_PREFIX_CLS } from '../constants'

class ConfigProvider {
    private xflowPrefixCls: string = XFLOW_PREFIX_CLS

    getXflowPrefixCls = (pkgName: string) => {
        return `${this.xflowPrefixCls}-${pkgName}`
    }

    setXflowPrefixCls = (prefixCls: string) => {
        return (this.xflowPrefixCls = prefixCls)
    }
}

interface IContext {
    configProvider: ConfigProvider
}

const contextKey: InjectionKey<IContext> = Symbol('XFlow.Config')
const ContextProvider = createContext<IContext>(contextKey)

export const useConfigContext = () => {
    return useContext<IContext>(contextKey)
}

export const useXflowPrefixCls = (pkgName: string) => {
    const context = useContext<IContext>(contextKey)
    return context.configProvider ?
        context.configProvider.getXflowPrefixCls(pkgName) : `${XFLOW_PREFIX_CLS}-${pkgName}`
}

export { ContextProvider as XFlowConfigProvider }
