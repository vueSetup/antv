import { defineComponent } from 'vue'
import { Component } from '@antv/f2'
import Canvas from '@antv/f2-vue'
import imageBianzu from './images/bianzu'

function View() {
    return (
        <group>
            <rect
                attrs={{
                    x: '10px',
                    y: '10px',
                    width: '80px',
                    height: '80px',
                    fill: 'red'
                }}
            />
            <circle
                attrs={{
                    x: '150px',
                    y: '50px',
                    r: '50px',
                    fill: 'red'
                }}
            />
            <polyline
                attrs={{
                    points: [
                        { x: '210px', y: '20px' },
                        { x: '220px', y: '40px' },
                        { x: '250px', y: '45px' },
                        { x: '300px', y: '80px' }
                    ],
                    lineWidth: '4px',
                    stroke: 'red'
                }}
            />
        </group>
    )
}

function FragFunction() {
    return (
        <rect
            attrs={{
                x: '10px',
                y: '10px',
                width: '80px',
                height: '80px',
                fill: 'red'
            }}
        />
    )
}

class FragComponent extends Component {
    render() {
        return (
            <rect
                attrs={{
                    x: '10px',
                    y: '10px',
                    width: '80px',
                    height: '80px',
                    fill: 'red'
                }}
            />
        )
    }
}

export default defineComponent({
    setup() {
        return () => (
            <>
                <Canvas animate={false} pixelRatio={1} style={{ width: '300px', height: '225px' }}>
                    <View transformFrom={{}} />
                </Canvas>
                <Canvas animate={false} pixelRatio={1}>
                    <FragFunction transformFrom={{}} />
                </Canvas>
                <Canvas animate={false} pixelRatio={1}>
                    <FragComponent />
                </Canvas>
                <Canvas animate={false} pixelRatio={1}>
                    <group>
                        <rect
                            attrs={{
                                x: '10px',
                                y: '10px',
                                width: '40px',
                                height: '40px',
                                fill: 'red',
                                radius: 4
                            }}
                        />
                        <rect
                            attrs={{
                                x: '60px',
                                y: '10px',
                                width: '40px',
                                height: '40px',
                                fill: 'red',
                                radius: '8px'
                            }}
                        />

                        <rect
                            attrs={{
                                x: '10px',
                                y: '60px',
                                width: '40px',
                                height: '40px',
                                fill: 'red',
                                radius: [4, 0]
                            }}
                        />
                        <rect
                            attrs={{
                                x: '60px',
                                y: '60px',
                                width: '40px',
                                height: '40px',
                                fill: 'red',
                                radius: ['8px', 0]
                            }}
                        />
                        <rect
                            attrs={{
                                x: '110px',
                                y: '60px',
                                width: '40px',
                                height: '40px',
                                fill: 'red',
                                radius: [0, '8px']
                            }}
                        />
                        <rect
                            attrs={{
                                x: '10px',
                                y: '110px',
                                width: '40px',
                                height: '40px',
                                fill: 'red',
                                radius: ['8px', '8px', 0, 0]
                            }}
                        />
                    </group>
                </Canvas>
                <Canvas animate={false} pixelRatio={1}>
                    <image
                        attrs={{
                            src: imageBianzu,
                            width: '200px',
                            height: '200px'
                        }}
                    />
                </Canvas>
                <Canvas animate={false} pixelRatio={1}>
                    <group>
                        <image
                            attrs={{
                                src: 'https://gw.alipayobjects.com/mdn/zhima_credit/afts/img/A*Ckg-R4Md9MgAAAAAAAAAAAAAARQnAQ',
                                width: '200px',
                                height: '200px'
                            }}
                        />
                        <rect
                            attrs={{
                                x: '100px',
                                y: '100px',
                                width: '60px',
                                height: '60px',
                                fill: '#000'
                            }}
                        />
                    </group>
                </Canvas>
            </>
        )
    }
})
