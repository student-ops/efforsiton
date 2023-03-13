import type { NextApiRequest, NextApiResponse } from "next"
import { InsertProject, ProjectMinimal } from "../../lib/project"
import { getSession } from "next-auth/react"
import { Project } from "../../types/project"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })
    // not neccesary
    if (!session) {
        res.status(401).json({ error: "Unauthorized" })
        return
    }
    const username = session.user.name!

    if (req.method === "POST") {
        var payload = req.body as ProjectMinimal
        payload.userName = username
        if (payload !== null && payload !== undefined) {
            await InsertProject(payload).then(() => {
                console.log(payload)
                res.status(200).send("")
            })
        } else {
            console.log("api error")
            res.status(400).send("")
        }
    }
}
