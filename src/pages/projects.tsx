import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import ProjectList from "../components/projectList"
import { CustomNextPage } from "../types/custom-next-page"
import ProjectInputField from "../components/projectInputfield"
import { Project } from "../types/project"
import { Task } from "../types/project"
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

                {/* <svg
                    width="40"
                    height="40"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-indigo-500">
                    <circle
                        cx="12"
                        cy="12"
                        r="11"
                        className="fill-indigo-500"
                    />
                    <path d="M17 12H7" className="text-white" />
                    <path d="M12 17v-6" className="text-white" />
                    <path d="M12 7v6" className="text-white" />
                </svg> */}
            </div>
            <div className="flex justify-center  mt-4 w-2/3">
                <ProjectInputField promise={setproject} />
            </div>
        </>
    )
}

export default ProjectPage
ProjectPage.requireAuth = true
