import type { NextApiRequest, NextApiResponse } from "next"
import { getCommitFiles } from "../../lib/gptapi"
import { webhookCommit } from "../../types/webhook"
import { InsertWebhookCommit, GetWebhookId } from "../../lib/webhook"

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
        after_sha: after_sha,
        belongs: webhookid,
    }
    InsertWebhookCommit(webhookcommit)
    // const message = parsedPayload.head_commit?.message
    // const timestamp = parsedPayload.head_commit?.timestamp
    const files = await getCommitFiles(owner, repo_name, after_sha)
        .then((files) => files)
        .catch((err) => console.log(err))

    await res.status(200).end()
    console.log(files)
    return
}
