import prisma from "../src/lib/prisma"

async function main() {
    const userid = await prisma.user
        .findUnique({
            where: {
                name: "ryuta tosa",
            },
        })
        .then((res) => {
            console.log(res)
            return res
        })
    console.log(userid?.image)
    const regex = /\/u\/(\d+)\?/
    const match = regex.exec(userid?.image!)

    if (match) {
        const userId = match[1]
        console.log(userId) // 106237293
    }
}

main()
