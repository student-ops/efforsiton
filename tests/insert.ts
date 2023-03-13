import { now } from "next-auth/client/_utils"
import prisma from "../src/lib/prisma"

interface Project {
    userId: string
    name: string
    description: string
}

async function fectchUserId(userName: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                name: userName,
            },
            select: {
                id: true,
            },
        })
        return user
    } catch (err) {
        console.log(err)
        return null
    }
}

async function InserProject(project: Project) {
    const err = await prisma.projects.create({
        data: {
            name: project.name,
            description: project.description,
            userId: project.userId,
        },
    })
    console.log(err)
}

export async function main() {
    const userid = await fectchUserId("i7r8o7n4")
    if (userid) {
        let user = JSON.parse(JSON.stringify(userid))
        console.log(user.id)
        // const project: Project = {
        //     name: "my first project",
        //     description: "myfirst fundemental app",
        //     userId: user.id,
        // }
        // let err = await InserProject(project)
        // console.log(err)
        return
    }
}

main()
