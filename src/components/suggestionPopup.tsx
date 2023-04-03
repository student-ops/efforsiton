import React, { memo, useEffect, createContext } from "react"
import { RxCross1 } from "react-icons/rx"
import SuggestionField from "./suggestionfield"
import { Task } from "../types/project"
import { cancelButton } from "../styles/templates"

type Props = {
    suggestions: Task[]
}

interface SuggestionSelectorContextValue {
    selectedTasksId: string[]
    setId: (value: string[]) => void
    achiveTask: (taskId: string) => void
    deleteSuggestions: (taskId: string) => void
}

const achieveTask = async (taskIds: string[]) => {
    const response = await fetch("/efforsition/api/acheiveTask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskIds }),
    })

    if (!response.ok) {
        console.log("Failed to achieve tasks")
    }
}

export const SuggestionTaskviwerSelectorContext =
    createContext<SuggestionSelectorContextValue>({
        selectedTasksId: [],
        setId: () => {},
        achiveTask: () => {},
        deleteSuggestions: () => {},
    })

const PopUpComponent = (props: Props) => {
    const { suggestions } = props
    const [suggestionsstate, setSuggestionsstate] =
        React.useState<Task[]>(suggestions)
    const [viewFlag, setViewFlag] = React.useState<boolean>(false)
    const [selectedTasksId, setSelectedTasksId] = React.useState<string[]>([])
    const value = {
        selectedTasksId,
        setSelectedTasksId,
        achieveTask,
        setSuggestionsstate,
    }
    var tasksId: string[] = []
    const achieveAll = () => {
        const tasksid = suggestions.map((task) => task.id)
        achieveTask(tasksid)
    }
    const achiveSelected = async () => {}

    useEffect(() => {
        if (suggestions) setViewFlag(true)
        tasksId = suggestions.map((task) => task.id)
    }, [suggestions])

    useEffect(() => {
        // 背景画面固定用関数
        const registerBackgroundFixed = () => {
            const body = document.body
            const scrollWidth = window.innerWidth - body.clientWidth
            body.style.marginRight = `${scrollWidth}px`
            body.style.overflowY = "hidden"
        }
        // 背景画面固定解除用関数
        const unRegisterBackgroundFixed = () => {
            const body = document.body
            body.style.overflowY = ""
            body.style.marginRight = ""
        }
        if (viewFlag) registerBackgroundFixed()

        return () => {
            unRegisterBackgroundFixed()
        }
    }, [viewFlag])
    const Deletesuggestions = () => {
        setViewFlag(false)
    }

    // 枠外クリック用関数
    const onClickBackground = () => {}
    const onClickCross = () => {
        setViewFlag(false)
    }
    // 枠内クリック 背景のボタン重なった場合の対策
    const onClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }

    return (
        <>
            <div
                className={
                    "fixed flex flex-col items-center justify-center overflow-hidden bg-gray-500/50 transition-all " +
                    (viewFlag
                        ? " top-0 left-0 h-screen w-screen "
                        : " top-1/2 left-1/2 h-0 w-0 ")
                }
                onClick={onClickBackground}>
                <div className="relative h-3/4 w-3/4 max-w-3xl">
                    {/* バツボタン */}
                    <div className="absolute right-0 -top-10 h-10 w-10 hover:cursor-pointer">
                        <RxCross1
                            className="h-full w-full"
                            onClick={onClickCross}
                        />
                    </div>
                    <div
                        id="policy"
                        className="flex h-full w-full bg-white"
                        onClick={onClickCard}>
                        <div className="flex h-full w-full flex-col items-center">
                            <SuggestionField suggestions={suggestionsstate} />
                            <div
                                id="button-field"
                                className="flex  justify-between w-4/5 mt-auto mb-5">
                                <button
                                    onClick={Deletesuggestions}
                                    className={cancelButton}>
                                    No at all
                                </button>
                                <button className="" onClick={achiveSelected}>
                                    Achieve only selected
                                </button>
                                <button className="" onClick={achieveAll}>
                                    Yes all!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUpComponent
