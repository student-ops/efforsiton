import { Project } from "../types/project"
export const FetchProjectFromApi = async () => {
    const res = await fetch("/api/project", {
        method: "GET",
    })
    const projects = await res.json()

    if (!res.ok) {
        console.log(`Failed to fetch projects: ${res.statusText}`)
    }

    const projectArray: Project[] = projects.myprojects
    return projectArray
}
