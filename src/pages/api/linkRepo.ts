import { NextApiHandler } from "next"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
    CreateWebhookByApi,
    FetchGithubUser,
    InsertWebhook,
} from "../../lib/webhook"
import { Webhook } from "../../types/webhook"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })
    if (!session) {
        res.status(401).json({ error: "Unauthorized" })
        return
    }
    const projectid = req.query.projectid as string
    if (req.method === "POST") {
        const repo = req.query.linkTo as string
        if (!projectid || !repo) {
            res.status(400).send("project id or repo is null\n")
            return
        }
        const regex = /\/([^/]+)$/i
        const match = repo.match(regex)
        const repo_name = match ? match[1] : ""
        const owner = await FetchGithubUser(session.user.name!)
        if (!owner) {
            res.status(401).send("can't fetch owner\n")
            return
        }
        let result = await CreateWebhookByApi(session, repo_name, owner)
        if (!result) {
            res.status(401).send("can't create webhook\n")
            return
        }
        const tmpwebhook = {
            repo_name: repo_name,
            owner: owner,
            belongs: projectid,
        }
        result = await InsertWebhook(tmpwebhook)
        return res.status(200).send("ok")
    }
    // if (req.method === "DELETE") {
    //     console.log("delete")
    //     if (!projectid) {
    //         res.status(400).send("project id or repo is null\n")
    //         return
    //     }
    //     // github apiも追加する
    //     const resu = await DeleteLinkedRepo(projectid)
    //     if (!resu) {
    //         res.status(200).send("resu == null")
    //     } else {
    //         console.log("ok")
    //         res.status(200).send("ok")
    //     }
    // }

    // queryparams
    // api/linkRepo?projectid={id}&repo={repo}

    // console.log(projectid.projectid)
    // console.log(projectid.linkTo)

    // 他者からのリクエストを受け付けないようにする
    // const username = session.user.name!
}
