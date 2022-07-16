<template>
    <div class="container">
        <Canvas>
            <Chart :data="state.data">
                <Grahpic :year="state.year" />
                <Legend />
                <Axis field="genre" />
                <Axis field="sold" />
                <Tooltip :showTooltipMarker="true" />
                <Interval x="genre" y="sold" color="genre" />
            </Chart>
        </Canvas>
    </div>
</template>

<script lang="tsx" setup>
import { shallowReactive, onMounted } from 'vue'
import Canvas from '@antv/f2-vue'
import { Chart, Interval, Axis, Tooltip } from '@antv/f2'
// import Grahpic from './Grahpic'
import Legend from './Legend'

const Grahpic = (props: Record<string, unknown>) => {
    const { coord, year } = props
    // @ts-ignore
    const { left, top, width, height } = coord
    const x = left + width / 2
    const y = top + height / 2
    return (
        <group>
            <text
                attrs={{
                    x,
                    y,
                    text: year as string,
                    textAlign: 'center',
                    // textBaseline: 'bottom',
                    fontSize: 80,
                    // fontWeight: 'bold',
                    fill: '#ddd'
                }}
            />
        </group>
    )
}

const data1 = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
]

const data2 = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 20 },
    { genre: 'Shooter', sold: 50 },
    { genre: 'Other', sold: 50 }
]

const state = shallowReactive<{
    data: Record<string, string | number>[]
    year: number
}>({
    data: data1,
    year: 2021
})

onMounted(() => {
    setInterval(() => {
        if (state.year % 2 === 0) {
            state.year = 2021
            state.data = data1
        } else {
            state.year = 2022
            state.data = data2
        }
    }, 1000)
})
</script>

<style>
.container {
    width: 500px;
    height: 300px;
}
</style>
