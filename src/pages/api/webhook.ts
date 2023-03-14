import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    const payload = await req.body
    const parsedPayload = JSON.parse(payload)
    const id = parsedPayload.repository.id
    console.log(id)
    console.log("###########################")
    console.log(parsedPayload)
    await res.status(200).end()
}
