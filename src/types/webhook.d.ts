export interface Webhook {
    id: string
    repo_name: string
    owner: string
    belongs: string
}

export interface webhookCommit {
    timestamp: string
    after_sha: string
    belongs: string
    comment: string
}

export interface WebhookCommitMinimal {
    id: string
    timestamp: string
    comment: string
    after_sha: string
}
