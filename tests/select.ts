import prisma from "../src/lib/prisma"

export const FetchProjectFromId = async (id: string) => {
    const project = await prisma.projects.findUnique({
        where: {
            id: id,
        },
    })
    return project
}

async function main() {
    let projects = await FetchProjectFromId("cleygev770009ummsg78n853h")
    console.log(projects)
}

main()
