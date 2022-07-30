import { defineComponent } from "vue"
import { Dropdown, Menu } from "@antv/x6-vue-components"
import "@antv/x6-vue-components/src/dropdown/style/index.less"
import "@antv/x6-vue-components/src/menu/style/index.less"

const { Item } = Menu

export default defineComponent({
  setup() {
    const menu = (
      <Menu>
        <Item key="1">1st menu item</Item>
        <Item key="2">2nd menu item</Item>
        <Item key="3">3rd menu item</Item>
      </Menu>
    )
    return () => (
      <div style={{ padding: "24px 0 120px 24px" }}>
        <div>
          <Dropdown overlay={menu}>
            <a href="#anchor">Hover me</a>
          </Dropdown>
        </div>
        <div style={{ marginTop: 24 }}>
          <Dropdown overlay={menu} trigger={"contextmenu"}>
            <span style={{ userSelect: "none" }}>Right Click on Me</span>
          </Dropdown>
        </div>
      </div>
    )
  },
})
