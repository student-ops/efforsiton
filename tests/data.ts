import prisma from "../src/lib/prisma"

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
export {}

AcheiveTask("clf1qwjn10001um0exewft1of")
