import type { App, Plugin } from "vue"
import { Menubar, menubarProps, type MenubarProps } from "./menubar"
import { MenubarItem } from "./item"

Menubar.install = (app: App) => {
  app.component(Menubar.name, Menubar)
  return app
}

Menubar.Item = MenubarItem

export default Menubar as typeof Menubar &
  Plugin & {
    readonly Item: typeof MenubarItem
  }

export { MenubarItem }

export { menubarProps }

export type { MenubarProps }
