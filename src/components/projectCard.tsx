import { Project } from "../types/project"
import { FC } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
interface Props {
    project: Project
}

const ProjectComponent: FC<Props> = ({ project }) => {
    return (
        <div className="w-full ">
            <Link href={`project/${project.id}`} passHref>
                <div
                    className="w-full block p-6 bg-white border border-gray-200 rounded-lg shadow
          hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
          mx-auto">
                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>{project.name}</p>
                    </h5>
                    {project.description === null ||
                    project.description === "" ? (
                        <p className="truncate font-normal text-gray-300 dark:text-gray-400">
                            No description
                        </p>
                    ) : (
                        <p className="truncate font-normal text-gray-700 dark:text-gray-400">
                            {project.description}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    )
}

export default ProjectComponent
