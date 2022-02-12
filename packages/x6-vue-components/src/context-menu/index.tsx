import { FunctionalComponent, VNode } from 'vue'
import { DropDown } from '../dropdown'
import { DropdownProps } from 'ant-design-vue/es/dropdown'
import './style'

interface ContextMenuProps extends DropdownProps {
    menu: String | VNode
}

const ContextMenu: FunctionalComponent<ContextMenuProps> = (props, { slots }) => {
    const { menu, overlay, ...others } = props
    const children = slots.default?.()
    return (
        <DropDown {...props} overlay={menu || overlay} trigger={['contextmenu']}>
            {children}
        </DropDown>
    )
}

export default ContextMenu
