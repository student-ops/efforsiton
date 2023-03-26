export {}

export async function FetchGithubUser(user_image: string) {
    try {
        const regex = /\/u\/(\d+)\?/
        const match = regex.exec(user_image!)
        let accountid: string = ""

        if (match) {
            accountid = match[1]
        }
        if (!accountid) return
        const response = await fetch(`https://api.github.com/user/${accountid}`)
        const data = await response.json()
        console.log(data.login)
        // return data.login
    } catch (error) {
        console.error(error)
    }
}

//avatars.githubusercontent.com/u/?v=4
FetchGithubUser(
    "index.tsx?19a0:39 https://avatars.githubusercontent.com/u/106237293?v=4"
)
