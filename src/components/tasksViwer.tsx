import { Task, TaskforFrontend } from "../types/project"
import React from "react"
import AcheivedTaskCard from "../components/taskcard"
import UnAcheivedTaskCard from "../components/unAcheivedTaskcard"
import { useEffect, useState } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"

interface Props {
    acheivedtasks: Task[] | undefined | null
    unacheivedtasks: Task[] | undefined | null
}

const TaskViwer: NextPage<Props> = ({ unacheivedtasks, acheivedtasks }) => {
    return (
        <>
            <div className="flex w-full h-full">
                <div className="border-2 h-96  w-2/5 p-8 overflow-auto hover:overflow-scroll">
                    <p>Incompleted tasks</p>
                    {unacheivedtasks?.map((task: Task) => {
                        return <UnAcheivedTaskCard key={task.id} task={task} />
                    })}
                </div>
                <div className="border-2 h-96 w-2/5  p-8 overflow-y-auto hover:overflow-scroll">
                    <p>Completed tasks</p>
                    {acheivedtasks?.map((task: Task) => {
                        return <AcheivedTaskCard key={task.id} task={task} />
                    })}
                </div>
            </div>
        </>
    )
}

export default TaskViwer
