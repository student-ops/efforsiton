import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const payload = req.body

    if (payload) {
        const parsedPayload = payload.payload
            ? JSON.parse(payload.payload)
            : payload
        const id = parsedPayload.repository?.id
        const after_sha = parsedPayload.after
        const owner = parsedPayload.repository?.owner?.name
        const repo_name = parsedPayload.repository?.name
        console.log("id: ", id)
        console.log("after_sha: ", after_sha)
        console.log("owner: ", owner)
        console.log("repo_name: ", repo_name)
        console.log("###########################")
        console.log(parsedPayload)
        console.log("###########################")
    }

    await res.status(200).end()
}
