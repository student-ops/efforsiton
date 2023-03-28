import { Task } from "../types/project"
import React from "react"
import UnAcheivedTaskCard from "./unAcheivedTaskcard"

interface Props {
    suggestions: Task[]
}
const SuggestionField: React.FC<Props> = ({ suggestions }) => {
    return (
        <div className="w-1/2">
            <div className="font-bold  text-center text-xl my-5">
                Did you acheived these tasks ?
            </div>
            {suggestions.map((task: Task) => {
                return <UnAcheivedTaskCard key={task.id} task={task} />
            })}
        </div>
    )
}

export default SuggestionField
