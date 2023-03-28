import React from "react"
import { Task } from "../types/project"

interface Props {
    task: Task
}
const AcheivedTaskCard: React.FC<Props> = ({ task }) => {
    return (
        <>
            <div
                className="max-w-sm p-6 bg-green-50 border border-green-200 rounded-lg shadow hover:bg-green-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                key={task.id}>
                <h5 className="t mb-2 text-l font-bold tracking-tight text-gray-700 dark:text-white">
                    <p>{task.name}</p>
                </h5>
                {task.description === null ? (
                    <p className="truncate font-normal text-gray-400 dark:text-gray-400">
                        No description
                    </p>
                ) : (
                    <p className="truncate font-normal text-gray-700 dark:text-gray-400">
                        {task.description}
                    </p>
                )}
            </div>
        </>
    )
}

export default AcheivedTaskCard
