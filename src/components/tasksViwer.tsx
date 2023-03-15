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
            <div className="flex w-full h-full ">
                <div className="w-2/5 py-5">
                    <p className="text-lg font-bold">In Completed tasks</p>
                    <div className="border-2 h-96 w-full p-8 overflow-auto hover:overflow-scroll">
                        {unacheivedtasks?.map((task: Task) => {
                            return (
                                <UnAcheivedTaskCard key={task.id} task={task} />
                            )
                        })}
                    </div>
                </div>
                <div className="w-2/5 py-5">
                    <p className="text-lg font-bold ">Completed tasks</p>
                    <div className="border-2 h-96 w-full p-8 overflow-y-auto hover:overflow-scroll">
                        {acheivedtasks?.map((task: Task) => {
                            return (
                                <AcheivedTaskCard key={task.id} task={task} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskViwer
