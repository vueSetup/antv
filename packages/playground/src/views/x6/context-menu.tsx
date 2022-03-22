import { defineComponent } from 'vue'
import { ContextMenu, Menu } from '@antv/x6-vue-components'
import { MenuItem } from '@antv/x6-vue-components/src/menu/Item'
import '@antv/x6-vue-components/src/dropdown/style/index.less'

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
            <div style={{ padding: 24 }}>
                <ContextMenu menu={menu}>
                    <div
                        style={{
                            height: 240,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#f5f5f5',
                            userSelect: 'none',
                        }}
                    >
                        Right Click On Me
                    </div>
                </ContextMenu>
            </div>
        )
    }
})

