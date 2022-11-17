import {
  shallowRef,
  shallowReactive,
  watch,
  watchEffect,
  computed,
  type ShallowRef,
  type CSSProperties,
} from "vue"
import {
  BaseCell,
  S2Event,
  GEvent,
  type Data,
  type ViewMeta,
  type ScrollOffset,
} from "@antv/s2"
import { isEqual } from "lodash-es"
import type { SheetExpose } from "@antv/s2-vue"

type Position = {
  top: number
  left: number
  width: number
  height: number
}

export const useFormItem = (
  spreadRef: ShallowRef<SheetExpose>,
  onDataChange?: (data: Data[]) => void | Promise<void>
) => {
  const cellRef = shallowRef<BaseCell<ViewMeta>>()

  const valueRef = shallowRef<unknown>()

  const visibleRef = shallowRef<boolean>(false)

  const positionRef = shallowRef<Position>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  const styleRef = computed<CSSProperties>(() => ({
    left: `${positionRef.value.left}px`,
    top: `${positionRef.value.top}px`,
    width: `${positionRef.value.width}px`,
    height: `${positionRef.value.height}px`,
    position: "absolute",
    textAlign: "right",
    zIndex: 1000,
  }))

  const state = shallowReactive<{
    scroll: ScrollOffset
  }>({
    scroll: {
      scrollX: 0,
      scrollY: 0,
    },
  })

  /**
   * setPosition => style = { top, left, width, height }
   */
  const setPosition = (cell: BaseCell<ViewMeta>) => {
    const spreadSheet = spreadRef.value?.instance
    if (spreadSheet) {
      const meta = cell.getMeta()

      const colCellHeight = (spreadSheet.getColumnNodes()[0] || { width: 0 })
        .height

      meta.x -= state.scroll.scrollX || 0
      meta.y -= (state.scroll.scrollY || 0) - colCellHeight

      positionRef.value = {
        left: meta.x + 200,
        top: meta.y,
        width: meta.width,
        height: meta.height,
      }
    }
  }

  /**
   * setPosition, setVisible, setValue
   */
  watch(cellRef, (cell) => {
    if (cell) {
      setPosition(cell)
      visibleRef.value = true
      valueRef.value = cell.getMeta().fieldValue
    }
  })

  /**
   * setValue, setVisible,
   */
  const setValue = () => {
    const spreadSheet = spreadRef.value?.instance
    const cell = cellRef.value
    if (spreadSheet && cell) {
      const { rowIndex, rowQuery, colQuery, valueField } = cell.getMeta()

      if (spreadSheet.isTableMode()) {
        spreadSheet.dataSet.originData[rowIndex][valueField] = valueRef.value
        spreadSheet.render()
      } else {
        const query = { ...rowQuery, ...colQuery }
        const data = spreadSheet.dataSet.getCellData({ query })
        if (data && !Array.isArray(data)) {
          Reflect.set(data, valueField, valueRef.value)
        } else {
          console.error(`spreadSheet.dataSet.getCellData has fail:`, query)
        }
      }
      onDataChange?.(spreadSheet.dataSet.originData)
      visibleRef.value = false
    }
  }

  /**
   * setCellRef
   */
  const handleClick = (e: GEvent) => {
    setValue()
    cellRef.value = e.target.cfg.parent as BaseCell<ViewMeta>
    console.log("cellRef.value.getMeta()", cellRef.value.getMeta())
  }

  watchEffect((onCleanup) => {
    const spreadSheet = spreadRef.value?.instance
    spreadSheet?.on(S2Event.DATA_CELL_CLICK, handleClick)
    onCleanup(() => {
      spreadSheet?.off(S2Event.DATA_CELL_CLICK, handleClick)
    })
  })

  /**
   * TODO :: watch(()=>state.scroll,()=> ???)
   * setVisible, setScroll
   */
  const handleScroll = () => {
    const spreadSheet = spreadRef.value?.instance
    if (spreadSheet) {
      const newScroll = spreadSheet.facet.getScrollOffset()
      if (!isEqual(newScroll, state.scroll)) {
        const colCellHeight = (spreadSheet.getColumnNodes()[0] || { height: 0 })
          .height

        const inView = (x: number, y: number) => {
          const inX =
            x > state.scroll.scrollX! &&
            x < state.scroll.scrollX! + spreadSheet.options.height!
          const inY =
            y > state.scroll.scrollY! + colCellHeight &&
            y < state.scroll.scrollY! + spreadSheet.options.height!
          return inX && inY
        }

        if (
          inView(positionRef.value.left, positionRef.value.top + colCellHeight)
        ) {
          visibleRef.value = true
        } else {
          visibleRef.value = false
        }

        state.scroll = spreadSheet.facet.getScrollOffset()
      }
    }
  }

  watchEffect((onCleanup) => {
    if (spreadRef.value) {
      spreadRef.value.instance?.on(S2Event.GLOBAL_SCROLL, handleScroll)
      onCleanup(() => {
        spreadRef.value.instance?.off(S2Event.GLOBAL_SCROLL, handleScroll)
      })
    }
  })

  return {
    valueRef,
    visibleRef,
    styleRef,
    setValue,
  }
}
