import { defineComponent } from 'vue'
import { message } from 'ant-design-vue'
import "ant-design-vue/es/message/style"
import Toolbar from '@antv/x6-vue-components/src/toolbar/toolbar'
import { ToolbarGroup as Group } from '@antv/x6-vue-components/src/toolbar/group'
import { ToolbarItem as Item } from '@antv/x6-vue-components/src/toolbar/item'
import '@antv/x6-vue-components/src/toolbar/style/index.less'
import Menu from '@antv/x6-vue-components/src/menu/menu'
import { MenuItem } from '@antv/x6-vue-components/src/menu/Item'
import { MenuDivider as Divider } from '@antv/x6-vue-components/src/menu/divider'
import { MenuSubMenu as SubMenu } from '@antv/x6-vue-components/src/menu/submenu'
import '@antv/x6-vue-components/src/menu/style/index.less'
import {
    ZoomInOutlined,
    ZoomOutOutlined,
    UndoOutlined,
    RedoOutlined,
    DeleteOutlined,
    BoldOutlined,
    ItalicOutlined,
    StrikethroughOutlined,
    UnderlineOutlined
} from '@ant-design/icons-vue'

// const { Item: ToolbarItem, Group: ToolbarGroup } = Toolbar

export default defineComponent({
    setup() {
        const onClick = (name: string) => {
            message.success(`${name} clicked`, 10)
        }
        const renderZoomDropdown = () => (
            <Menu>
                <MenuItem name="resetView" hotkey="Cmd+H">
                    Reset View
                </MenuItem>
                <MenuItem name="fitWindow" hotkey="Cmd+Shift+H">
                    Fit Window
                </MenuItem>
                <Divider />
                <MenuItem name="25">25%</MenuItem>
                <MenuItem name="50">50%</MenuItem>
                <MenuItem name="75">75%</MenuItem>
                <MenuItem name="100">100%</MenuItem>
                <MenuItem name="125">125%</MenuItem>
                <MenuItem name="150">150%</MenuItem>
                <MenuItem name="200">200%</MenuItem>
                <MenuItem name="300">300%</MenuItem>
                <MenuItem name="400">400%</MenuItem>
            </Menu>
        )
        return () => (
            <div style={{ padding: 24 }}>
                <div style={{ background: '#f5f5f5', paddingRight: '16px' }}>
                    <Toolbar
                        hoverEffect={true}
                        size="big"
                        onClick={onClick}
                        extra={<span>Extra Component</span>}
                    >
                        <Group>
                            <Item
                                name="zoom"
                                tooltipAsTitle={true}
                                tooltip="Zoom (Alt+Mousewheel)"
                                dropdown={renderZoomDropdown()}
                                dropdownArrow={true}
                            >
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '40px',
                                        textAlign: 'right'
                                    }}
                                >
                                    100%
                                </span>
                            </Item>
                        </Group>
                        <Group>
                            <Item
                                name="zoomIn"
                                tooltip="Zoom In (Cmd +)"
                                icon={<ZoomInOutlined />}
                            />
                            <Item
                                name="zoomOut"
                                tooltip="Zoom Out (Cmd -)"
                                icon={<ZoomOutOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item name="undo" tooltip="Undo (Cmd + Z)" icon={<UndoOutlined />} />
                            <Item
                                name="redo"
                                tooltip="Redo (Cmd + Shift + Z)"
                                icon={<RedoOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item
                                name="delete"
                                icon={<DeleteOutlined />}
                                disabled={true}
                                tooltip="Delete (Delete)"
                            />
                        </Group>
                        <Group>
                            <Item
                                name="bold"
                                icon={<BoldOutlined />}
                                active={true}
                                tooltip="Bold (Cmd + B)"
                            />
                            <Item
                                name="italic"
                                icon={<ItalicOutlined />}
                                tooltip="Italic (Cmd + I)"
                            />
                            <Item
                                name="strikethrough"
                                icon={<StrikethroughOutlined />}
                                tooltip="Strikethrough (Cmd + Shift + x)"
                            />
                            <Item
                                name="underline"
                                icon={<UnderlineOutlined />}
                                tooltip="Underline (Cmd + U)"
                            />
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar size="big" onClick={onClick} extra={<span>Extra Component</span>}>
                        <Group>
                            <Item
                                name="zoomIn"
                                tooltip="Zoom In (Cmd +)"
                                icon={<ZoomInOutlined />}
                            />
                            <Item
                                name="zoomOut"
                                tooltip="Zoom Out (Cmd -)"
                                icon={<ZoomOutOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item name="undo" tooltip="Undo (Cmd + Z)" icon={<UndoOutlined />} />
                            <Item
                                name="redo"
                                tooltip="Redo (Cmd + Shift + Z)"
                                icon={<RedoOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item
                                name="delete"
                                icon={<DeleteOutlined />}
                                disabled={true}
                                tooltip="Delete (Delete)"
                            />
                        </Group>
                        <Group>
                            <Item
                                name="bold"
                                icon={<BoldOutlined />}
                                active={true}
                                tooltip="Bold (Cmd + B)"
                            />
                            <Item
                                name="italic"
                                icon={<ItalicOutlined />}
                                tooltip="Italic (Cmd + I)"
                            />
                            <Item
                                name="strikethrough"
                                icon={<StrikethroughOutlined />}
                                tooltip="Strikethrough (Cmd + Shift + x)"
                            />
                            <Item
                                name="underline"
                                icon={<UnderlineOutlined />}
                                tooltip="Underline (Cmd + U)"
                            />
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar
                        hoverEffect={true}
                        onClick={onClick}
                        extra={<span>Extra Component</span>}
                    >
                        <Group>
                            <Item
                                name="zoomIn"
                                tooltip="Zoom In (Cmd +)"
                                icon={<ZoomInOutlined />}
                            />
                            <Item
                                name="zoomOut"
                                tooltip="Zoom Out (Cmd -)"
                                icon={<ZoomOutOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item name="undo" tooltip="Undo (Cmd + Z)" icon={<UndoOutlined />} />
                            <Item
                                name="redo"
                                tooltip="Redo (Cmd + Shift + Z)"
                                icon={<RedoOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item
                                name="delete"
                                icon={<DeleteOutlined />}
                                disabled={true}
                                tooltip="Delete (Delete)"
                            />
                        </Group>
                        <Group>
                            <Item
                                name="bold"
                                icon={<BoldOutlined />}
                                active={true}
                                tooltip="Bold (Cmd + B)"
                            />
                            <Item
                                name="italic"
                                icon={<ItalicOutlined />}
                                tooltip="Italic (Cmd + I)"
                            />
                            <Item
                                name="strikethrough"
                                icon={<StrikethroughOutlined />}
                                tooltip="Strikethrough (Cmd + Shift + x)"
                            />
                            <Item
                                name="underline"
                                icon={<UnderlineOutlined />}
                                tooltip="Underline (Cmd + U)"
                            />
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar extra={<span>Extra Component</span>}>
                        <Group>
                            <Item
                                name="zoomIn"
                                tooltip="Zoom In (Cmd +)"
                                icon={<ZoomInOutlined />}
                            />
                            <Item
                                name="zoomOut"
                                tooltip="Zoom Out (Cmd -)"
                                icon={<ZoomOutOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item name="undo" tooltip="Undo (Cmd + Z)" icon={<UndoOutlined />} />
                            <Item
                                name="redo"
                                tooltip="Redo (Cmd + Shift + Z)"
                                icon={<RedoOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item
                                name="delete"
                                icon={<DeleteOutlined />}
                                disabled={true}
                                tooltip="Delete (Delete)"
                            />
                        </Group>
                        <Group>
                            <Item
                                name="bold"
                                icon={<BoldOutlined />}
                                active={true}
                                tooltip="Bold (Cmd + B)"
                            />
                            <Item
                                name="italic"
                                icon={<ItalicOutlined />}
                                tooltip="Italic (Cmd + I)"
                            />
                            <Item
                                name="strikethrough"
                                icon={<StrikethroughOutlined />}
                                tooltip="Strikethrough (Cmd + Shift + x)"
                            />
                            <Item
                                name="underline"
                                icon={<UnderlineOutlined />}
                                tooltip="Underline (Cmd + U)"
                            />
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar
                        hoverEffect={true}
                        size="small"
                        onClick={onClick}
                        extra={<span>Extra Component</span>}
                    >
                        <Group>
                            <Item
                                name="zoomIn"
                                tooltip="Zoom In (Cmd +)"
                                icon={<ZoomInOutlined />}
                            />
                            <Item
                                name="zoomOut"
                                tooltip="Zoom Out (Cmd -)"
                                icon={<ZoomOutOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item name="undo" tooltip="Undo (Cmd + Z)" icon={<UndoOutlined />} />
                            <Item
                                name="redo"
                                tooltip="Redo (Cmd + Shift + Z)"
                                icon={<RedoOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item
                                name="delete"
                                icon={<DeleteOutlined />}
                                disabled={true}
                                tooltip="Delete (Delete)"
                            />
                        </Group>
                        <Group>
                            <Item
                                name="bold"
                                icon={<BoldOutlined />}
                                active={true}
                                tooltip="Bold (Cmd + B)"
                            />
                            <Item
                                name="italic"
                                icon={<ItalicOutlined />}
                                tooltip="Italic (Cmd + I)"
                            />
                            <Item
                                name="strikethrough"
                                icon={<StrikethroughOutlined />}
                                tooltip="Strikethrough (Cmd + Shift + x)"
                            />
                            <Item
                                name="underline"
                                icon={<UnderlineOutlined />}
                                tooltip="Underline (Cmd + U)"
                            />
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar size="small" onClick={onClick} extra={<span>Extra Component</span>}>
                        <Group>
                            <Item
                                name="zoomIn"
                                tooltip="Zoom In (Cmd +)"
                                icon={<ZoomInOutlined />}
                            />
                            <Item
                                name="zoomOut"
                                tooltip="Zoom Out (Cmd -)"
                                icon={<ZoomOutOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item name="undo" tooltip="Undo (Cmd + Z)" icon={<UndoOutlined />} />
                            <Item
                                name="redo"
                                tooltip="Redo (Cmd + Shift + Z)"
                                icon={<RedoOutlined />}
                            />
                        </Group>
                        <Group>
                            <Item
                                name="delete"
                                icon={<DeleteOutlined />}
                                disabled={true}
                                tooltip="Delete (Delete)"
                            />
                        </Group>
                        <Group>
                            <Item
                                name="bold"
                                icon={<BoldOutlined />}
                                active={true}
                                tooltip="Bold (Cmd + B)"
                            />
                            <Item
                                name="italic"
                                icon={<ItalicOutlined />}
                                tooltip="Italic (Cmd + I)"
                            />
                            <Item
                                name="strikethrough"
                                icon={<StrikethroughOutlined />}
                                tooltip="Strikethrough (Cmd + Shift + x)"
                            />
                            <Item
                                name="underline"
                                icon={<UnderlineOutlined />}
                                tooltip="Underline (Cmd + U)"
                            />
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar
                        hoverEffect={true}
                        size="big"
                        onClick={onClick}
                        extra={<span>Extra Component</span>}
                    >
                        <Group>
                            <Item name="alignLeft" icon="align-left" text="Align Left" />
                            <Item name="alignCenter" icon="align-center" text="Align Center" />
                            <Item name="alignRight" icon="align-right" text="Align Right" />
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar size="big" onClick={onClick} extra={<span>Extra Component</span>}>
                        <Group>
                            <Item name="alignLeft" icon="align-left" text="Align Left" />
                            <Item name="alignCenter" icon="align-center" text="Align Center" />
                            <Item name="alignRight" icon="align-right" text="Align Right" />{' '}
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar
                        hoverEffect={true}
                        onClick={onClick}
                        extra={<span>Extra Component</span>}
                    >
                        <Group>
                            <Item name="alignLeft" icon="align-left" text="Align Left" />
                            <Item name="alignCenter" icon="align-center" text="Align Center" />
                            <Item name="alignRight" icon="align-right" text="Align Right" />
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar onClick={onClick} extra={<span>Extra Component</span>}>
                        <Group>
                            <Item name="alignLeft" icon="align-left" text="Align Left" />
                            <Item name="alignCenter" icon="align-center" text="Align Center" />
                            <Item name="alignRight" icon="align-right" text="Align Right" />{' '}
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar
                        hoverEffect={true}
                        size="small"
                        onClick={onClick}
                        extra={<span>Extra Component</span>}
                    >
                        <Group>
                            <Item name="alignLeft" icon="align-left" text="Align Left" />
                            <Item name="alignCenter" icon="align-center" text="Align Center" />
                            <Item name="alignRight" icon="align-right" text="Align Right" />
                        </Group>
                    </Toolbar>
                </div>
                <div style={{ background: '#f5f5f5', marginTop: '24px', paddingRight: '16px' }}>
                    <Toolbar size="small" onClick={onClick} extra={<span>Extra Component</span>}>
                        <Group>
                            <Item name="alignLeft" icon="align-left" text="Align Left" />
                            <Item name="alignCenter" icon="align-center" text="Align Center" />
                            <Item name="alignRight" icon="align-right" text="Align Right" />{' '}
                        </Group>
                    </Toolbar>
                </div>
            </div>
        )
    }
})
