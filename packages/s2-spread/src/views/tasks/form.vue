<script lang="ts" setup>
import { ref, reactive, watchEffect, watch } from "vue"
import { Form } from "ant-design-vue"
import dayjs, { Dayjs } from "dayjs"
import request from "@/utils/request"
import { postData, putData } from "@/api/tasks"
import type { Task } from "@/typings"

const labelCol = { span: 4 }
const wrapperCol = { span: 14 }

const props = withDefaults(
  defineProps<{
    selected: string
    action: "plus" | "edit"
    visible: boolean
  }>(),
  {
    selected: "",
    action: "plus",
    visible: true,
  }
)

const emit = defineEmits<{
  (event: "update:visible", visible: boolean): void
  (event: "ok"): void
}>()

const { useForm } = Form

const state = reactive<{
  visible: boolean
  loading: boolean
}>({
  visible: false,
  loading: false,
})

watchEffect(() => {
  emit("update:visible", state.visible)
})

watchEffect(() => {
  state.visible = props.visible
})

const modelRef = reactive<Partial<Task>>({
  priority: "中",
  status: "未开始",
  percentcomplete: 0,
})

const rangeRef = ref<[Dayjs, Dayjs]>()

watch(rangeRef, (range) => {
  if (range) {
    const [start, due] = range
    modelRef.startdate = dayjs(start).format("YYYY-MM-DD")
    modelRef.duedate = dayjs(due).format("YYYY-MM-DD")
  }
})

const rulesRef = reactive({
  title: [
    {
      required: true,
      message: "Please input name",
    },
  ],
  startdate: [
    {
      required: true,
      message: "Please select region",
    },
  ],
  duedate: [
    {
      required: true,
      message: "Please select type",
    },
  ],
})

const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args),
})

const fetchData = async (id: string) => {
  state.loading = true
  const params = {
    id,
  }
  const { data } = await request.get<Task>(`/api/tasks/queryById`, {
    params,
  })

  switch (props.action) {
    case "plus":
      Object.keys(modelRef).map((key) => {
        // @ts-ignore
        modelRef[key] = null
      })
      modelRef.parentid = data.parentid
      break
    case "edit":
      Object.assign(modelRef, data)
      rangeRef.value = [dayjs(data.startdate!), dayjs(data.duedate!)]
      break
    default:
      break
  }
  state.loading = false
}
watchEffect(() => {
  state.visible && props.selected && fetchData(props.selected)
})

const onOk = async () => {
  await validate()
  switch (props.action) {
    case "plus":
      postData(modelRef as unknown as Task)
      break
    case "edit":
      putData(modelRef as unknown as Task)
      break
    default:
      break
  }
  emit("ok")
}

const onCancel = () => {
  state.visible = false
}
</script>
<template>
  <a-modal
    destroyOnClose
    centered
    :visible="state.visible"
    style="width: 65%"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-skeleton :loading="state.loading">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="任务名称">
          <a-input allowClear v-model:value="modelRef.title" />
        </a-form-item>
        <a-form-item label="优先级">
          <a-select v-model:value="modelRef.priority" placeholder="请选择...">
            <a-select-option value="高">高</a-select-option>
            <a-select-option value="中">中</a-select-option>
            <a-select-option value="低">低</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="计划时间">
          <a-range-picker v-model:value="rangeRef" />
        </a-form-item>
        <a-form-item label="任务状态">
          <a-select v-model:value="modelRef.status" placeholder="请选择...">
            <a-select-option value="未开始">未开始</a-select-option>
            <a-select-option value="进行中">进行中</a-select-option>
            <a-select-option value="已完成">已完成</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="完成百分比">
          <a-input-number
            v-model:value="modelRef.percentcomplete"
            :min="0"
            :max="100"
            :formatter="(value:number|string) => `${value}%`"
            :parser="(value:string) => value.replace('%', '')"
          />
        </a-form-item>
        <a-form-item label="业务组">
          <a-input v-model:value="modelRef.assignedto" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="用户组长">
          <a-input v-model:value="modelRef.consultants" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="关键用户">
          <a-input v-model:value="modelRef.keyusers" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </a-skeleton>
  </a-modal>
</template>
