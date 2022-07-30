import { defineComponent } from "vue"
import { message } from "ant-design-vue"
import { Menu } from "@antv/x6-vue-components"
import "ant-design-vue/es/message/style"
import "@antv/x6-vue-components/src/menu/style/index.less"
import {
  UndoOutlined,
  RedoOutlined,
  ScissorOutlined,
  CopyOutlined,
  SnippetsOutlined,
  DeleteOutlined,
  ControlOutlined,
  DesktopOutlined,
  FullscreenOutlined,
} from "@ant-design/icons-vue"

const { Item, Divider, SubMenu } = Menu

export default defineComponent({
  setup() {
    const onMenuClick = (name: string) => {
      message.success(`${name} clicked`, 10)
    }
    const onMenuItemClick = () => {
      onMenuClick("undo")
    }
    return () => (
      <div style={{ padding: "24px 0 210px 24px" }}>
        <div style={{ display: "inline-block" }}>
          <Menu onClick={onMenuClick}>
            <Item onClick={onMenuItemClick} name="undo" hotkey="Cmd+Z">
              Undo
            </Item>
            <Item name="redo" hotkey="Cmd+Shift+Z">
              Redo
            </Item>
            <Divider />
            <Item name="cut" hotkey="Cmd+X">
              Cut
            </Item>
            <Item name="copy" hotkey="Cmd+C">
              Copy
            </Item>
            <Item name="paste" hotkey="Cmd+V" disabled={true}>
              Paste
            </Item>
            <Item name="delete" hotkey="Delete">
              Delete
            </Item>
            <Divider />
            <SubMenu text="Appearance">
              <Item name="fullscreen" hotkey="Cmd+Shift+F">
                Full Screen
              </Item>
              <Item name="zen" hotkey="Cmd+K Z">
                Zen Mode
              </Item>
              <Divider />
              <Item name="side-bar">Show Side Bar</Item>
              <Item name="status-bar">Show Status Bar</Item>
              <Item name="activity-bar">Show Activity Bar</Item>
              <Item name="editor-area">Show Editor Area</Item>
              <Item name="show-panel">Show Panel</Item>
            </SubMenu>
          </Menu>
        </div>
        <div style={{ display: "inline-block", marginLeft: "32px" }}>
          <Menu hasIcon={true} onClick={onMenuClick}>
            <MenuItem
              onClick={onMenuItemClick}
              name="undo"
              icon={<UndoOutlined />}
              hotkey="Cmd+Z"
              text="Undo"
              active={true}
            />
            <MenuItem
              name="redo"
              icon={<RedoOutlined />}
              hotkey="Cmd+Shift+Z"
              text="Redo"
            />
            <Divider />
            <MenuItem
              name="cut"
              icon={<ScissorOutlined />}
              hotkey="Cmd+X"
              text="Cut"
            />
            <MenuItem
              name="copy"
              icon={<CopyOutlined />}
              hotkey="Cmd+C"
              text="Copy"
            />
            <MenuItem
              name="paste"
              icon={<SnippetsOutlined />}
              hotkey="Cmd+V"
              disabled={true}
              text="Paste"
            />
            <MenuItem
              name="delete"
              icon={<DeleteOutlined />}
              hotkey="Delete"
              text="Delete"
            />
            <Divider />
            <SubMenu text="Appearance" icon={<ControlOutlined />} active={true}>
              <MenuItem
                name="zen"
                icon={<DesktopOutlined />}
                hotkey="Cmd+K Z"
                text="Zen Mode"
              />
              <MenuItem
                name="fullscreen"
                icon={<FullscreenOutlined />}
                hotkey="Cmd+Shift+F"
                text="Full Screen"
              />
              <Divider />
              <MenuItem name="side-bar" text="Show Side Bar" />
              <MenuItem name="status-bar" text="Show Status Bar" />
              <MenuItem name="activity-bar" text="Show Activity Bar" />
              <MenuItem name="editor-area" text="Show Editor Area" />
              <MenuItem name="show-panel" text="Show Panel" />
            </SubMenu>
          </Menu>
        </div>
      </div>
    )
  },
})
