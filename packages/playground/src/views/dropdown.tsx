import { defineComponent } from 'vue'
import { Dropdown } from '@antv/x6-vue-components'
import '@antv/x6-vue-components/src/dropdown/style'
import { Menu } from '@antv/x6-vue-components'
import { MenuItem } from '@antv/x6-vue-components/src/menu/Item'
import { MenuDivider as Divider } from '@antv/x6-vue-components/src/menu/divider'
import { MenuSubMenu as SubMenu } from '@antv/x6-vue-components/src/menu/submenu'
import '@antv/x6-vue-components/src/menu/style'

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
            <>
                <Dropdown overlay={menu}>
                    <a href="#">Hover me</a>
                </Dropdown>
                <Dropdown overlay={menu} trigger={['contextmenu']}>
                    <span style={{ userSelect: 'none' }}>Right Click on Me</span>
                </Dropdown>
            </>
        )
    }
})
