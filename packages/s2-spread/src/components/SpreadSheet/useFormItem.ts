import {
  reactive,
  watch,
  watchEffect,
  onScopeDispose,
  shallowReactive,
  shallowRef,
  type ShallowRef,
  toRefs,
  type ComponentPublicInstance,
} from "vue"
import {
  BaseCell,
  S2Event,
  GEvent,
  type SpreadSheet,
  type ScrollOffset,
} from "@antv/s2"
import { isEqual, pick } from "lodash-es"
import type { SheetExpose } from "@antv/s2-vue"

type Meta = {
  x: number
  y: number
  width: number
  height: number

  rowIndex: number
  valueField: string

  fieldValue: unknown
}

type Position = {
  top: number
  left: number
  width: number
  height: number
}

export const useFormItem = (spreadRef: ShallowRef<SheetExpose>) => {
  const cellRef = shallowRef<BaseCell<Meta>>()

  const valueRef = shallowRef<unknown>()

  const visibleRef = shallowRef<boolean>(false)

  const positionRef = shallowRef<Position>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

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
  const setCellPosition = (cell: BaseCell<Meta>) => {
    const spreadsheet = spreadRef.value?.instance
    if (spreadsheet) {
      const meta = cell.getMeta()

      const colCellHeight = (spreadsheet.getColumnNodes()[0] || { width: 0 })
        .height

      meta.x -= state.scroll.scrollX || 0
      meta.y -= (state.scroll.scrollY || 0) - colCellHeight

      positionRef.value = {
        left: meta.x,
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
      setCellPosition(cell)
      visibleRef.value = true
      valueRef.value = cell.getMeta().fieldValue
    }
  })

  /**
   * setValue, setVisible,
   */
  const setCellValue = (value: unknown) => {
    const spreadsheet = spreadRef.value?.instance
    const cell = cellRef.value
    if (spreadsheet && cell) {
      const { rowIndex, valueField } = cell.getMeta()
      spreadsheet.dataSet.originData[rowIndex][valueField] = value
      spreadsheet.render(true)
      visibleRef.value = false
    }
  }

  /**
   * setCellRef
   */
  const handleClick = (e: GEvent) => {
    setCellValue(valueRef.value)
    cellRef.value = e.target.cfg.parent as BaseCell<Meta>
  }

  watchEffect((onCleanup) => {
    const spreadsheet = spreadRef.value?.instance
    spreadsheet?.on(S2Event.DATA_CELL_CLICK, handleClick)
    onCleanup(() => {
      spreadsheet?.off(S2Event.DATA_CELL_CLICK, handleClick)
    })
  })

  /**
   * TODO :: watch(()=>state.scroll,()=> ???)
   * setVisible, setScroll
   */
  const handleScroll = () => {
    const spreadsheet = spreadRef.value?.instance
    if (spreadsheet) {
      const newScroll = spreadsheet.facet.getScrollOffset()
      if (!isEqual(newScroll, state.scroll)) {
        const colCellHeight = (spreadsheet.getColumnNodes()[0] || { height: 0 })
          .height

        const inView = (x: number, y: number) => {
          const inX =
            x > state.scroll.scrollX! &&
            x < state.scroll.scrollX! + spreadsheet.options.height!
          const inY =
            y > state.scroll.scrollY! + colCellHeight &&
            y < state.scroll.scrollY! + spreadsheet.options.height!
          return inX && inY
        }

        if (
          inView(positionRef.value.left, positionRef.value.top + colCellHeight)
        ) {
          visibleRef.value = true
        } else {
          visibleRef.value = false
        }

        state.scroll = spreadsheet.facet.getScrollOffset()
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
    positionRef,
    visibleRef,
    valueRef,
    setCellValue,
  }
}
