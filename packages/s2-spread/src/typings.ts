export type Column = {
  dataIndex: string
  title: string
  hiddenColumnFields?: boolean
}

export type Task = {
  /**
   * 编号
   */
  id: number
  /**
   * 父级编号
   */
  parentid: number
  /**
   * 序号
   */
  sn: string
  /**
   * 名称
   */
  title: string
  /**
   * 优先级
   */
  priority: "高" | "中" | "低"
  /**
   * 分配至
   */
  assignedto: string
  /**
   * 负责人员
   */
  consultants: string
  /**
   * 关键用户
   */
  keyusers: string
  /**
   * 状态
   */
  status: "未开始" | "进行中" | "已完成" | "延迟" | "等待" | "取消"
  /**
   * 开始日期
   */
  startdate: string
  /**
   * 结束日期
   */
  duedate: string
  /**
   * 内容
   */
  body: string
  /**
   * 权重
   */
  percentweight: number
  /**
   * 完成率
   */
  percentcomplete: number
  /**
   * 前置任务
   */
  // predecessors: number[]
  taskenddate: string
  taskstartdate: string
  /**
   * 备注
   */
  remark: string
}
