import type { NextApiRequest, NextApiResponse } from "next"
import { requestToBodyStream } from "next/dist/server/body-streams"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        // Do something with the form data here, for example:

        console.log(req.body.test)
        res.status(200).json({ message: "Form data received!" })
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}
