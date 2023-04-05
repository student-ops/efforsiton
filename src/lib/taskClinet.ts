export async function AchieveTaskFromApi(taskIds: string[]) {
    try {
        const response = await fetch("/api/acheiveTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskIds }),
        })

        if (!response.ok) {
            throw new Error("Failed to achieve tasks")
        }
        return await response.json()
    } catch (error) {
        console.error("Failed to achieve tasks:", error)
        throw error
    }
}

export async function DeleteSuggestion(taskIds: string[]) {
    try {
        const response = await fetch("/api/suggestion", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskIds }),
        })

        if (!response.ok) {
            throw new Error("Failed to delete suggestion")
        }
        return await response.json()
    } catch (error) {
        console.error("Failed to delete suggestion:", error)
        throw error
    }
}
