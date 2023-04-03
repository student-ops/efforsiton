import { NextPage } from "next"
import { FormEvent, useState } from "react"

type Props = {
    promise: () => Promise<void>
}
const ProjectInputField: React.FC<Props> = ({ promise }) => {
    const [name, setName] = useState("")
    const [description, setDesc] = useState("")
    const SubmitProject = (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        if (name.trim() == "") {
            alert("Please enter a Project name")
            return
        }
        const newProject = {
            name: name,
            description: description,
        }
        fetch("/efforsition/api/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProject),
        })
            .then(() => {
                setName("")
                setDesc("")
                promise()
                // alert("success")
            })
            .catch(() => {
                alert("someerror")
            })
    }

    return (
        <div className="w-full max-w-screen-lg fixed-input">
            <form
                onSubmit={SubmitProject}
                onReset={() => {
                    setName("")
                    setDesc("")
                }}>
                <div className="p-4 w-full text-gray-800 border border-gray-300 shadow-lg">
                    <input
                        className="title w-full bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                        spellCheck="false"
                        placeholder="Project Name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.currentTarget.value)
                        }}
                    />
                    <textarea
                        className="w-full bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none"
                        spellCheck="false"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => {
                            setDesc(e.currentTarget.value)
                        }}></textarea>
                    <div className="buttons flex mt-3">
                        <button
                            className="border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500"
                            type="reset">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProjectInputField
