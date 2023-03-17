import type { NextApiRequest, NextApiResponse } from "next"
import { getCommitFiles } from "../../lib/gptapi"

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
    const after_sha = parsedPayload.after
    const message = parsedPayload.head_commit?.message
    const timestamp = parsedPayload.head_commit?.timestamp
    const owner = parsedPayload.repository?.owner?.name
    const repo_name = parsedPayload.repository?.name
    const files = await getCommitFiles(owner, repo_name, after_sha)
        .then((files) => files)
        .catch((err) => console.log(err))

    await res.status(200).end()
    console.log(files)
    return
}
