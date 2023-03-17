import prisma from "../src/lib/prisma"
export async function FetchGithubUser(session_username: string) {
    const fetched = await prisma.user
        .findUnique({
            where: {
                name: session_username,
            },
        })
        .then((res) => {
            return res
        })
    const regex = /\/u\/(\d+)\?/
    const match = regex.exec(fetched?.image!)
    let userid: string = ""
    if (match) {
        userid = match[1]
    }
    if (!userid) return
    const response = await fetch(`https://api.github.com/user/${userid}`)
    const data = await response.json()
    return data.login
}

async function main() {
    await FetchGithubUser("ryuta tosa").then((res) => {
        console.log(res)
        return null
    })
}

main()
