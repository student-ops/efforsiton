import { serialize } from "v8"
import { Webhook } from "../types/webhook"
import prisma from "./prisma"

export interface Project {
    id: string
    name: string
    description: string | null
    createdAt: string
    userId: string
}

export interface ProjectMinimal {
    userName: string
    name: string
    description: string | null
}

async function fectchUserId(userName: string) {
    try {
        const user = await prisma.user.findUnique({
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

export async function InsertProject(minim: ProjectMinimal) {
    const userid = await fectchUserId(minim.userName)
    let id = JSON.parse(JSON.stringify(userid))
    await prisma.projects.create({
        data: {
            userId: id.id,
            name: minim.name,
            //if description is null, set it to null
            description: minim.description ?? null,
        },
    })
    return
}

export async function DeleteProject(id: string) {
    const project = await prisma.projects.delete({
        where: {
            id: id,
        },
    })
    return
}

export async function FetchMyProjects(username: string) {
    const userid = await fectchUserId(username)
    const projects = await prisma.projects.findMany({
        where: {
            userId: userid?.id,
        },
    })

    const serializedProjects = projects.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description !== null ? project.description : null,
        createdAt: project.createdAt.toISOString(),
        userId: project.userId,
    }))
    // console.log(serializedProjects)
    return serializedProjects
}

export const FetchProjectsFromDtabase = async () => {
    const array = await fetch("/api/myprojects", {
        method: "POST",
    })
        .then((res) => res.json())
        .then((projects) => {
            const projectArray = projects.myprjects
            return projectArray
        })
        .catch((err) => {
            // must Implement error handling
        })
    return array
}

export const FetchProjectFromId = async (id: string) => {
    const project = await prisma.projects.findUnique({
        where: {
            id: id,
        },
    })
    const serializedproject = JSON.parse(JSON.stringify(project))
    return serializedproject
}
