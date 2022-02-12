import { FunctionalComponent, VNode } from "vue"
import ToolbarContextProvider from "./context"
// import ToolbarItem from './item'
// import ToolbarGroup from './group'
import './style'

export interface ToolBarProps {
    prefixCls?: string
    className?: string
    extra?: VNode
    size?: 'small' | 'big'
    rtl?: boolean
    hoverEffect?: boolean
    align?: 'left' | 'right'
    onClick?: (name: string, value?: any) => void
}

export const ToolBar: FunctionalComponent<ToolBarProps> = (props, { slots, emit }) => {
    const { prefixCls = "x6", extra, size, rtl, hoverEffect, align, onClick } = props
    const children = slots.default?.()

    const baseCls = `${prefixCls}-toolbar`
    const classNames = {
        [baseCls]: true,
        [`${baseCls}-${size}`]: size,
        [`${baseCls}-align-right`]: align === 'right',
        [`${baseCls}-hover-effect`]: hoverEffect,
    }

    const contents = [
        <div class={`${baseCls}-content-inner`}>
            <ToolbarContextProvider
                value={{
                    prefixCls: baseCls,
                    onClick: onClick,
                }}
            >
                {children}
            </ToolbarContextProvider>
        </div>,
        <div class={`${baseCls}-content-extras`}>{extra}</div>
    ]

    if (rtl) {
        contents.reverse()
    }

    return (
        <div class={classNames}>
            <div class={`${baseCls}-content`}>
                {contents}
            </div>
        </div>
    )
}
