import { defineComponent } from 'vue'
import { Menu, Dropdown, Toolbar } from '@antv/x6-vue-components'
import { ZoomInOutlined, ZoomOutOutlined, UndoOutlined, RedoOutlined, DeleteOutlined, BoldOutlined } from '@ant-design/icons-vue'

const { Item: ToolbarItem, Group: ToolbarGroup } = Toolbar

export default defineComponent({
    setup() {
        const onClick = (name, value) => {
            console.log('name', name)
            console.log('value', value)
        }
        // const renderZoomDropdown = () => {
        //     const MenuItem = Menu.Item
        //     const Divider = Menu.Divider
        //     return (
        //         <Menu>
        //             <MenuItem name="resetView" hotkey="Cmd+H">
        //                 Reset View
        //             </MenuItem>
        //             <MenuItem name="fitWindow" hotkey="Cmd+Shift+H">
        //                 Fit Window
        //             </MenuItem>
        //             <Divider />
        //             <MenuItem name="25">25%</MenuItem>
        //             <MenuItem name="50">50%</MenuItem>
        //             <MenuItem name="75">75%</MenuItem>
        //             <MenuItem name="100">100%</MenuItem>
        //             <MenuItem name="125">125%</MenuItem>
        //             <MenuItem name="150">150%</MenuItem>
        //             <MenuItem name="200">200%</MenuItem>
        //             <MenuItem name="300">300%</MenuItem>
        //             <MenuItem name="400">400%</MenuItem>
        //         </Menu>
        //     )
        // }
        return () => (
            <Toolbar onClick={onClick} extra={<span>Extra Component</span>}>
                {/* <ToolbarGroup>
                    <ToolbarItem
                        name='zoom'
                        tooltipAsTitle={true}
                        tooltip='Zoom (Alt+Mousewheel)'
                        dropdown={renderZoomDropdown()}
                        dropdownArrow={true}
                    >
                        <span
                            style={{
                                display: 'inline-block',
                                width: 40,
                                textAlign: 'right',
                            }}
                        >
                            100%
                        </span>
                    </ToolbarItem>
                </ToolbarGroup> */}
                <ToolbarGroup>
                    {/* <ToolbarItem name='zoomIn' tooltip='zoom In (Ctrl+)' icon={<ZoomInOutlined />} />
                    <ToolbarItem name='zoomOut' tooltip='zoom In (Ctrl-)' icon={<ZoomOutOutlined />} /> */}
                    <span>aaaaa</span>
                </ToolbarGroup>
                {/* <ToolbarGroup>
                    <ToolbarItem name='undo' tooltip='Undo (Ctrl+Z)' icon={<UndoOutlined />} />
                    <ToolbarItem name='redo' tooltip='Redo (Ctrl+Y)' icon={<RedoOutlined />} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarItem name='delete' tooltip='Delete (Delete)' disabled={true} icon={<DeleteOutlined />} />
                    <ToolbarItem name='bold' tooltip='Bold (Crtl + B)"' icon={<BoldOutlined />} />
                </ToolbarGroup> */}
            </Toolbar>
        )
    }
})