import type { App } from "vue"

import { default as Menu, MenuItem, MenuSubMenu, MenuDivider } from "./menu"
import { default as Menubar, MenubarItem } from "./menubar"
import { Dropdown } from "./dropdown"
import { default as Toolbar, ToolbarItem, ToolbarGroup } from "./toolbar"
import { ContextMenu } from "./context-menu"

// export const install = (app: App) => {
//   const components = [
//     Menu,
//     MenuItem,
//     MenuSubMenu,
//     MenuDivider,
//     Menubar,
//     MenubarItem,
//     Dropdown,
//     Toolbar,
//     ToolbarItem,
//     ToolbarGroup,
//     ContextMenu,
//   ]

//   components.forEach((component) => {
//     if (component.install) {
//       app.use(component)
//     }
//   })
// }

export {
  Menu,
  MenuItem,
  MenuSubMenu,
  MenuDivider,
  Menubar,
  MenubarItem,
  Dropdown,
  Toolbar,
  ToolbarItem,
  ToolbarGroup,
  ContextMenu,
}
