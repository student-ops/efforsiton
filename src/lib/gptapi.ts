import axios from "axios"
import { PromptComponent, TaskforPrompt } from "../types/gptapi"
import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"

interface File {
    filename: string
    contentsUrl: string
}

interface FileContent {
    filename: string
    contents: string
}

dotenv.config()

export const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function ReqestGpt(question: string, uuid: string) {
    const openai = new OpenAIApi(configuration)
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 1000,
            temperature: 0.6,
            best_of: 2,
            user: uuid,
        })
        var answer = ""
        if (completion.data.choices[0].text != undefined) {
            answer = completion.data.choices[0].text.replace(/^\s+/, "")
            return answer
        } else {
            return answer
        }
    } catch (err) {
        console.log(err)
        return "erorr"
    }
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
        .map(
            (task) =>
                `{name : ${task.name} ,description :"${task.description}", id : ${task.id}}`
        )
        .join(",\n  ")
    let promptMessage = `Commnad:
Guess the completed task from the updated content of the code.
Answer only in the following format:\n

[
    {"task_id" :string , "acheived" : boolean},
]

#################

update data:
{
    filename:"${component.filename}"
    commit comment:"${component.comment}"
    content "{
        ${component.contents}
    }"
},
###############

unacheived task array:

tasks[
    ${tasksString}
]
`
    return promptMessage
}
