import type { App, Plugin } from "vue"
import { default as Menu, menuProps, type MenuProps } from "./menu"
import { MenuSubMenu } from "./submenu"
import MenuItem, { menuItemProps, type MenuItemProps } from "./item"
import MenuDivider from "./divider"

Menu.install = (app: App) => {
  app.component(Menu.name, Menu)
  return app
}

Menu.Item = MenuItem
Menu.SubMenu = MenuSubMenu
Menu.Divider = MenuDivider

export default Menu as typeof Menu &
  Plugin & {
    readonly Item: typeof MenuItem
    readonly SubMenu: typeof MenuSubMenu
    readonly Divider: typeof MenuDivider
  }

export { MenuItem, MenuSubMenu, MenuDivider }

export { menuProps, menuItemProps }

export type { MenuProps, MenuItemProps }
