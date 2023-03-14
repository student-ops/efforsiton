import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { InsertTask, FetchTasks } from "../../lib/task"
import { TaskForInsert, Task } from "../../types/project"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })
    if (!session) {
        res.status(401).json({ error: "Unauthorized" })
        return
    }
    if (req.method === "POST") {
        var payload = req.body as TaskForInsert
        if (payload !== null && payload !== undefined) {
            await InsertTask(payload).then((ret) => {
                console.log(ret)
                if (!ret) {
                    console.log("api error")
                    res.status(400).send("")
                } else {
                    const resp = {
                        id: ret.id,
                    }
                    res.status(200).json(resp)
                }
            })
        } else {
            console.log("api error")
            res.status(400).send("")
        }
        return
    }
    if (req.method === "GET") {
        const projectid = req.query
        if (!projectid.projectid) {
            res.status(400).send("project id is null\n")
            return
        }
        if (req.method === "GET") {
            var tasks = await FetchTasks(projectid.projectid! as string)
            res.status(200).json({ tasks })
        }
        return
    }
}
