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
        console.log(id)
        console.log("###########################")
        console.log(parsedPayload)
    }

    await res.status(200).end()
}
