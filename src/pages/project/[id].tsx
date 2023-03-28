import { Project, Task } from "../../types/project"
import { GetServerSideProps } from "next"
import { CustomNextPage } from "../../types/custom-next-page"
import { FetchProjectFromId } from "../../lib/project"
import TaskInputField from "../../components/taskinputfield"
import TaskViwer from "../../components/tasksViwer"
import { useEffect, useState, createContext } from "react"
import LinkRepo from "../../components/linkRepo"
import PopUpComponent from "../../components/suggestionPopup"
import ProjectList from "../../components/projectList"
import { FetchMyProjects } from "../../lib/project"
import { getSession } from "next-auth/react"

type Props = {
    project: Project
    myprojects: Project[]
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const session = await getSession(context)
        // Now you can access the session data using the `session` object.

        const projectId = context.params!.id as string
        const project = await FetchProjectFromId(projectId)
        const myprojects = await FetchMyProjects(session?.user.name!)

        if (!project) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                project: project,
                myprojects: myprojects,
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
export const TaskviwerSelectorContext = createContext<SelectorContextValue>({
    selectedTasksId: [],
    setId: () => {},
})

const fetchTasksFromApi = async (projectid: string): Promise<Task[]> => {
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

const achieveTask = async (taskIds: string[]) => {
    const response = await fetch("/api/acheiveTask", {
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

const Projectpage: CustomNextPage<Props> = ({ project, myprojects }) => {
    const [tasks, setTasks] = useState<Task[]>()
    const [dummytask, setdummytask] = useState<Task>()
    const [selectedTasksId, setId] = useState<string[]>([])
    const [acheivedTasks, setAcheivedTasks] = useState<Task[]>([])
    const [unacheivedTasks, setUnacheivedTasks] = useState<Task[]>([])
    const [suggetedTasks, setSuggetedTasks] = useState<Task[]>([])
    const [viewFlag, setViewFlag] = useState<boolean>(false)
    const value = { selectedTasksId, setId }
    const fetchTasks = async () => {
        const taskArray = await fetchTasksFromApi(project.id)
        setTasks(taskArray)
    }

    useEffect(() => {
        if (dummytask) {
            setTasks([...(tasks || []), dummytask])
        }
    }, [dummytask])
    useEffect(() => {
        if (tasks) {
            const newAcheivedTasks: Task[] = []
            const newUnacheivedTasks: Task[] = []
            const newSuggetedTasks: Task[] = []
            tasks.forEach((task) => {
                if (task.acheived) {
                    newAcheivedTasks.push(task)
                } else {
                    newUnacheivedTasks.push(task)
                }
                if (task.suggested && !task.acheived) {
                    newSuggetedTasks.push(task)
                    setViewFlag(true)
                }
            })
            setAcheivedTasks(newAcheivedTasks)
            setUnacheivedTasks(newUnacheivedTasks)
            setSuggetedTasks(newSuggetedTasks)
        }
    }, [tasks])

    useEffect(() => {
        fetchTasks()
    }, [project.id])

    const markSelectedTasksAsAchieved = () => {
        achieveTask(selectedTasksId)
            .then(() => {
                const { updatedAchievedTasks, updatedUnachievedTasks } =
                    unacheivedTasks.reduce(
                        (
                            acc: {
                                updatedAchievedTasks: Task[]
                                updatedUnachievedTasks: Task[]
                            },
                            task: Task
                        ) => {
                            if (selectedTasksId.includes(task.id)) {
                                acc.updatedAchievedTasks.push(task)
                            } else {
                                acc.updatedUnachievedTasks.push(task)
                            }
                            return acc
                        },
                        {
                            updatedAchievedTasks: [...acheivedTasks],
                            updatedUnachievedTasks: [], // 空の配列を初期値として割り当てる
                        }
                    )

                setAcheivedTasks(updatedAchievedTasks)
                setUnacheivedTasks(updatedUnachievedTasks)
                setId([])
            })
            .catch((error) => {
                console.error("Failed to achieve tasks:", error.message)
            })
    }

    return (
        <>
            {viewFlag && <PopUpComponent suggestions={suggetedTasks} />}
            <div className="flex h-secreen">
                <div className="w-1/6 ">
                    <div>Your projects</div>
                    {/* <Projectsidebar projects={myprojects} /> */}
                </div>
                <div className="w-4/5">
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <div className="3/5">
                                <h1 className="text-xl font-bold">
                                    {project.name}
                                </h1>
                                <p>{project.description}</p>
                            </div>
                            <div className="w-2/5 float-right flex-col justify-center ">
                                <LinkRepo project={project!} />
                                <div onClick={fetchTasks}>update</div>
                            </div>
                        </div>
                        <TaskviwerSelectorContext.Provider value={value}>
                            <TaskViwer
                                acheivedtasks={acheivedTasks}
                                unacheivedtasks={unacheivedTasks}
                            />
                        </TaskviwerSelectorContext.Provider>
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
