import type { InjectionKey } from "vue"
import { createContext, useContext } from "../composables";

export interface IMenuContext {
    prefixCls?: string
    onClick: (name: string, e?: MouseEvent) => void
    registerHotkey: (hotkey: string, handler: () => any) => void
    unregisterHotkey: (hotkey: string, handler: () => any) => void
}

const contextKey: InjectionKey<IMenuContext> = Symbol('Menu')

export const MenuContextProvider =
    createContext<IMenuContext>(contextKey, 'MenuContextProvider')

export const useMenuContext = () =>
    useContext<IMenuContext>(contextKey, {})
