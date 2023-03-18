import axios from "axios"
import { PromptComponent, TaskforPrompt } from "../types/gptapi"
interface File {
    filename: string
    contentsUrl: string
}

interface FileContent {
    filename: string
    contents: string
}

// get code form github by commit sha and others
export async function getCommitFiles(
    owner: string,
    repo: string,
    commitSha: string
): Promise<FileContent[]> {
    const commitUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`
    const { data } = await axios.get(commitUrl)

    const files: File[] = data.files.map((file: any) => {
        return {
            filename: file.filename,
            contentsUrl: file.raw_url,
        }
    })

    const fileContents = await Promise.all(
        files.map(async (file: File) => {
            const { data } = await axios.get(file.contentsUrl)
            return {
                filename: file.filename,
                contents: data,
            }
        })
    )

    return fileContents
}

export function CreatePrompt(
    component: PromptComponent,
    tasks: TaskforPrompt[]
) {
    let tasksString = tasks
        .map((task) => `{${task.name}: "${task.description}"}`)
        .join(",\n  ")
    let promptMessage = `Guess the completed task from the updated content of the code. Answer the task name only in the following format:\n
#################
{
    filename:"${component.filename}"
    timestamp:"${component.timestamp}"
    commit comment:"${component.comment}"
    content "{
    ${component.contents}
    }"
},
###############
tasks[
${tasksString}
]
`
    return promptMessage
}
