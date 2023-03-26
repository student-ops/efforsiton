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

export async function AchieveTask(taskIds: string | string[]) {
    // Ensure taskIds is an array
    const taskIdsArray = Array.isArray(taskIds) ? taskIds : [taskIds]

    // Find tasks by taskIds
    const tasks = await prisma.tasks.findMany({
        where: {
            id: {
                in: taskIdsArray,
            },
        },
    })

    // Filter out tasks that are already achieved
    const tasksToUpdate = tasks.filter((task) => !task.acheived)

    // Update each task
    const updateTasksPromises = tasksToUpdate.map((task) =>
        prisma.tasks.update({
            where: {
                id: task.id,
            },
            data: {
                acheived: true,
                acheivedAt: new Date(),
            },
        })
    )

    await Promise.all(updateTasksPromises)
}
