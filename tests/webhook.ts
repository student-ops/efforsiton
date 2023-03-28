import prisma from "../src/lib/prisma"
export const SelectWebhookId = async (owner: string, repo_name: string) => {
    const result = await prisma.webhook.findFirst({
        where: {
            owner: owner,
            repo_name: repo_name,
        },
    })
    if (!result) return null
    const tmp: object = { id: result.id, belongs: result.belongs }
    return tmp
}
export {}
async function main() {
    // const webhook = await SelectWebhookId("student-ops", "efforsiton")
    console.log("hell")
}

main()
