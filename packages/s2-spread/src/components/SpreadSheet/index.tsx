import {
  defineComponent,
  shallowRef,
  type ExtractPropTypes,
  type PropType,
  type CSSProperties,
} from "vue"
import { useExpose, SheetComponent } from "@antv/s2-vue"
import type { S2DataConfig, S2Options, Data, Fields, Meta } from "@antv/s2"
import { useFormItem } from "./useFormItem"
import { Input, Button } from "ant-design-vue"
import "ant-design-vue/es/input/style"

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

const SpreadSheet = defineComponent({
  name: "SpreadSheet",
  props: spreadSheetProps,
  setup(props, { expose }) {
    const containerRef = shallowRef<HTMLElement>()

    const sheetRef = useExpose(expose)

    const { positionRef, visibleRef, valueRef, setCellValue } =
      useFormItem(sheetRef)

    return () => {
      const { data = [], fields = {}, meta, options } = props

      const { left, top, width, height } = positionRef.value

      const style: CSSProperties = {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute",
        textAlign: "right",
        zIndex: 1000,
      }

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

      return (
        <>
          <div ref={containerRef} style={{ position: "relative" }}>
            {visibleRef.value && (
              <Input v-model:value={valueRef.value} style={style} />
            )}
            <SheetComponent
              sheetType="table"
              ref={sheetRef}
              adaptive={adaptive}
              dataCfg={dataConfig}
              options={options}
            />
          </div>
        </>
      )
    }
  },
})

export default SpreadSheet
