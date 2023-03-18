export interface PromptComponent {
    timestamp: string
    comment: string
    filename: string
    contents: sting
}

export interface TaskforPrompt {
    name: string
    description: string | null
}
