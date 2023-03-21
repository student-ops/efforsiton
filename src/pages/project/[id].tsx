import { Project, Task } from "../../types/project"
import { GetServerSideProps } from "next"
import { CustomNextPage } from "../../types/custom-next-page"
import { FetchProjectFromId } from "../../lib/project"
import TaskInputField from "../../components/taskinputfield"
import TaskViwer from "../../components/tasksViwer"
import { useEffect, useState, createContext, useContext } from "react"
import LinkRepo from "../../components/linkRepo"
import { Session } from "next-auth"

type Props = {
    project: Project
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try {
        const projectId = params!.id as string
        const project = await FetchProjectFromId(projectId)

        if (!project) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                project,
            },
        }
    } catch (error) {
        console.error("Error fetching project:", error)
        return {
            notFound: true,
        }
    }
}
interface SelectorContextValue {
    selectedTasksId: string[]
    setId: (value: string[]) => void
}

export const SelectorContext = createContext<SelectorContextValue>({
    selectedTasksId: [],
    setId: () => {},
})

const fetchTasksFromApi = async (projectid: string) => {
    const taskarray: Task[] = await fetch(`/api/task?projectid=${projectid}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((tasks) => {
            const taskArray = tasks.tasks
            return taskArray
        })
        .catch((err) => {
            // must Implement error handling
        })

    return taskarray
}

const achieveTask = async (taskId: string) => {
    const response = await fetch(`/api/acheiveTask?taskid=${taskId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        throw new Error("Failed to achieve task")
    }
}

const Projectpage: CustomNextPage<Props> = ({ project }) => {
    const [tasks, setTasks] = useState<Task[]>()
    const [dummytask, setdummytask] = useState<Task>()
    const [selectedTasksId, setId] = useState<string[]>([])
    const [acheivedTasks, setAcheivedTasks] = useState<Task[]>([])
    const [unacheivedTasks, setUnacheivedTasks] = useState<Task[]>([])
    const value = { selectedTasksId, setId }

    useEffect(() => {
        if (dummytask) {
            setTasks([...(tasks || []), dummytask])
        }
    }, [dummytask])
    useEffect(() => {
        if (tasks) {
            const newAcheivedTasks: Task[] = []
            const newUnacheivedTasks: Task[] = []
            tasks.forEach((task) => {
                if (task.acheived) {
                    newAcheivedTasks.push(task)
                } else {
                    newUnacheivedTasks.push(task)
                }
            })
            setAcheivedTasks(newAcheivedTasks)
            setUnacheivedTasks(newUnacheivedTasks)
        }
    }, [tasks])
    useEffect(() => {
        const fetchTasks = async () => {
            const taskArray = await fetchTasksFromApi(project.id)
            setTasks(taskArray)
        }
        fetchTasks()
    }, [project.id])
    const markSelectedTasksAsAchieved = () => {
        const updatedAcheivedTasks = [...acheivedTasks]
        const updatedUnacheivedTasks = unacheivedTasks.filter((task) => {
            if (selectedTasksId.includes(task.id)) {
                achieveTask(task.id)
                updatedAcheivedTasks.push({ ...task, acheived: true })
                task.acheived = true
                return false
            }
            return true
        })
        setAcheivedTasks(updatedAcheivedTasks)
        setUnacheivedTasks(updatedUnacheivedTasks)
        setId([])
    }
    return (
        <>
            <div className="flex h-secreen">
                <div className="w-1/5">Your projects</div>
                <div className="w-4/5">
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <div className="3/5">
                                <h1 className="text-xl font-bold">
                                    {project.name}
                                </h1>
                                <p>{project.description}</p>
                                <p>created by </p>
                            </div>
                            <div className="w-2/5 float-right">
                                <LinkRepo project={project!} />
                            </div>
                        </div>
                        <SelectorContext.Provider value={value}>
                            <TaskViwer
                                acheivedtasks={acheivedTasks}
                                unacheivedtasks={unacheivedTasks}
                            />
                        </SelectorContext.Provider>
                    </div>
                    <div className="flex  justify-between w-full my-3">
                        <div id="buttons" className="w-2/5">
                            <button className=" inline-flex items-center border  text-gray-400  border-gray-300 py-1 px-3 focus:outline-none hover:bg-gray-800 rounded text-base mt-4 md:mt-0">
                                delete
                            </button>
                            <button
                                className="text-gray-200 inline-flex float-right items-center bg-green-400 border-0 py-1 px-3 focus:outline-none hover:bg-green-400 rounded text-base mt-4 md:mt-0"
                                onClick={markSelectedTasksAsAchieved}>
                                acheive
                            </button>
                        </div>
                    </div>
                    <div className="w-full">
                        <TaskInputField setdummytask={setdummytask} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projectpage
Projectpage.requireAuth = true
