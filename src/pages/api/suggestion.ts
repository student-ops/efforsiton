import { Task } from "../../types/project"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import prisma from "../../lib/prisma"

const DeleteSuggestion = async (taskIds: string[]) => {
    await prisma.tasks.updateMany({
        where: {
            id: {
                in: taskIds,
            },
        },
        data: {
            suggested: false,
        },
    })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })
    if (!session) {
        res.status(401).json({ error: "Unauthorized" })
        return
    }
    const taskIds: string[] = req.body.taskIds
    if (!taskIds) {
        res.status(400).send("Task IDs are null\n")
    }

    console.log(taskIds)
    await DeleteSuggestion(taskIds)
        .then(() => {
            res.status(200).send(true)
        })
        .catch((err: Error) => {
            console.log(err)
            res.status(400).send(err)
        })
    return
}
