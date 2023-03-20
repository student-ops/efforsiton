import { useState, useEffect } from "react"
import ProjectList from "../components/projectList"
import { CustomNextPage } from "../types/custom-next-page"
import ProjectInputField from "../components/projectInputfield"
import { Project } from "../types/project"

export const FetchProjectFromApi = async () => {
    const array = await fetch("/api/myprojects", {
        method: "GET",
    })
        .then((res) => res.json())
        .then((projects) => {
            const projectArray = projects.myprjects
            return projectArray
        })
        .catch((err) => {
            // must Implement error handling
            return null
        })
    return array
}

const ProjectPage: CustomNextPage = () => {
    const [myProjects, setMyProjects] = useState<Project[]>([])
    const setproject = async () => {
        const projects = await FetchProjectFromApi()
        setMyProjects(projects!)
    }

    useEffect(() => {
        setproject()
    }, [])

    return (
        <>
            <div className="flex">
                <div className="w-2/3">
                    <ProjectList projects={myProjects} />
                </div>
            </div>
            <div className="flex justify-center  mt-4 w-2/3">
                <ProjectInputField promise={setproject} />
            </div>
        </>
    )
}

export default ProjectPage
ProjectPage.requireAuth = true
