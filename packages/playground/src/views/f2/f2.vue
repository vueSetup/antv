<template>
  <div class="container">
    <Canvas>
      <Chart
        :data="state.data"
        :scale="{
          sold: {
            min: 0,
            tickCount: 5,
          },
          genre: {
            range: [0, 1],
          },
        }"
      >
        <Grahpic :year="state.year" />
        <Axis field="genre" />
        <Axis field="sold" />
        <Interval x="genre" y="cost" color="genre" />
        <Area x="genre" y="sold" />
        <Line x="genre" y="sold" />
        <Legend />
        <Tooltip @change="change" />
      </Chart>
    </Canvas>
  </div>
</template>

<script lang="tsx" setup>
import { shallowReactive, onMounted } from "vue"
import Canvas from "@antv/f2-vue"
import { Chart, Axis, Area, Line, Interval, Legend, Tooltip } from "@antv/f2"
import Grahpic from "./views/grahpic"
// import Legend from "./views/legend"
// import Tooltip from "./views/Tooltip"

const data1 = [
  { genre: "Sports", sold: 275, cost: 115 },
  { genre: "Strategy", sold: 115, cost: 120 },
  { genre: "Action", sold: 120, cost: 350 },
  { genre: "Shooter", sold: 350, cost: 150 },
  { genre: "Other", sold: 150, cost: 275 },
]

const data2 = [
  { genre: "Sports", sold: 175, cost: 275 },
  { genre: "Strategy", sold: 115, cost: 120 },
  { genre: "Action", sold: 120, cost: 150 },
  { genre: "Shooter", sold: 150, cost: 350 },
  { genre: "Other", sold: 510, cost: 250 },
]

const state = shallowReactive<{
  data: Record<string, string | number>[]
  year: number
}>({
  data: data1,
  year: 2021,
})

onMounted(() => {
  setInterval(() => {
    // if (state.year % 2 === 0) {
    //   state.year = 2021
    //   state.data = data1
    // } else {
    //   state.year = 2022
    //   state.data = data2
    // }
  }, 1000)
})

const change = (records: Record<string, unknown>[]) => {
  // const firstRecord = records[0]
  const [ firstRecord ] = records
  const { genre, sold, cost } = firstRecord
  const name = genre
  const value = `sold:${sold},cost:${cost}`
  Object.assign(firstRecord, { name, value })
}
</script>

<style>
.container {
  width: 500px;
  height: 300px;
}
</style>
