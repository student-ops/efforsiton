import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const payload = req.body?.payload
    console.log(payload)

    if (payload) {
        const parsedPayload = JSON.parse(payload)
        const id = parsedPayload.repository?.id
        console.log(id)
        console.log("###########################")
        console.log(parsedPayload)
    }

    await res.status(200).end()
}
