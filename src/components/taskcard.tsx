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
                key={task.id}
                onClick={() => {
                    console.log("hello")
                }}>
                <h5 className="line-through t mb-2 text-l font-bold tracking-tight text-gray-500 dark:text-white">
                    <p>{task.name}</p>
                </h5>
                {task.description === null ? (
                    <p className="truncate font-normal text-gray-300 dark:text-gray-400">
                        No description
                    </p>
                ) : (
                    <p className="line-through truncate font-normal text-gray-500 dark:text-gray-400">
                        {task.description}
                    </p>
                )}
            </div>
        </>
    )
}

export default AcheivedTaskCard
