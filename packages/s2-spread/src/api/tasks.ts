import { message } from "ant-design-vue"
import request from "@/utils/request"
import type { CustomTreeItem, Data } from "@antv/s2"
import type { Column, Task } from "@/typings"

type PagedTasks = {
  records: Task[]
  total: number
}

export const fetchDataConfig = async (columns: Column[]) => {
  const api = `/api/tasks/list`
  const params = {
    pageSize: 500,
    t: Date.now(),
  }
  const {
    data: { records: list },
  } = await request.get<PagedTasks>(api, { params })

  return {
    data: transformData(list, columns),
    fields: transformFields(list),
  }
}

const transformFields = (list: Task[], rootId: number = 0) => {
  const values: string[] = []

  const transformTreeItems = (parentId: number): CustomTreeItem[] =>
    list
      .filter((item) => item.parentid === parentId)
      .map((item, index) => {
        values.push(item.id.toString())
        const children = transformTreeItems(item.id)
        return {
          ...item,
          key: item.id.toString(),
          collapsed: item.parentid !== 0,
          children: children,
        }
      })

  const customTreeItems: CustomTreeItem[] = transformTreeItems(rootId)

  return {
    values,
    customTreeItems,
  }
}

const transformData = (
  list: Record<string, string | number>[],
  columns: Column[],
  key: string = "id"
): Data[] =>
  list
    .map((item) => {
      const index = item[key] as string
      const data: Data[] = []
      columns.forEach((column) => {
        !column.hiddenColumnFields &&
          data.push({
            ["column"]: column.title,
            [index]: item[column.dataIndex],
          })
      })
      return data
    })
    .flat()

export const postData = async (task: Task) => {
  const { data } = await request.post<Task>(`/api/tasks/add`, task)
  message.success(`任务已添加`)
}

export const putData = async (task: Task) => {
  const { data } = await request.put<Task>(`/api/tasks/edit`, task)
  message.success(`任务已修改`)
}

export const upgradeData = async (
  id: string,
  field: string,
  value: unknown,
  columns: Column[]
) => {
  const fieldName = columns.find((column) => column.title === field)?.dataIndex!
  const task = {
    id,
    [fieldName]: value,
  }
  const { data } = await request.put<Task>(`/api/tasks/edit`, task)
  message.success(`${field}已更新为${value}`)
}

export const deleteData = async (id: string) => {
  const params = { id }
  const { data } = await request.delete(`/api/tasks/delete`, { params })
}
