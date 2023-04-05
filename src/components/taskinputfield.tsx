import { NextPage } from "next"
import { FormEvent, useState } from "react"
import { TaskForInsert } from "../types/project"
import Router, { useRouter } from "next/router"
import { Task } from "../types/project"
import { smallButton, cancelButton } from "../styles/templates"

type Props = {
    setdummytask: React.Dispatch<React.SetStateAction<Task | undefined>>
}
const TaskInputField: React.FC<Props> = (setdummytask) => {
    const [name, setName] = useState("")
    const [description, setDesc] = useState("")
    const router = useRouter()
    const projectid = router.query.id as string
    // 存在しないidを受け取った時のエラー処理
    if (typeof projectid !== "string") {
        console.error()
        router.push("/error")
    }

    const SubmitTask = (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        if (name.trim() == "") {
            alert("Please enter a Task name")
            return
        }
        const newTask: TaskForInsert = {
            name: name,
            description: description,
            belongsTo: projectid!,
            parentId: "null",
        }
        fetch("/api/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                const dummyTask: Task = {
                    id: data.id,
                    name: name,
                    description: description,
                    belongsTo: projectid!,
                    parentId: "null",
                    createdAt: new Date(),
                    acheived: false,
                    userId: "dummy",
                    suggested: false,
                }
                setdummytask.setdummytask(dummyTask)
                setName("")
                setDesc("")
            })
            .catch(() => {
                alert("someerror")
            })
    }

    return (
        <form
            onSubmit={SubmitTask}
            onReset={() => {
                setName("")
                setDesc("")
            }}>
            <div className="editor rounded-lg  flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                <input
                    className="title rounded bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    spellCheck="false"
                    placeholder="Taskname"
                    type="text"
                    value={name}
                    onChange={(e) => {
                        // console.log(e.currentTarget.value)
                        setName(e.currentTarget.value)
                    }}
                />
                <textarea
                    className="description rounded bg-gray-100 sec p-3 h-15 border border-gray-300 outline-none"
                    spellCheck="false"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                        setDesc(e.currentTarget.value)
                    }}></textarea>
                <div className="buttons flex mt-3">
                    <button type="reset" className={cancelButton}>
                        Cancel
                    </button>
                    <button type="submit" className={smallButton}>
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}

export default TaskInputField
