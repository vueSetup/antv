<script lang="ts" setup>
import { SpreadSheet } from "@/components"
import type { Data, Fields, Meta, S2Options } from "@antv/s2"

const fields: Fields = { columns: ["province", "city", "type", "price"] }

const meta: Meta[] = [
  {
    field: "price",
    name: "价格",
  },
  {
    field: "province",
    name: "省份",
  },
  {
    field: "city",
    name: "城市",
  },
  {
    field: "type",
    name: "类别",
  },
]

const data: Data[] = [
  {
    province: "浙江",
    city: "杭州",
    type: "笔",
    price: 1,
  },
  {
    province: "浙江",
    city: "杭州",
    type: "纸张",
    price: 2,
  },
  {
    province: "浙江",
    city: "舟山",
    type: "笔",
    price: 17,
  },
  {
    province: "浙江",
    city: "舟山",
    type: "纸张",
    price: 6,
  },
  {
    province: "吉林",
    city: "长春",
    type: "笔",
    price: 8,
  },
  {
    province: "吉林",
    city: "白山",
    type: "笔",
    price: 12,
  },
  {
    province: "吉林",
    city: "长春",
    type: "纸张",
    price: 3,
  },
  {
    province: "吉林",
    city: "白山",
    type: "纸张",
    price: 25,
  },

  {
    province: "浙江",
    city: "杭州",
    type: "笔",
    price: 20,
  },
  {
    province: "浙江",
    city: "杭州",
    type: "纸张",
    price: 10,
  },
  {
    province: "浙江",
    city: "舟山",
    type: "笔",
    price: 15,
  },
  {
    province: "浙江",
    city: "舟山",
    type: "纸张",
    price: 2,
  },
  {
    province: "吉林",
    city: "长春",
    type: "笔",
    price: 15,
  },
  {
    province: "吉林",
    city: "白山",
    type: "笔",
    price: 30,
  },
  {
    province: "吉林",
    city: "长春",
    type: "纸张",
    price: 40,
  },
  {
    province: "吉林",
    city: "白山",
    type: "纸张",
    price: 50,
  },
]

const options: S2Options = {
  width: 600,
  height: 400,
  showSeriesNumber: true,
  tooltip: { showTooltip: false },
  interaction: { enableCopy: true, hoverHighlight: false },
  showDefaultHeaderActionIcon: false,
}
</script>
<template>
  <SpreadSheet
    sheetType="table"
    :data="data"
    :fields="fields"
    :meta="meta"
    :options="options"
  />
</template>
