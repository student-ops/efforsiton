import { NextApiHandler } from "next"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
    CreateWebhookByGithubapi,
    FetchGithubUser,
    InsertWebhook,
    DeleteLinkedRepo,
    deleteWebhookFromGithubRepo,
} from "../../lib/webhook"
import prisma from "../../lib/prisma"
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

        const gihubresult = await CreateWebhookByGithubapi(
            session,
            repo_name,
            owner
        )
        if (!gihubresult) {
            res.status(401).send("can't create webhook\n")
            return
        }
        const tmpwebhook = {
            id: gihubresult.id,
            repo_name: repo_name,
            owner: owner,
            belongs: projectid,
        }
        const result = await InsertWebhook(tmpwebhook)
        if (!result) {
            res.status(401).send("can't create webhook\n")
            return
        }
        return res.status(200).send("ok")
    }
    if (req.method === "DELETE") {
        if (!projectid) {
            res.status(400).send("project id or repo is null\n")
            return
        }
        // github apiも追加する
        const project = await prisma.projects.update({
            where: {
                id: projectid,
            },
            data: {
                linked: null,
            },
        })
        console.log(project)
        const fetched = await prisma.webhook.findUnique({
            where: {
                belongs: projectid,
            },
        })
        if (!fetched) {
            res.status(400).send("can't find webhook")
            console.log("can't find webhook")
            return
        }
        const resu = await DeleteLinkedRepo(projectid)
        await deleteWebhookFromGithubRepo(
            session.user.accessToken!,
            fetched?.owner,
            fetched?.repo_name,
            fetched?.id
        )
        if (!resu) {
            res.status(200).send("resu == null")
        }
    }

    // queryparams
    // api/linkRepo?projectid={id}&repo={repo}

    // console.log(projectid.projectid)
    // console.log(projectid.linkTo)

    // 他者からのリクエストを受け付けないようにする
    // const username = session.user.name!
}
