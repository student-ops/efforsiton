import { NextApiHandler } from "next"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { AddLinkedRepo, DeleteLinkedRepo } from "../../lib/project"
import { Session } from "next-auth"
import prisma from "../../lib/prisma"

const urltmp = " https://0e4e-133-106-216-213.jp.ngrok.io/api/webhook"

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
    console.log(projectid)
    if (req.method === "POST") {
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
        const regex = /\/([^/]+)$/i
        const match = repo.match(regex)
        const extracted = match ? match[1] : ""

        const result = await createWebhook(session, extracted)
        console.log(result)
    }
    if (req.method === "DELETE") {
        console.log("delete")
        if (!projectid) {
            res.status(400).send("project id or repo is null\n")
            return
        }
        // github apiも追加する
        const resu = await DeleteLinkedRepo(projectid)
        if (!resu) {
            res.status(200).send("resu == null")
        } else {
            console.log("ok")
            res.status(200).send("ok")
        }
    }

    // queryparams
    // api/linkRepo?projectid={id}&repo={repo}

    // console.log(projectid.projectid)
    // console.log(projectid.linkTo)

    // 他者からのリクエストを受け付けないようにする
    // const username = session.user.name!
}

async function fetchGithubUser(userid: string) {
    const response = await fetch(`https://api.github.com/user/${userid}`)
    const data = await response.json()
    return data.login
}
async function createWebhook(session: Session, extracted: string) {
    const fetched = await prisma.user
        .findUnique({
            where: {
                name: session.user.name!,
            },
        })
        .then((res) => {
            console.log(res)
            return res
        })
    console.log(fetched?.image)
    const regex = /\/u\/(\d+)\?/
    const match = regex.exec(fetched?.image!)
    let accountid: string = ""

    if (match) {
        accountid = match[1]
    }
    if (!accountid) return
    const userName = await fetchGithubUser(accountid)
    const url = `https://api.github.com/repos/${userName}/${extracted}/hooks`
    const data = {
        name: "web",
        active: true,
        events: ["push"],
        config: {
            url: urltmp,
            content_type: "json",
            insecure_ssl: "0",
        },
    }
    const headers = {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${session.user.accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        })
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
}
