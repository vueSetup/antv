// https://github.com/antvis/XFlow/blob/master/packages/xflow-core/src/xflow-main/components/index.tsx
import { defineComponent, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
/** app */
// import { initApp } from '../application-module'
// import { XFlowAppInternalProvider, useXFlowApp } from './app-context'
// import type { FrontendApplication as IApplication } from '../application'
/** app-extension */
// import { ExtensionRegistryContext } from './extension-context'
// import { useXflowPrefixCls } from './global-config-context'
// import { XFlowAppExtensionMoudle } from './app-extension-module'
// import { ExtensionRegistry, createExtensionRegistry } from './extension-registry'
/** graph */
import { XFlowCanvas } from './canvas'
// import type { GraphConfig } from '../graph'
/** command */
// import { ModelServiceRegistry } from '../../model-service'
import { XFlowGraphCommands } from '../command-contributions'
// import type { ModelServiceConfig } from '../../model-service'
// import type { CommandConfig } from '../../command-contributions'
/** hook */
// import { HookRegistry } from '../../hooks'
// import type { HookConfig } from '../../hooks'
/** UI model */
// import { ToolbarRegistry } from '../../toolbar'
// import { MenuRegistry } from '../../menu'

import type { NsGraph } from '../interface'
// import type { NsGraphCmd } from '../../command-contributions'

// export type IAppLoad = (app: IApplication, registry?: ExtensionRegistry) => void

const props = {
    /** XFlow 工作台组件元信息, 会储存在全局Model中并在调用Service时作为额外的参数传入 */
    meta: Object as PropType<{ flowId?: string; [key: string]: any }>,
    /** 画布的配置，用于配置X6的Grpah.Options和绑定Graph的事件 */
    // graphConfig: Object as PropType<GraphConfig>,
    /** 画布数据 */
    graphData: Object as PropType<NsGraph.IGraphData>,
    /** 布局配置项 */
    graphLayout: Object as PropType<NsGraphCmd.GraphLayout.IArgs>,
    /** app 初始化成功的回调 */
    // onLoad: Function as PropType<IAppLoad>,
    /** 画布是否自动居中 */
    isAutoCenter: Boolean,
    /** 核心模块钩子函数，可以配置额外的业务逻辑包括以下4个hook：
     * 1. graphOptions: 在实例化X6之前执行
     * 2. afterGraphInit:  在实例化X6后执行
     * 3. x6Events: 在实例化X6后绑定事件
     * 4. beforeGraphDestroy: 在X6实例销毁前执行
     */
    // hookConfig: HookConfig
    /** 可以在这里扩展工作台全局状态  */
    // modelServiceConfig: Object as PropType<ModelServiceConfig>,
    /** 在这里配置命令的hook */
    // commandConfig: Object as PropType<CommandConfig>

    /** xflow app 销毁前的回调 */
    // onAppDestroy: Function as PropType<IAppDestroy>
    /** xflow app 初始化后的回调 */
    // onAppConfigReady: Function as PropType<IAppConfigReady>

    /** app container style */
    style: Object as PropType<CSSProperties>,
    /** app container classname */
    className: String,
    /** xflow less文件中的prefix变量 */
    xflowPrefixCls: String
}

export type XFlowProps = ExtractPropTypes<typeof props>

export const XFlow = defineComponent({
    props,
    setup(props, { slots }) {
        const appRef = ref<any>(null)

        onMounted(() => {})

        onUnmounted(() => {})

        watchEffect(() => {
            if (appRef) {
                appRef.commandService.executeCommand(XFlowGraphCommands.LOAD_META.id, {
                    meta: props.meta
                })
            }
        })

        watchEffect(async () => {
            if (appRef) {
                const graphData = props.graphData
                const graphLayout = props.graphLayout
                const isAutoCenter = props.isAutoCenter

                if (graphData && graphLayout) {
                    await appRef.commandService.executeCommand(XFlowGraphCommands.GRAPH_LAYOUT.id, {
                        graphData,
                        ...graphLayout
                    })
                }
                await appRef.commandService.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, {
                    graphData
                })

                /** 自动居中画布内容 */
                if (isAutoCenter) {
                    const x6Graph = await appRef.getGraphInstance()
                    x6Graph.centerContent()
                }
            }
        })

        const children = slots.default?.()

        /** 判断是否需要自动渲染画布组件, 坐标相对于xflow-graph-root */
        const hasCanvasComponent = children?.some((child) => {
            return child && child.props?.isXFlowCanvas
        })

        return () => (
            <div>
                {/** 挂载XFlowCanvas组件 坐标相对于xflow-graph-root */}
                {!hasCanvasComponent && (
                    <XFlowCanvas
                    // config={graphConfig}
                    // position={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    />
                )}
                {children}
            </div>
        )
    }
})

export { XFlowCanvas }
