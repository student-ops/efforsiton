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
        console.log("POST")
        var payload = req.body as ProjectMinimal
        payload.userName = username
        if (payload && payload.name && payload.description) {
            const ins = await InsertProject(payload)
            console.log(ins)
            res.status(200).json({ message: "Success" })
        } else {
            res.status(400).send("")
        }
        return
    }
    if (req.method === "GET") {
        await FetchMyProjects(username!)
            .then((myprojects) => {
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
