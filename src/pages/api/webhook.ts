import type { NextApiRequest, NextApiResponse } from "next"
import { CreatePrompt, getCommitFiles, ReqestGpt } from "../../lib/gptapi"
import { webhookCommit, WebhookCommitMinimal } from "../../types/webhook"
import { InsertWebhookCommit, SelectWebhook } from "../../lib/webhook"
import { PromptComponent, TaskforPrompt } from "../../types/gptapi"
import { SelectUnachievedTask } from "../../lib/task"
import { Suggestion } from "../../types/suggestion"

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
    // false で絞っているが、切り替えが必要
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
    console.log("########################")
    console.log(promptcomponent)
    console.log("########################")

    const filteredPrompt = promptcomponent.filter(
        (component) => component.contents.length > 1000
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
    // let answers: string[] = []
    // for (const prompt of myPrompts) {
    //     const answer = await ReqestGpt(prompt, targetwebhook.belongs)
    //     answers.push(answer)
    //     console.log(answer)

    const answers = await Promise.all(
        myPrompts.map(async (prompt) => {
            const answer = await requestWithRetry(prompt, targetwebhook.belongs)
            if (!answer) {
                console.log("can't get propper answer")
                return
            }
        })
    )
    console.log(answers)
    return
}
export async function requestWithRetry(
    prompt: string,
    webhookUrl: string,
    retries = 3
): Promise<Suggestion> {
    let attempts = 0
    while (attempts < retries) {
        try {
            const response = await ReqestGpt(prompt, webhookUrl)
            const suggestion = JSON.parse(response as string) as Suggestion // Try parsing the response
            console.log("success")
            return suggestion
        } catch (error) {
            console.error(`Attempt ${attempts + 1} failed: ${error}`)
            attempts++
        }
    }
    throw new Error("Failed to fetch suggestion")
}
