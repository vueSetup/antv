<script lang="ts" setup>
import { createVNode, onBeforeMount, shallowReactive } from "vue"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue"
import { SpreadSheet } from "@/components"
import TaskForm from "./form.vue"
import { deleteData, fetchDataConfig, putData } from "@/api/tasks"
import type { BaseCell, Data, Fields, S2Options, ViewMeta } from "@antv/s2"
import type { Column } from "@/typings"
import { Modal } from "ant-design-vue"

const columns: Column[] = [
  {
    dataIndex: "priority",
    title: "优先级",
  },
  {
    dataIndex: "startdate",
    title: "计划开始",
  },
  {
    dataIndex: "duedate",
    title: "计划结束",
  },
  {
    dataIndex: "status",
    title: "状态",
  },
  {
    dataIndex: "percentcomplete",
    title: "完成百分比",
  },
  {
    dataIndex: "taskstartdate",
    title: "执行开始",
  },
  {
    dataIndex: "taskenddate",
    title: "执行结束",
  },
  {
    dataIndex: "assignedto",
    title: "业务组",
  },
  {
    dataIndex: "consultants",
    title: "用户",
  },
  {
    dataIndex: "keyusers",
    title: "负责人",
  },
  {
    dataIndex: "tcurrent",
    title: "当前进展",
  },
  {
    dataIndex: "remark",
    title: "备注",
  },
]

const options: S2Options = {
  width: 600,
  height: 725,
  hierarchyType: "customTree",
  style: {
    treeRowsWidth: 200,
  },
}

const state = shallowReactive<{
  loading: boolean
  visible: boolean
  action: "plus" | "edit"
  selected: string
  fields: Fields
  data: Data[]
}>({
  loading: true,
  visible: false,
  action: "plus",
  selected: "",
  fields: {
    rows: [],
    columns: ["column"],
    values: [],
    customTreeItems: [],
    valueInCols: true,
  },
  data: [],
})

const initDataConfig = async () => {
  state.loading = true
  const {
    fields: { customTreeItems, values },
    data,
  } = await fetchDataConfig(columns)
  state.fields = {
    ...state.fields,
    values,
    customTreeItems,
  }
  state.data = data
  state.loading = false
}

onBeforeMount(async () => {
  await initDataConfig()
})

const onDataChange = (data: Data[]) => {
  state.data = data
}

const onCellSelected = (cells: BaseCell<ViewMeta>[]) => {
  const [cell] = cells
  if (cell) {
    const { field = "" } = cell.getMeta()
    state.selected = field
    console.log("onCellSelected", cell)
  }
}

const onPlusClick = () => {
  state.action = "plus"
  state.visible = true
}

const onEditClick = () => {
  state.action = "edit"
  state.visible = true
}

const onDeleteClick = () => {
  Modal.confirm({
    title: "是否确定删除此任务?",
    icon: createVNode(ExclamationCircleOutlined),
    // content: createVNode("div", { style: "color:red;" }, "删除之后如果需要恢复请联系管理员"),
    onOk: async () => {
      await deleteData(state.selected)
      await initDataConfig()
      state.selected = ""
    },
    onCancel() {
      console.log("Cancel")
    },
  })
}

const onOk = async () => {
  await initDataConfig()
  state.selected = ""
}
</script>
<template>
  <a-card title="任务管理" bodyStyle="padding:0" :loading="state.loading">
    <template #extra>
      <a-space>
        <a-button
          type="primary"
          :disabled="!state.selected"
          @click="onPlusClick"
        >
          <template #icon><PlusOutlined /></template>
          添加
        </a-button>
        <a-button
          type="primary"
          :disabled="!state.selected"
          @click="onEditClick"
        >
          <template #icon><EditOutlined /></template>
          修改
        </a-button>
        <a-button :disabled="!state.selected" @click="onDeleteClick">
          <template #icon><DeleteOutlined /></template>
          删除
        </a-button>
      </a-space>
    </template>
    <SpreadSheet
      :options="options"
      :fields="state.fields"
      :data="state.data"
      @data-change="onDataChange"
      @cell-selected="onCellSelected"
    />
    <TaskForm
      :selected="state.selected"
      :action="state.action"
      v-model:visible="state.visible"
      @ok="onOk"
    />
  </a-card>
</template>
<style lang="less" scoped></style>
