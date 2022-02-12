import { InjectionKey } from 'vue'
import { createContext, useContext } from './useContext'

export interface MenubarContexts {
    prefixCls: string
    activeMenubar: () => void
    menubarActived: boolean
}

const contextKey: InjectionKey<MenubarContexts> = Symbol()

const createMenubarContext = createContext<MenubarContexts>(contextKey, 'MenubarContext.Provider')

export const useMenubarContext = useContext<MenubarContexts>(contextKey)

export default createMenubarContext
