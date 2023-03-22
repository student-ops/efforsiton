import prisma from "./prisma"
import { TaskForInsert } from "../types/project"

export async function SelectTasks(projectId: string) {
    const tasks = await prisma.tasks.findMany({
        where: {
            belongs: projectId,
        },
    })
    return tasks
}

export async function SelectUnachievedTask(projectId: string) {
    const tasks = await prisma.tasks.findMany({
        where: {
            belongs: projectId,
            suggested: false,
            acheived: false,
        },
    })
    return tasks
}

export async function InsertTask(task: TaskForInsert) {
    const res = await prisma.tasks.create({
        data: {
            parentId: task.parentId ?? null,
            belongs: task.belongsTo,
            name: task.name,
            description: task.description ?? null,
            acheivedAt: null,
        },
    })
    return res
}

export async function AcheiveTask(taskid: string) {
    const task = await prisma.tasks.findUnique({
        where: {
            id: taskid,
        },
    })

    if (task?.acheived) {
        console.log("already acheived")
        return // already achieved, no need to update
    }

    await prisma.tasks.update({
        where: {
            id: taskid,
        },
        data: {
            acheived: true,
            acheivedAt: new Date(),
        },
    })
}
