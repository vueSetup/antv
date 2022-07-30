/** @jsxImportSource @antv/f2 */
import { withTooltip } from "@antv/f2-vue"
import { TooltipView } from "@antv/f2"

// 自定义 Tooltip
export default withTooltip((props: Record<string, unknown>) => {
  const { records } = props as { records: Record<string, unknown>[] }
  const firstRecord = records[0]
  
  const { genre, sold, cost } = firstRecord

  const name = genre
  const value = `sold:${sold},cost:${cost}`

  return (
    <TooltipView
      {...{
        ...props,
        records: [
          {
            ...firstRecord,
            name,
            value,
          },
        ],
      }}
    />
  )
})
