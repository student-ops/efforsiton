import fetch from "node-fetch"
import dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()

const owner = "student-ops"
const repo = "efforsiton"
const url = `https://api.github.com/repos/${owner}/${repo}/hooks`
// const token = process.env.GITHUB_AUTH_TOKEN

// console.log(token)
const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
}

const data = {
    name: "web",
    active: true,
    events: ["push", "pull_request"],
    config: {
        url: "https://example.com/api/webhook",
        content_type: "json",
        insecure_ssl: "0",
    },
}

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

createWebhook()
