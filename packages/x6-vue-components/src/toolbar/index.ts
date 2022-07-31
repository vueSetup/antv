import type { App, Plugin } from "vue"
import { Toolbar, toolbarProps, type ToolbarProps } from "./toolbar"
import { ToolbarItem, toolbarItemProps, type ToolbarItemProps } from "./item"
import { ToolbarGroup } from "./group"

Toolbar.install = (app: App) => {
  app.component(Toolbar.name, Toolbar)
  return app
}

Toolbar.Item = ToolbarItem
Toolbar.Group = ToolbarGroup

export default Toolbar as typeof Toolbar &
  Plugin & {
    readonly Item: typeof ToolbarItem
    readonly Group: typeof ToolbarGroup
  }

export { ToolbarItem, ToolbarGroup }

export { toolbarProps, toolbarItemProps }

export type { ToolbarProps, ToolbarItemProps }
