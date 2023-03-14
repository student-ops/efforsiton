import { NextApiHandler } from "next"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { AddLinkedRepo } from "../../lib/project"
import { url } from "inspector"

const urltmp = "https://4139-133-106-216-213.jp.ngrok.io"

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
    const repo = req.query.linkTo as string
    console.log(projectid, repo)
    if (!projectid || !repo) {
        res.status(400).send("project id or repo is null\n")
        return
    }

    const resu = await AddLinkedRepo(projectid, repo)
    if (!resu) {
        res.status(200).send("resu == null")
    } else {
        res.status(200).send("ok")
    }
    /////////////////////////////////////
    const regex = /\/([^/]+)$/i
    const match = repo.match(regex)
    const extracted = match ? match[1] : ""
    console.log("ext: " + extracted)
    const headers = {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${session.user.accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
    }
    const data = {
        name: "efforsition hook",
        active: true,
        events: ["push", "pull_request"],
        config: {
            url: urltmp,
            content_type: "json",
            insecure_ssl: "0",
        },
    }

    const url = `https://api.github.com/repos/${session.user.name}/${extracted}/hooks`
    async function createWebhook() {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            })
            const json = await response.json()
            console.log(json)
        } catch (error) {
            console.error(error)
        }
    }
    const result = await createWebhook()
    console.log("##########################")
    console.log(result)

    // queryparams
    // api/linkRepo?projectid={id}&repo={repo}

    // console.log(projectid.projectid)
    // console.log(projectid.linkTo)

    // 他者からのリクエストを受け付けないようにする
    // const username = session.user.name!
}
