import { TaskForInsert } from "../src/types/project"
import prisma from "../src/lib/prisma"
import { FetchTasks } from "../src/lib/task"
export async function InsertTask(task: TaskForInsert) {
    await prisma.tasks.create({
        data: {
            parentId: task.parentId ?? null,
            belongsTo: task.belongsTo,
            name: task.name,
            description: task.description ?? null,
        },
    })
    return
}

const mytask = {
    belongsTo: "clf04s8070001umt6j0mewp4x",
    name: " add task viwer",
    description: "add task viwer to the project page",
    parentId: null,
}

FetchTasks(mytask.belongsTo).then((tasks) => {
    tasks.map((task) => console.log(task))
})
