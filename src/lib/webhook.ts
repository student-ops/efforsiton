import { WebhookCommit } from "@prisma/client"
import { Session } from "next-auth"
import { Webhook, webhookCommit, WebhookCommitMinimal } from "../types/webhook"
import prisma from "./prisma"

const urltmp = "https://fcc3-133-106-51-131.jp.ngrok.io"

export async function FetchGithubUser(session_username: string) {
    const fetched = await prisma.user
        .findUnique({
            where: {
                name: session_username,
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
    const response = await fetch(`https://api.github.com/user/${accountid}`)
    const data = await response.json()
    return data.login
}
export async function CreateWebhookByApi(
    session: Session,
    repo_name: string,
    owner: string
) {
    const url = `https://api.github.com/repos/${owner}/${repo_name}/hooks`
    const data = {
        name: "web",
        active: true,
        events: ["push"],
        config: {
            url: urltmp + "/api/webhook",
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

export const InsertWebhook = async (webhook: Webhook) => {
    let result = await prisma.webhook.create({
        data: {
            repo_name: webhook.repo_name,
            owner: webhook.owner,
            belongs: webhook.belongs,
        },
    })
    if (!result) console.log("insert webhook result is null")
    let res = await prisma.projects.update({
        where: {
            id: webhook.belongs,
        },
        data: {
            linked: webhook.repo_name,
        },
    })
    if (!res) console.log("can't update project ")
    return result
}

// export const DeleteLinkedRepo = async (projectid: string) => {
//     const result = await prisma.webhook.delete({
//     return result
// }

export const InsertWebhookCommit = async (pushed: webhookCommit) => {
    const result = await prisma.webhookCommit.create({
        data: {
            timestamp: pushed.timestamp,
            after_sha: pushed.after_sha,
            belongs: pushed.belongs,
        },
    })
    return result
}

export const GetWebhookId = async (owner: string, repo_name: string) => {
    const result = await prisma.webhook.findFirst({
        where: {
            owner: owner,
            repo_name: repo_name,
        },
    })
    return result?.id
}

export const getUncheckedCommit = async (webhookid: string) => {
    const result = await prisma.webhookCommit.findMany({
        where: {
            belongs: webhookid,
            checked: false,
        },
    })
    const uncheckedcontent: WebhookCommitMinimal[] = result.map((commit) => {
        return {
            id: commit.id,
            timestamp: commit.timestamp,
            after_sha: commit.after_sha,
        }
    })
    return uncheckedcontent
}
