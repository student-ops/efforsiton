import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { AchieveTask } from "../../lib/task"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
    if (!session) {
        res.status(401).json({ error: "Unauthorized" })
        return
    }
    const taskIds: string[] = req.body.taskIds
    console.log(taskIds)
    if (!taskIds) {
        res.status(400).send("Task IDs are null\n")
    }
    await AchieveTask(taskIds)
        .then(() => {
            res.status(200).send("accepted")
        })
        .catch((err: Error) => {
            res.status(400).send(err)
        })
    return
}
