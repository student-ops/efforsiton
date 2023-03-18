export interface PromptComponent {
    timestamp: string
    comment: string
    filename: string
    contents: sting
}

export interface TaskforPrompt {
    id: string
    name: string
    description: string | null
}
