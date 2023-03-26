import React, { useContext } from "react"
import { Task, TaskforFrontend } from "../types/project"
import { TaskviwerSelectorContext } from "../pages/project/[id]"

interface Props {
    task: Task
}

const UnAcheivedTaskCard: React.FC<Props> = ({ task }) => {
    const { selectedTasksId, setId } = useContext(TaskviwerSelectorContext)
    const isTaskSelected = selectedTasksId.includes(task.id)
    const clicked = () => {
        const updatedSelectedTaskIds = isTaskSelected
            ? selectedTasksId.filter((id) => id !== task.id)
            : [...selectedTasksId, task.id]
        setId(updatedSelectedTaskIds)
    }

    const selectedClassName = isTaskSelected
        ? "border-gray-500 border-2"
        : "border-gray-200  border-2"
    // const truncateClassName = isTaskSelected ? "text-gray-700" : "text-gray-300"

    return (
        <div
            className={`w-full p-6 bg-white border ${selectedClassName} rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
            key={task.id}
            onClick={clicked}>
            <h5 className=" mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{task.name}</p>
            </h5>
            <p className={`truncate font-normal  dark:text-gray-400`}>
                {task.description || "No description"}
            </p>
        </div>
    )
}

export default UnAcheivedTaskCard
