import type { InjectionKey } from 'vue'
import { createContext, useContext } from '../composables'

export interface IToolbarContext {
    prefixCls?: string
    onClick: (key: string, value?: unknown) => void
}

const contextKey: InjectionKey<IToolbarContext> = Symbol('Toolbar')

export const ToolbarContextProvider = createContext<IToolbarContext>(
    contextKey,
    'ToolbarContextProvider'
)

export const useToolbarContext = () => useContext<IToolbarContext>(contextKey, {})
