import React, { memo, useEffect, createContext } from "react"
import { RxCross1 } from "react-icons/rx"
import SuggestionField from "./suggestionfield"
import { Task } from "../types/project"
import { cancelButton } from "../styles/templates"
import { TaskviwerSelectorContext } from "./taskSelectContext"
import { AchieveTaskFromApi, DeleteSuggestion } from "../lib/taskClinet"

type Props = {
    suggestions: Task[]
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[] | undefined>>
}

const PopUpComponent = ({ suggestions, setTasks, tasks }: Props) => {
    const [suggestionsstate, setSuggestionsstate] =
        React.useState<Task[]>(suggestions)
    const [viewFlag, setViewFlag] = React.useState<boolean>(false)
    const [selectedTasksId, setId] = React.useState<string[]>([])
    const value = { selectedTasksId, setId }
    var tasksId: string[] = []
    const achieveAll = async () => {
        const tasksid = suggestions.map((task) => {
            const newtasks = tasks.map((t) => {
                if (task.id === t.id) {
                    t.acheived = true
                }
                return t
            })
            setTasks(newtasks)
            return task.id
        })
        await AchieveTaskFromApi(tasksid)
        setViewFlag(false)
    }
    const achiveSelected = async () => {
        console.log(selectedTasksId)
        await AchieveTaskFromApi(selectedTasksId)
        const newtask = tasks.map((task) => {
            if (selectedTasksId.includes(task.id)) {
                task.acheived = true
            }
            return task
        })
        setTasks(newtask)
        const unselectedTaskIds: string[] = suggestions
            .filter((task) => !selectedTasksId.includes(task.id))
            .map((task) => task.id)
        await DeleteSuggestion(unselectedTaskIds)

        setViewFlag(false)
    }
    const Deletesuggestions = () => {
        DeleteSuggestion(tasksId)
        setViewFlag(false)
    }

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
                            <TaskviwerSelectorContext.Provider value={value}>
                                <SuggestionField
                                    suggestions={suggestionsstate}
                                />
                            </TaskviwerSelectorContext.Provider>
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
                                <button
                                    className="text-white inline-flex float-right shadow  items-center bg-green-400 border-0 py-1 px-4 focus:outline-none hover:bg-green-400 rounded text-base mt-4 md:mt-0"
                                    onClick={achieveAll}>
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
