import { Session } from "next-auth"
import { Webhook, webhookCommit, WebhookCommitMinimal } from "../types/webhook"
import prisma from "./prisma"
import dotenv from "dotenv"

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
        return data.login as string
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function CreateWebhookByGithubapi(
    session: Session,
    repo_name: string,
    owner: string
) {
    dotenv.config()
    const urltmp = process.env.WEBHOOK_URL
    console.log(urltmp)
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
        console.log(json)
        return json
    } catch (error) {
        console.error(error)
    }
}

export async function deleteWebhookFromGithubRepo(
    accessToken: string,
    owner: string,
    repo_name: string,
    hookId: string
): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repo_name}/hooks/${hookId}`

    const headers = {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
    }

    fetch(url, {
        method: "DELETE",
        headers,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Failed to delete webhook: ${response.statusText}`
                )
            }
        })
        .catch((error) => {
            console.error(error)
            throw new Error("Failed to delete webhook")
        })
}

export async function InsertWebhook(webhook: Webhook) {
    try {
        let result = await prisma.webhook.create({
            data: {
                id: webhook.id,
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
    } catch (error) {
        console.error(error)
    }
}

export async function DeleteLinkedRepo(projectid: string) {
    const result = await prisma.webhook.delete({
        where: {
            belongs: projectid,
        },
    })
    return result
}

export async function InsertWebhookCommit(pushed: webhookCommit) {
    try {
        const result = await prisma.webhookCommit.create({
            data: {
                timestamp: pushed.timestamp,
                after_sha: pushed.after_sha,
                belongs: pushed.belongs,
                comment: pushed.comment,
            },
        })
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function SelectWebhook(owner: string, repo_name: string) {
    try {
        const result = await prisma.webhook.findFirst({
            where: {
                owner: owner,
                repo_name: repo_name,
            },
        })

        if (!result) return null

        const tmp = {
            id: result.id,
            belongs: result.belongs,
        }

        return tmp
    } catch (error) {
        console.error(error)
    }
}

export async function getUncheckedCommit(webhookid: string) {
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
            comment: commit.comment,
        }
    })
    return uncheckedcontent
}
