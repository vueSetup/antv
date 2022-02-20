import type { InjectionKey } from "vue"
import { createContext, useContext } from "../composables";

export interface IMenubarContext {
    prefixCls: string
    activeMenubar: () => void
    menubarActived: boolean
}

const contextKey: InjectionKey<IMenubarContext> = Symbol('Menubar')

export const MenubarContextProvider =
    createContext<IMenubarContext>(contextKey, 'MenubarContextProvider')

export const useMenubarContext = () =>
    useContext<IMenubarContext>(contextKey, {})
