import type { NextApiRequest, NextApiResponse } from "next"
import {
    InsertProject,
    ProjectMinimal,
    FetchMyProjects,
} from "../../lib/project"
import { getSession } from "next-auth/react"
import { Project } from "../../types/project"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })
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
                res.status(200).send("")
            })
        } else {
            res.status(400).send("")
        }
    }
    if (req.method === "GET") {
        await FetchMyProjects(username!)
            .then((myprojects) => {
                console.log("return value:" + myprojects)
                res.status(200).json({ myprojects })
                return
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ error: "Internal Server Error" })
                return
            })
    }
}
