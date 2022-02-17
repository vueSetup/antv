// https://github.com/antvis/XFlow/blob/master/packages/xflow-core/src/xflow-main/components/extension-registry.tsx
// https://github.com/antvis/XFlow/blob/master/packages/xflow-core/src/xflow-main/components/extension-context.tsx
import type { InjectionKey } from "vue"
import { v4 as uuidv4 } from "uuid"
import { createContext, useContext } from "@/composables"

/** 模块的Config接口 */
export interface IModuleConfig<T = any> {
    CONFIG_TYPE: string
    getConfig: () => Promise<T>
    [key: string]: any
}

/**
 * 模块的接口
 * 包含配置和创建模块的函数
 */
export interface IExtensionModule<T = any> {
    // createModule: (config: IModuleConfig<T>) => SyringeModule
    config: IModuleConfig<T>
}

export class ExtensionRegistry {
    /** 标记xflow app instance */
    private instanceId: string

    readonly extensions: IExtensionModule[] = []

    readonly containerClassNames: Set<string> = new Set()

    constructor() {
        this.instanceId = uuidv4()
    }

    addCoreModule = (extension: IExtensionModule) => {
        // core module 添加在前面
        this.extensions.unshift(extension)
        return Disposable.create(() => {
            this.removeExtension(extension)
        })
    }

    addExtension = (extension: IExtensionModule) => {
        this.extensions.push(extension)
        // return Disposable.create(() => {
        //     this.removeExtension(extension)
        // })
    }

    removeExtension = (extension: IExtensionModule) => {
        const idx = this.extensions.indexOf(extension)
        if (idx > -1) {
            this.extensions.splice(idx, 1)
        }
    }

    getInstaceId = () => {
        return this.instanceId
    }

    addContainerClassNames = (clz: string) => {
        return this.containerClassNames.add(clz)
    }

    getContainerClassNames = () => {
        return Array.from(this.containerClassNames)
    }

    has(name: string) {
        return this.extensions.some(ext => ext.config.CONFIG_TYPE === name)
    }

    getAllExtensions = () => {
        return this.extensions
    }

    getAllExtensionConfigs = () => {
        return this.extensions.map(i => i.config)
    }
}

const contextKey: InjectionKey<ExtensionRegistry> = Symbol('ExtensionRegistry')
const ContextProvider = createContext<ExtensionRegistry>(contextKey)

export const useExtensionRegistry = () => {
    return useContext<ExtensionRegistry>(contextKey)
}
