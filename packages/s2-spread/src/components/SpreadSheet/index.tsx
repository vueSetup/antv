import {
  defineComponent,
  shallowRef,
  type ExtractPropTypes,
  type PropType,
} from "vue"
import { useExpose, SheetComponent } from "@antv/s2-vue"
import { useFormItem } from "./useFormItem"
import { Input } from "ant-design-vue"
import type {
  S2DataConfig,
  S2Options,
  Data,
  Fields,
  Meta,
  ViewMeta,
  BaseCell,
} from "@antv/s2"

export type SheetType =
  | "pivot"
  | "table"
  | "gridAnalysis"
  | "strategy"
  | "editable"

export const spreadSheetProps = {
  data: {
    type: Array as PropType<Data[]>,
    required: true,
  },
  fields: {
    type: Object as PropType<Fields>,
    required: true,
  },
  meta: Array as PropType<Meta[]>,
  options: Object as PropType<S2Options>,
}

export type SpreadSheetProps = ExtractPropTypes<typeof spreadSheetProps>

/**
 * https://vuejs.org/api/options-state.html#emits
 */
const SpreadSheet = defineComponent({
  name: "SpreadSheet",
  emits: ["dataChange", "cellSelected"],
  props: spreadSheetProps,
  setup(props, { attrs, emit, expose }) {
    const containerRef = shallowRef<HTMLElement>()

    const sheetRef = useExpose(expose)

    const { styleRef, visibleRef, valueRef, setValue } = useFormItem(
      sheetRef,
      (data: Data[]) => emit("dataChange", data)
    )

    return () => {
      const { data = [], fields = {}, meta, options } = props

      const dataConfig: S2DataConfig = {
        data,
        fields,
        meta,
      }

      const adaptive = {
        width: true,
        height: true,
        getContainer: () => containerRef.value!,
      }

      const onCellSelected = (cell: unknown) => {
        emit("cellSelected", cell)
      }

      return (
        <>
          <div ref={containerRef} style={{ position: "relative" }}>
            {/* {visibleRef.value && (
              <Input
                v-model:value={valueRef.value}
                style={styleRef.value}
                onPressEnter={setValue}
              />
            )} */}
            <SheetComponent
              ref={sheetRef}
              sheetType={attrs.sheetType as SheetType}
              adaptive={adaptive}
              dataCfg={dataConfig}
              options={options}
              onSelected={onCellSelected}
            />
          </div>
        </>
      )
    }
  },
})

export default SpreadSheet
