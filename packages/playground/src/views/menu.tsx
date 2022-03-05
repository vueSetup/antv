import { defineComponent } from 'vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style'
import { Menu } from '@antv/x6-vue-components'
import { MenuItem } from '@antv/x6-vue-components/src/menu/Item'
import { MenuDivider as Divider } from '@antv/x6-vue-components/src/menu/Divider'
import { MenuSubMenu as SubMenu } from '@antv/x6-vue-components/src/menu/SubMenu'
import '@antv/x6-vue-components/src/menu/style/index.less'

import {
    UndoOutlined,
    RedoOutlined,
    ScissorOutlined,
    CopyOutlined,
    SnippetsOutlined,
    DeleteOutlined,
    ControlOutlined,
    DesktopOutlined,
    FullscreenOutlined
} from '@ant-design/icons-vue'

// const { MenuItem, Divider, SubMenu } = Menu

export default defineComponent({
    setup() {
        const onMenuClick = (name: string) => {
            message.success(`${name} clicked`, 10)
        }
        const onMenuItemClick = () => {
            onMenuClick('undo')
        }
        return () => (
            <div style={{ padding: '24px 0 210px 24px' }}>
                <div style={{ display: 'inline-block' }}>
                    <Menu onClick={onMenuClick}>
                        <MenuItem onClick={onMenuItemClick} name="undo" hotkey="Cmd+Z">
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
                        <MenuItem name="delete" hotkey="Delete">
                            Delete
                        </MenuItem>
                        <Divider />
                        <SubMenu text="Appearance">
                            <MenuItem name="fullscreen" hotkey="Cmd+Shift+F">
                                Full Screen
                            </MenuItem>
                            <MenuItem name="zen" hotkey="Cmd+K Z">
                                Zen Mode
                            </MenuItem>
                            <Divider />
                            <MenuItem name="side-bar">Show Side Bar</MenuItem>
                            <MenuItem name="status-bar">Show Status Bar</MenuItem>
                            <MenuItem name="activity-bar">Show Activity Bar</MenuItem>
                            <MenuItem name="editor-area">Show Editor Area</MenuItem>
                            <MenuItem name="show-panel">Show Panel</MenuItem>
                        </SubMenu>
                    </Menu>
                </div>
                <div style={{ display: 'inline-block', marginLeft: '32px' }}>
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
                        <MenuItem name="cut" icon={<ScissorOutlined />} hotkey="Cmd+X" text="Cut" />
                        <MenuItem name="copy" icon={<CopyOutlined />} hotkey="Cmd+C" text="Copy" />
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
    }
})
