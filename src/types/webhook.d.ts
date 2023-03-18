export interface Webhook {
    repo_name: string
    owner: string
    belongs: string
}

export interface webhookCommit {
    timestamp: string
    after_sha: string
    belongs: string
}

export interface WebhookCommitMinimal {
    id: string
    timestamp: string
    after_sha: string
}
