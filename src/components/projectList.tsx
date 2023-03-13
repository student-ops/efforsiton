import Link from "next/link"
import { FC } from "react"
import { Project } from "../types/project"
import ProjectComponent from "./projectCard"
interface Props {
    projects: Project[]
}

const ProjectList: FC<Props> = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return (
            <Link href="/create" className="text-blue-400">
                you don't have any projects click here to create one
            </Link>
        )
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold p-4">Your Projects</h1>
            {projects?.map((project: Project) => (
                <ProjectComponent key={project.id} project={project} />
            ))}
        </div>
    )
}

export default ProjectList
