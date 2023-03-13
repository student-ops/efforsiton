import { FC, useState, FormEvent } from "react"
import { v4 as uuidv4 } from "uuid"

interface AddTaskProps {
    onAdd: (task: { id: string; title: string; completed: boolean }) => void
}

//handleadd task関数がtaskをsetするためにあたえられる。
const AddTask: FC<AddTaskProps> = ({ onAdd }) => {
    const [title, setTitle] = useState("")
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (title.trim() == "") {
            alert("Please enter a task")
            return
        }
        const newTask = {
            id: uuidv4(),
            title,
            completed: false,
        }
        // 渡された関数を使用して、新しいタスクを追加する
        onAdd(newTask)
        setTitle("")
    }

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={handleChange}
                placeholder="Add a task"
            />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default AddTask
