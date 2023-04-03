import { useState, useEffect } from "react"
import ProjectList from "../components/projectList"
import { CustomNextPage } from "../types/custom-next-page"
import ProjectInputField from "../components/projectInputfield"
import { Project } from "../types/project"

export const FetchProjectFromApi = async () => {
    const array = await fetch("/efforsition/api/myprojects", {
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
        <div className="flex items-center flex-col w-full h-screen relative">
            <div className="w-full lg:w-2/5 h-3/5">
                <ProjectList projects={myProjects} />
            </div>
            <div className="flex justify-center w-full lg:w-2/5 h-1/5 mt-10">
                <div className="h-96 w-full">
                    <ProjectInputField promise={setproject} />
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
ProjectPage.requireAuth = true
