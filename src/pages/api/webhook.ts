import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const payload = await req.body
    const parsedPayload = JSON.parse(payload.payload)
    const id = parsedPayload.repository.id
    console.log(id)
    await res.status(200).end()
}
