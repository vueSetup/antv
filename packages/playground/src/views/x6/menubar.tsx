import { defineComponent } from "vue"
import { message } from "ant-design-vue"
import "ant-design-vue/es/message/style"

import { Menubar, Menu } from "@antv/x6-vue-components"
import "@antv/x6-vue-components/src/menubar/style/index.less"
import "@antv/x6-vue-components/src/menu/style/index.less"

export default defineComponent({
  props: {
    prefixCls: String,
  },
  setup(props) {
    const onMenuClick = (name: string) => {
      message.success(`${name} clicked`, 10)
    }

    return () => (
      <div style={{ height: "240px", padding: "32px" }}>
        <div
          style={{
            background: "#f5f5f5",
            display: "flex",
            height: "30px",
            paddingLeft: "12px",
            paddingRight: "12px",
            margin: "-24px -24px 0 -24px",
          }}
        >
          <Menubar
            prefixCls={props.prefixCls}
            extra={<div>Extra Component</div>}
          >
            <Menubar.Item text="File">
              <Menu onClick={onMenuClick}>
                <Menu.Item name="newFile" hotkey="Cmd+N">
                  New File
                </Menu.Item>
                <Menu.Item name="newWindow" hotkey="Cmd+Shift+N">
                  New Window
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item name="open" hotkey="Cmd+O">
                  Open...
                </Menu.Item>
                <Menu.Item name="openWorkspace">Open Workspace...</Menu.Item>
                <Menu.Divider />
                <Menu.Item name="save" hotkey="Cmd+S">
                  Save
                </Menu.Item>
                <Menu.Item name="saveAs" hotkey="Cmd+Shift+S">
                  Save As...
                </Menu.Item>
                <Menu.Item name="saveAll" hotkey="Cmd+Alt+S">
                  Save All
                </Menu.Item>
              </Menu>
            </Menubar.Item>
            <Menubar.Item text="Edit">
              <Menu>
                <Menu.Item name="undo" hotkey="Cmd+Z">
                  Undo
                </Menu.Item>
                <Menu.Item name="redo" hotkey="Cmd+Shift+Z">
                  Redo
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item name="cut" hotkey="Cmd+X">
                  Cut
                </Menu.Item>
                <Menu.Item name="copy" hotkey="Cmd+C">
                  Copy
                </Menu.Item>
                <Menu.Item name="paste" hotkey="Cmd+V" disabled={true}>
                  Paste
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item name="find" hotkey="Cmd+F">
                  Find
                </Menu.Item>
                <Menu.Item name="replace" hotkey="Cmd+Alt+F">
                  Replace
                </Menu.Item>
              </Menu>
            </Menubar.Item>
            <Menubar.Item text="View">
              <Menu>
                <Menu.Item name="zen" hotkey="Cmd+K Z">
                  Zen Mode
                </Menu.Item>
                <Menu.Item name="fullscreen" hotkey="Cmd+Shift+F">
                  Full Screen
                </Menu.Item>
                <Menu.Divider />
                <Menu.SubMenu text="Appearance">
                  <Menu.Item name="side-bar">Show Side Bar</Menu.Item>
                  <Menu.Item name="status-bar">Show Status Bar</Menu.Item>
                  <Menu.Item name="activity-bar">Show Activity Bar</Menu.Item>
                  <Menu.Item name="editor-area">Show Editor Area</Menu.Item>
                  <Menu.Item name="show-panel">Show Panel</Menu.Item>
                </Menu.SubMenu>
                <Menu.Divider />
                <Menu.Item name="zoomin" hotkey="Cmd +">
                  Zoom In
                </Menu.Item>
                <Menu.Item name="zoomout" hotkey="Cmd -">
                  Zoom Out
                </Menu.Item>
              </Menu>
            </Menubar.Item>
            <Menubar.Item text="Help">
              <Menu>
                <Menu.Item name="welcome">Welcome</Menu.Item>
                <Menu.Item name="documention">Documention</Menu.Item>
                <Menu.Item name="about">Aoubt</Menu.Item>
              </Menu>
            </Menubar.Item>
          </Menubar>
        </div>
      </div>
    )
  },
})
