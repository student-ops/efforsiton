import { FC, useState } from "react"
import Head from "next/head"
import TaskList from "../components/tasklist"
import AddTask from "../components/addtask"

const INITIAL_TASKS = [
    {
        id: "1",
        title: "Buy milk",
        completed: false,
    },
    {
        id: "2",
        title: "Do laundry",
        completed: false,
    },
    {
        id: "3",
        title: "Read a book",
        completed: true,
    },
]

interface Uitest {}

const Home: FC<Uitest> = () => {
    const [tasks, setTasks] = useState(INITIAL_TASKS)

    const handleAddTask = (newTask: {
        id: string
        title: string
        completed: boolean
    }) => {
        setTasks([...tasks, newTask])
    }

    /*
    map メソッドは、配列の各要素に対して呼び出される関数を取り、
    その関数は、処理中の現在の要素を表すパラメータを取ることができます。
    つまり、このコードでは、handleCompleteTask関数のtaskパラメータは、
    mapメソッドで処理されている現在のタスクを表しています。
    オブジェクトの構造化を使用することで、コードはタスクオブジェクトからcompletedプロパティを抽出し、completed変数に代入しています
    */
    const handleCompleteTask = (taskId: string) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed }
            } else {
                return task
            }
        })
        setTasks(updatedTasks)
    }

    return (
        <div>
            <Head>
                <title>Todo List</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Todo List</h1>
                <AddTask onAdd={handleAddTask} />
                <TaskList tasks={tasks} onComplete={handleCompleteTask} />
            </main>

            <footer>
                <p>&copy; {new Date().getFullYear()} My Todo List</p>
            </footer>
        </div>
    )
}

export default Home
