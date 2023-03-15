import { NextApiHandler } from "next"
import { getSession } from "next-auth/react"
import { FetchMyProjects } from "../../lib/project"

const protectedApiRoute: NextApiHandler = async (req, res) => {
    // console.log(req.headers)
    const session = await getSession({ req })

    if (!session) {
        res.status(401).json({ error: "Unauthorized" })
        return
    }

    try {
        const username = session.user.name
        const myprjects = await FetchMyProjects(username!)
        // let a = JSON.stringify(myprjects)
        // console.log(a)
        // console.log(myprjects)

        res.status(200).json({ myprjects })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export default protectedApiRoute
