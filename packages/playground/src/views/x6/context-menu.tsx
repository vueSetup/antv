import { defineComponent } from "vue"
import { ContextMenu, Menu } from "@antv/x6-vue-components"
import "@antv/x6-vue-components/src/dropdown/style/index.less"

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
      <div style={{ padding: 24 }}>
        <ContextMenu menu={menu}>
          <div
            style={{
              height: 240,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f5f5f5",
              userSelect: "none",
            }}
          >
            Right Click On Me
          </div>
        </ContextMenu>
      </div>
    )
  },
})
