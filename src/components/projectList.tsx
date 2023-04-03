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
            <Link href="/projects" className="text text-lg">
                you don&apos;t have any projects click
                <span className="text-blue-400"> here</span> or create at header
            </Link>
        )
    }

    return (
        <div className="w-full h-full flex flex-col ">
            <h1 className="text-xl font-bold p-4">Your Projects</h1>
            <div className="scroll-container">
                {projects?.map((project: Project) => (
                    <ProjectComponent key={project.id} project={project} />
                ))}
            </div>
            <style jsx>{`
                .scroll-container {
                    max-height: calc(
                        100vh - 5rem
                    ); /* Adjust this value based on the height of the h1 and other elements */
                    overflow-y: auto;
                    width: 100%;
                }
            `}</style>
        </div>
    )
}

export default ProjectList
