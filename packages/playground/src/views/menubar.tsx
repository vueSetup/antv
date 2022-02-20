import { defineComponent } from 'vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style'

import { Menubar, Menu } from '@antv/x6-vue-components'
import { MenubarItem } from '@antv/x6-vue-components/src/menubar/item'
import { MenuItem } from '@antv/x6-vue-components/src/menu/Item'
import { MenuDivider as Divider } from '@antv/x6-vue-components/src/menu/divider'
import { MenuSubMenu as SubMenu } from '@antv/x6-vue-components/src/menu/submenu'
import '@antv/x6-vue-components/src/menubar/style/index.less'
import '@antv/x6-vue-components/src/menu/style/index.less'

export default defineComponent({
    setup() {
        const onMenuClick = (name: string) => {
            message.success(`${name} clicked`, 10)
        }
        return () => (
            <div style={{ height: '240px', padding: '32px' }}>
                <div
                    style={{
                        background: '#f5f5f5',
                        display: 'flex',
                        height: '30px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        margin: '-24px -24px 0 -24px'
                    }}
                >
                    <Menubar extra={<div>Extra Component</div>}>
                        <MenubarItem text="File">
                            <Menu onClick={onMenuClick}>
                                <MenuItem name="newFile" hotkey="Cmd+N">
                                    New File
                                </MenuItem>
                                <MenuItem name="newWindow" hotkey="Cmd+Shift+N">
                                    New Window
                                </MenuItem>
                                <Divider />
                                <MenuItem name="open" hotkey="Cmd+O">
                                    Open...
                                </MenuItem>
                                <MenuItem name="openWorkspace">Open Workspace...</MenuItem>
                                <Divider />
                                <MenuItem name="save" hotkey="Cmd+S">
                                    Save
                                </MenuItem>
                                <MenuItem name="saveAs" hotkey="Cmd+Shift+S">
                                    Save As...
                                </MenuItem>
                                <MenuItem name="saveAll" hotkey="Cmd+Alt+S">
                                    Save All
                                </MenuItem>
                            </Menu>
                        </MenubarItem>
                        <MenubarItem text="Edit">
                            <Menu>
                                <MenuItem name="undo" hotkey="Cmd+Z">
                                    Undo
                                </MenuItem>
                                <MenuItem name="redo" hotkey="Cmd+Shift+Z">
                                    Redo
                                </MenuItem>
                                <Divider />
                                <MenuItem name="cut" hotkey="Cmd+X">
                                    Cut
                                </MenuItem>
                                <MenuItem name="copy" hotkey="Cmd+C">
                                    Copy
                                </MenuItem>
                                <MenuItem name="paste" hotkey="Cmd+V" disabled={true}>
                                    Paste
                                </MenuItem>
                                <Divider />
                                <MenuItem name="find" hotkey="Cmd+F">
                                    Find
                                </MenuItem>
                                <MenuItem name="replace" hotkey="Cmd+Alt+F">
                                    Replace
                                </MenuItem>
                            </Menu>
                        </MenubarItem>
                        <MenubarItem text="View">
                            <Menu>
                                <MenuItem name="zen" hotkey="Cmd+K Z">
                                    Zen Mode
                                </MenuItem>
                                <MenuItem name="fullscreen" hotkey="Cmd+Shift+F">
                                    Full Screen
                                </MenuItem>
                                <Divider />
                                <SubMenu text="Appearance">
                                    <MenuItem name="side-bar">Show Side Bar</MenuItem>
                                    <MenuItem name="status-bar">Show Status Bar</MenuItem>
                                    <MenuItem name="activity-bar">Show Activity Bar</MenuItem>
                                    <MenuItem name="editor-area">Show Editor Area</MenuItem>
                                    <MenuItem name="show-panel">Show Panel</MenuItem>
                                </SubMenu>
                                <Divider />
                                <MenuItem name="zoomin" hotkey="Cmd +">
                                    Zoom In
                                </MenuItem>
                                <MenuItem name="zoomout" hotkey="Cmd -">
                                    Zoom Out
                                </MenuItem>
                            </Menu>
                        </MenubarItem>
                        <MenubarItem text="Help">
                            <Menu>
                                <MenuItem name="welcome">Welcome</MenuItem>
                                <MenuItem name="documention">Documention</MenuItem>
                                <MenuItem name="about">Aoubt</MenuItem>
                            </Menu>
                        </MenubarItem>
                    </Menubar>
                </div>
            </div>
        )
    }
})
