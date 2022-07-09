import { withLegend, jsx } from '@antv/f2'
import { createVNode, FunctionalComponent } from 'vue'

const Graphic = (props) => {
    const { coord = {}, year } = props
    const { left, top, width, height } = coord
    const x = left + width / 2
    const y = top + height / 2
    return (
        <group style={{}}>
            <text
                attrs={{
                    x,
                    y,
                    text: year,
                    textAlign: 'center',
                    // textBaseline: 'bottom',
                    fontSize: '80px',
                    // fontWeight: 'bold',
                    fill: '#ddd'
                }}
            />
        </group>
    )
}

const GraphicJSX = (props) => {
    const { coord = {}, year } = props
    const { left, top, width, height } = coord
    const x = left + width / 2
    const y = top + height / 2
    return jsx('group', {
        children: jsx('text', {
            attrs: {
                x,
                y,
                text: year,
                textAlign: 'center',
                // textBaseline: 'bottom',
                fontSize: '80px',
                // fontWeight: 'bold',
                fill: '#ddd'
            }
        })
    })
}

interface GroupProps extends Record<string, unknown> {}

// const group = (props, context, updater) => {
//     const type = 'group'
//     const key = null
//     const ref = null
//     return {
//         type,
//         key,
//         ref,
//         props
//     }
// }

// const text = (props, context, updater) => {
//     const type = 'text'
//     const key = null
//     const ref = null
//     return {
//         type,
//         key,
//         ref,
//         props
//     }
// }

const a = (
    <group
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <text
            attrs={{
                fill: 'color',
                text: 'name'
            }}
        />
    </group>
)

console.log('a', a)

const Legend = withLegend((props) => {
    const { items = [], itemWidth } = props
    return (
        <group
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {items.map((item) => {
                const { color, name } = item
                return (
                    <group
                        className="legend-item"
                        style={{
                            width: itemWidth,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        data-item={item}
                    >
                        <text
                            attrs={{
                                fill: color,
                                text: name
                            }}
                        />
                    </group>
                )
            })}
        </group>
    )
})

const LegendJSX = withLegend((props) => {
    const { items = [], itemWidth } = props

    return jsx('group', {
        style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        children: items.map((item) => {
            const { color, name } = item
            return jsx('group', {
                className: 'legend-item',
                style: {
                    width: itemWidth,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                'data-item': item,
                children: jsx('text', {
                    attrs: {
                        fill: color,
                        text: name
                    }
                })
            })
        })
    })
})

export { Graphic, GraphicJSX, Legend, LegendJSX }
