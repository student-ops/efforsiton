export type Project = {
    id: string
    name: string
    description: string | null
    createdAt: string
    userId: string
}

export interface Task {
    id: string
    belongsTo: string
    name: string
    description: string | null
    userId: string
    createdAt: Date
    acheived: boolean
    belongsTo: string
    parentId: string | null
}

export interface TaskForInsert {
    belongsTo: string
    parentId: string | null
    name: string
    description: string | null
}

export interface TaskforFrontend {
    id: string
    belongsTo: string
    name: string
    description: string | null
    userId: string
    createdAt: Date
    acheived: boolean
    belongsTo: string
    parentId: string | null
    selectted: boolean
}
