import { defineComponent } from 'vue'
import { Dropdown } from '@antv/x6-vue-components'
import '@antv/x6-vue-components/src/dropdown/style/index.less'
import { Menu } from '@antv/x6-vue-components'
import { MenuItem } from '@antv/x6-vue-components/src/menu/Item'
import { MenuDivider as Divider } from '@antv/x6-vue-components/src/menu/Divider'
import { MenuSubMenu as SubMenu } from '@antv/x6-vue-components/src/menu/SubMenu'
import '@antv/x6-vue-components/src/menu/style/index.less'

export default defineComponent({
    setup() {
        const menu = (
            <Menu>
                <MenuItem key="1">1st menu item</MenuItem>
                <MenuItem key="2">2nd menu item</MenuItem>
                <MenuItem key="3">3rd menu item</MenuItem>
            </Menu>
        )
        return () => (
            <div style={{ padding: '24px 0 120px 24px' }}>
                <div>
                    <Dropdown overlay={menu}>
                        <a href="#anchor">Hover me</a>
                    </Dropdown>
                </div>
                <div style={{ marginTop: 24 }}>
                    <Dropdown overlay={menu} trigger={'contextmenu'}>
                        <span style={{ userSelect: 'none' }}>Right Click on Me</span>
                    </Dropdown>
                </div>
            </div>
        )
    }
})
