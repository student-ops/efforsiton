import React, { createContext } from "react"
export interface SelectorContextValue {
    selectedTasksId: string[]
    setId: (value: string[]) => void
}
export const TaskviwerSelectorContext = createContext<SelectorContextValue>({
    selectedTasksId: [],
    setId: () => {},
})
