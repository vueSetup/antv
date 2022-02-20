import { defineComponent } from "vue"
import { Dropdown, Menu } from "@antv/x6-vue-components"

export default defineComponent({
    setup() {
        const menu = (
            <Menu>
                <Menu.Item key="1">1st menu item</Menu.Item>
                <Menu.Item key="2">2nd menu item</Menu.Item>
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        )
        return () => (
            <Dropdown overlay={menu}>
                <a href="#">Hover me</a>
            </Dropdown>
        )
        // return () => (
        //     <Dropdown overlay={menu} trigger={'contextmenu'}>
        //         <span style={{ userSelect: 'none' }}>Right Click on Me</span>
        //     </Dropdown>
        // )
    }
})