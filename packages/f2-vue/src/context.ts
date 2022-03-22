import { inject } from "vue"
import { Chart } from "@antv/f2"

export type CanvasContext = {
    children: JSX.Element[]
    push: (component: JSX.Element) => void    
}

export const canvasContextKey = Symbol('CanvasContext')
