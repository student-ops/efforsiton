import type { NextApiRequest, NextApiResponse } from "next"
import { getCommitFiles } from "../../lib/gptapi"
import { webhookCommit } from "../../types/webhook"
import {
    InsertWebhookCommit,
    GetWebhookId,
    getUncheckedCommit,
} from "../../lib/webhook"
import { PromptComponent } from "../../types/gptapi"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const payload = req.body
    if (!payload) {
        res.status(200).end()
    }
    const parsedPayload = payload.payload
        ? JSON.parse(payload.payload)
        : payload

    const owner = parsedPayload.repository?.owner?.name
    const repo_name = parsedPayload.repository?.name
    const after_sha = parsedPayload.after

    const webhookid = await GetWebhookId(owner, repo_name)
    if (!webhookid) return res.status(401).end("webhook not found")
    const webhookcommit: webhookCommit = {
        timestamp: parsedPayload.head_commit?.timestamp,
        comment: parsedPayload.head_commit?.message,
        after_sha: after_sha,
        belongs: webhookid,
    }
    await res.status(200).end()
    const result = await InsertWebhookCommit(webhookcommit)
    let uncheckedCommit = await getUncheckedCommit(webhookid)
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
                        contents: file.contents,
                        comment: commit.comment,
                    }))
                )
                .catch((err) => {
                    console.log(err)
                    return []
                })
        )
    ).then((components) => components.flat())

    console.log(promptcomponent)

    return
}
