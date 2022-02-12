import { InjectionKey, ExtractPropTypes } from 'vue'
import { createContext, useContext } from './useContext'

interface ContextTypes {
    prefixCls: String
    onClick?: (name: string, value?: any) => void
}

const contextKey: InjectionKey<ContextTypes> = Symbol()

const createToolbarContext = () =>
    createContext<ContextTypes>(contextKey, 'ToolbarContext.Provider')

export const useToolbarContext = () =>
    useContext<Required<ContextTypes>>(contextKey)

export default createToolbarContext()
