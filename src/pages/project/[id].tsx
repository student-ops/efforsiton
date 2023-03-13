import { Project } from "../../types/project"
import { GetServerSideProps } from "next"
import { CustomNextPage } from "../../types/custom-next-page"
import { FetchProjectFromId } from "../../lib/project"
import { useSession } from "next-auth/react"
import TaskInputField from "../../components/taskinputfield"
import TaskViwer from "../../components/tasksViwer"
import { useEffect, useState, createContext, useContext } from "react"
import { Task } from "../../types/project"

type Props = {
    Project: Project
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const Project = await FetchProjectFromId(params!.id as string)
    if (!Project) {
    }
    return {
        props: {
            Project,
        },
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

const Projectpage: CustomNextPage<Props> = (props) => {
    const project = props.Project
    const { data: session } = useSession()
    const userName = session?.user?.name
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
            console.log(newUnacheivedTasks, newAcheivedTasks)
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
                        <h1 className="text-xl font-bold">{project.name}</h1>
                        <p>{project.description}</p>
                        <p>
                            created by{" "}
                            <span className="font-bold">{userName}</span>
                        </p>
                        <SelectorContext.Provider value={value}>
                            <TaskViwer
                                acheivedtasks={acheivedTasks}
                                unacheivedtasks={unacheivedTasks}
                            />
                        </SelectorContext.Provider>
                    </div>
                    <div className="flex w-full my-3">
                        <div id="buttons" className="w-2/5">
                            <button onClick={markSelectedTasksAsAchieved}>
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
