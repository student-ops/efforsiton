import type { NextApiRequest, NextApiResponse } from "next"
import { CreatePrompt, getCommitFiles } from "../../lib/gptapi"
import { webhookCommit } from "../../types/webhook"
import {
    InsertWebhookCommit,
    SelectWebhook,
    getUncheckedCommit,
} from "../../lib/webhook"
import { PromptComponent, TaskforPrompt } from "../../types/gptapi"
import { SelectUnachievedTask } from "../../lib/task"

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

    type webhookindentifier = {
        id: string
        belongs: string
    }
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
    let uncheckedCommit = await getUncheckedCommit(targetwebhook.id)
    uncheckedCommit.push({
        id: result.id,
        timestamp: webhookcommit.timestamp,
        after_sha: webhookcommit.after_sha,
        comment: webhookcommit.comment,
    })
    // const message = parsedPayload.head_commit?.message
    // const timestamp = parsedPayload.head_commit?.timestamp
    // Process each commit and fetch the associated files
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

    const filteredPrompt = promptcomponent.filter(
        (component) => component.contents.length > 1000
    )
    // console.log("#####################\n")
    // console.log(filteredPrompt)
    // console.log("#####################\n")
    const relatedtasks = await SelectUnachievedTask(targetwebhook.belongs)
    if (relatedtasks.length === 0) return console.log("relatedtasks is null")
    const tasksforprompt: TaskforPrompt[] = relatedtasks.map((task) => {
        return {
            name: task.name,
            description: task.description,
        }
    })
    const myPrompts: string[] = []
    filteredPrompt.map((prompt) => {
        myPrompts.push(CreatePrompt(prompt, tasksforprompt))
    })
    console.log(myPrompts[0])

    return
}
