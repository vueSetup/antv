<template>
  <div class="container">
    <Canvas>
      <Chart :data="data">
        <Grahpic :year="year" />
        <Legend marker="line-circle" />
        <Axis field="genre" />
        <Axis field="sold" />
        <Tooltip :showTooltipMarker="true" />
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    </Canvas>
  </div>
</template>
<script lang="ts">
import { defineComponent, shallowReactive, onMounted, toRefs } from 'vue';
import Canvas from '@antv/f2-vue';
import { Chart, Interval, Axis, Tooltip } from '@antv/f2';
import Grahpic from './components/grahpic';
import Legend from './components/custom-legend';

const data1 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const data2 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 50 },
  { genre: 'Other', sold: 50 },
];

export default defineComponent({
  components: {
    Canvas,
    Chart,
    Interval,
    Axis,
    Tooltip,
    Grahpic,
    Legend,
  },
  setup() {
    const state = shallowReactive<{
      data: Record<string, string | number>[];
      year: number;
    }>({
      data: data1,
      year: 2021,
    });

    // onMounted(() => {
    //   setInterval(() => {
    //     if (state.year % 2 === 0) {
    //       state.year = 2021;
    //       state.data = data1;
    //     } else {
    //       state.year = 2022;
    //       state.data = data2;
    //     }
    //   }, 1000);
    // });

    return { ...toRefs(state) };
  },
});
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.container {
  width: 500px;
  height: 300px;
}
</style>
