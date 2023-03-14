import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { AcheiveTask } from "../../lib/task"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
    if (!session) {
        res.status(401).json({ error: "Unauthorized" })
        return
    }
    const taskid = req.query
    if (!taskid.taskid) {
        res.status(400).send("task id is null\n")
    }
    await AcheiveTask(taskid.taskid! as string)
        .then(() => {
            res.status(200).send("accepted")
        })
        .catch((err) => {
            res.status(400).send(err)
        })
    return
}
