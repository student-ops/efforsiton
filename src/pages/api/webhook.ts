import type { NextApiRequest, NextApiResponse } from "next"
import { CreatePrompt, getCommitFiles, ReqestGpt } from "../../lib/gptapi"
import { webhookCommit, WebhookCommitMinimal } from "../../types/webhook"
import { InsertWebhookCommit, SelectWebhook } from "../../lib/webhook"
import { PromptComponent, TaskforPrompt } from "../../types/gptapi"
import { SelectUnachievedTask } from "../../lib/task"
import { Suggestion } from "../../types/suggestion"
import prisma from "../../lib/prisma"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const payload = req.body
    //github webhook push event からのリクエストを受け取り必要な値を取り出す
    if (!payload) {
        res.status(200).end()
    }
    const parsedPayload = payload.payload
        ? JSON.parse(payload.payload)
        : payload

    const owner = parsedPayload.repository?.owner?.name
    const repo_name = parsedPayload.repository?.name
    const after_sha = parsedPayload.after

    const targetwebhook = await SelectWebhook(owner, repo_name)
    // error handling
    if (!targetwebhook) {
        console.log("webhookid is null")
        return
    }
    const webhookcommit: webhookCommit = {
        timestamp: parsedPayload.head_commit?.timestamp,
        comment: parsedPayload.head_commit?.message,
        after_sha: after_sha,
        belongs: targetwebhook.id,
    }

    await res.status(200).end()
    const result = await InsertWebhookCommit(webhookcommit)
    if (!result) return console.log("insert webhookCommit result is null")
    let uncheckedCommit: WebhookCommitMinimal[] = []
    // 整理必要。現状pushされたコミットのみをセットしているが、データベースのuncheckedcommitをすべてチェックさせたい。
    uncheckedCommit.push({
        id: result.id,
        timestamp: webhookcommit.timestamp,
        after_sha: webhookcommit.after_sha,
        comment: webhookcommit.comment,
    })
    //　githubapiからコミット情報を使用して実際の更新内容を取得する
    const promptcomponent: PromptComponent[] = await Promise.all(
        uncheckedCommit.map((commit) =>
            getCommitFiles(owner, repo_name, commit.after_sha)
                .then((files) =>
                    files.map((file) => ({
                        timestamp: commit.timestamp,
                        filename: file.filename,
                        comment: commit.comment,
                        contents: file.contents,
                    }))
                )
                .catch((err) => {
                    console.log(err)
                    return []
                })
        )
    ).then((components) => components.flat())

    // 1500文字以上のコミットは除外、分割できるようにする
    const filteredPrompt = promptcomponent.filter(
        (component) => component.contents.length < 1500
    )
    const relatedtasks = await SelectUnachievedTask(targetwebhook.belongs)
    if (relatedtasks.length === 0) return console.log("relatedtasks is null")
    const tasksforprompt: TaskforPrompt[] = relatedtasks.map((task) => {
        return {
            id: task.id,
            name: task.name,
            description: task.description,
        }
    })
    const myPrompts: string[] = []
    filteredPrompt.map((prompt) => {
        myPrompts.push(CreatePrompt(prompt, tasksforprompt))
    })

    let answers: Suggestion[][] = []
    for (const prompt of myPrompts) {
        const answer = await requestWithRetry(prompt, targetwebhook.belongs)
        if (!answer || answer.length === 0) {
            console.log("can't get proper answer")
            return
        }
        answers?.push(answer)
    }
    console.log("answers######")
    console.log(answers)
    console.log("answers######")
    const mergedarray = mergeArrays(answers)
    mergedarray.map(async (answer) => {
        if (!answer.acheived) return
        await prisma.tasks.update({
            where: {
                id: answer.task_id,
            },
            data: {
                suggested: true,
            },
        })
    })
    return
}
export async function requestWithRetry(
    prompt: string,
    webhookUrl: string,
    retries = 3
): Promise<Suggestion[] | null> {
    let attempts = 0
    while (attempts < retries) {
        try {
            const response = await ReqestGpt(prompt, webhookUrl)
            const trimed = preprocessJson(response)
            const suggestion = JSON.parse(trimed as string) as Suggestion[] // Try parsing the response
            console.log("success")
            return suggestion
        } catch (error) {
            console.error(`Attempt ${attempts + 1} failed: ${error}`)
            attempts++
        }
    }
    console.log("Failed to fetch suggestion")
    return null
}
export function preprocessJson(text: string) {
    const jsonStartIndex = text.indexOf("[")
    const jsonEndIndex = text.lastIndexOf("]") + 1
    const jsonString = text.slice(jsonStartIndex, jsonEndIndex)

    const lines = jsonString.split("\n").map((line) => line.trim())
    let result = ""

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        if (
            i < lines.length - 1 &&
            lines[i + 1].trim() === "]" &&
            line.endsWith(",")
        ) {
            line = line.slice(0, -1)
        }
        result += line
    }

    return result
}

function mergeArrays(arrays: Suggestion[][]): Suggestion[] {
    if (!arrays || arrays.length === 0) return []
    const mergedArray: Suggestion[] = arrays[0].map((item) => ({
        ...item,
        achieved: false,
    }))

    for (const array of arrays) {
        for (let i = 0; i < array.length; i++) {
            mergedArray[i].acheived =
                mergedArray[i].acheived || array[i].acheived
        }
    }

    return mergedArray
}
